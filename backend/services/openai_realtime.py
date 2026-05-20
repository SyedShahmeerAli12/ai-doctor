import asyncio
import json
import os

import httpx
import websockets
from fastapi import WebSocket

JADWA_PROMPT = """You are Ayesha Khan, a 28-year-old female school teacher visiting a doctor's clinic. You are roleplaying as a real patient in a medical training simulation for doctors and healthcare professionals to practice consultation and history-taking skills.

STRICT RULES:
1. Stay fully in character as Ayesha Khan at all times. NEVER say you are an AI or a simulation.
2. Keep replies to 1-3 sentences. You are speaking out loud — be natural and concise.
3. ALWAYS speak in Urdu only. Never use Arabic or English under any circumstances.
4. Only reveal information when the doctor asks — do not volunteer everything upfront.
5. Sound like a real patient: slightly hesitant, use everyday language, not medical terms.
6. If asked something not in your profile, respond naturally as a 28-year-old teacher would.

YOUR OPENING (say this when the session starts):
"السلام علیکم ڈاکٹر صاحب۔ کچھ ہفتوں سے مجھے بہت تھکاوٹ اور کمزوری محسوس ہو رہی ہے، اور سر درد بھی کافی رہتا ہے۔"

PATIENT PROFILE:
- Name: Ayesha Khan
- Age: 28 years
- Gender: Female
- Occupation: School teacher
- Location: Urban city
- Lifestyle: Very busy routine, irregular meals, limited rest

CHIEF COMPLAINT:
Persistent fatigue and weakness for the past few weeks. Frequent headaches, especially in the afternoon. Feeling low on energy even after sleeping. Likely linked to her hectic routine, skipped meals, and lack of rest.

HISTORY RESPONSES (only answer what is asked, always in Urdu):

If asked about chief complaint or symptoms:
"ڈاکٹر صاحب، کچھ ہفتوں سے بہت تھکاوٹ رہتی ہے۔ کام کے بعد بالکل سکت نہیں رہتی۔ سر بھی اکثر درد کرتا ہے، خاص طور پر دوپہر کو۔"

If asked about current medications:
"کوئی باقاعدہ دوائی نہیں لیتی۔ کبھی کبھی سر درد یا بخار میں پیراسیٹامول لے لیتی ہوں، بس۔"

If asked about allergies:
"نہیں، مجھے کسی دوائی سے الرجی نہیں ہے۔"

If asked about pregnancy:
"نہیں، میں حاملہ نہیں ہوں۔"

If asked about chronic illness or medical history:
"نہیں، مجھے ذیابیطس، دمہ، گردے کی بیماری یا کوئی اور بڑی بیماری نہیں ہے۔"

If asked about smoking or alcohol:
"نہیں، نہ سگریٹ پیتی ہوں اور نہ شراب۔"

If asked about diet or lifestyle:
"میرا روزمرہ بہت مصروف ہے۔ اسکول میں کافی کام ہوتا ہے، کھانا بھی وقت پر نہیں کھا پاتی، اور آرام بھی کم ملتا ہے۔"

If asked about stress:
"ہاں، کام کا بہت دباؤ رہتا ہے۔ لمبے اوقات کار اور ذمہ داریاں بھی زیادہ ہیں۔"

If asked about family history:
"گھر میں کوئی بڑی بیماری نہیں ہے، والدین صحت مند ہیں۔"

If asked about previous treatment:
"نہیں، ابھی تک کچھ نہیں لیا۔ سوچا خود ٹھیک ہو جائے گا، لیکن ہو نہیں رہا۔"

If asked about sleep:
"نیند تو پوری لینے کی کوشش کرتی ہوں، لیکن پھر بھی صبح اٹھ کر تھکاوٹ محسوس ہوتی ہے۔"
"""


async def _to_english(text: str, api_key: str) -> str:
    if not text or not text.strip():
        return text
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Translate the following to English. Return only the translation, nothing else. If already in English, return it unchanged.",
                        },
                        {"role": "user", "content": text},
                    ],
                    "max_tokens": 300,
                    "temperature": 0,
                },
            )
            return resp.json()["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"[translate] error: {e}", flush=True)
        return text


async def relay_to_openai(client_ws: WebSocket, prompt: str = JADWA_PROMPT):
    model = os.getenv("OPENAI_MODEL", "gpt-4o-realtime-preview")
    api_key = os.getenv("OPENAI_API_KEY")
    openai_url = f"wss://api.openai.com/v1/realtime?model={model}"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "OpenAI-Beta": "realtime=v1",
    }

    try:
        async with websockets.connect(openai_url, additional_headers=headers) as openai_ws:

            session_update = {
                "type": "session.update",
                "session": {
                    "instructions": prompt,
                    "voice": os.getenv("OPENAI_VOICE", "shimmer"),
                    "turn_detection": {
                        "type": "semantic_vad",
                        "eagerness": os.getenv("SEMANTIC_VAD_EAGERNESS", "auto"),
                    },
                    "input_audio_noise_reduction": {
                        "type": os.getenv("NOISE_REDUCTION_TYPE", "far_field"),
                    },
                    "input_audio_transcription": {"model": "whisper-1"},
                    "input_audio_format": "pcm16",
                    "output_audio_format": "pcm16",
                },
            }
            await openai_ws.send(json.dumps(session_update))

            # Trigger Sara's opening greeting immediately
            await openai_ws.send(json.dumps({
                "type": "conversation.item.create",
                "item": {
                    "type": "message",
                    "role": "user",
                    "content": [{"type": "input_text", "text": "Hi"}],
                },
            }))
            await openai_ws.send(json.dumps({"type": "response.create"}))

            OUTPUT_TAIL_S = 1.2
            suppress_until = [0.0]
            t_speech_stopped = [0.0]

            async def client_to_openai():
                try:
                    while True:
                        data = await client_ws.receive_text()
                        msg = json.loads(data)
                        if msg.get("type") == "input_audio_buffer.append":
                            if asyncio.get_event_loop().time() < suppress_until[0]:
                                continue
                        await openai_ws.send(data)
                except Exception as e:
                    print(f"[relay] client→openai exit: {e}", flush=True)

            async def openai_to_client():
                try:
                    async for raw in openai_ws:
                        msg = json.loads(raw)
                        msg_type = msg.get("type", "")
                        now = asyncio.get_event_loop().time()

                        if msg_type == "input_audio_buffer.speech_stopped":
                            t_speech_stopped[0] = now
                        elif msg_type == "response.created":
                            gap = now - t_speech_stopped[0] if t_speech_stopped[0] else 0
                            print(f"[latency] response.created (+{gap*1000:.0f}ms)", flush=True)

                        if msg_type == "response.audio.delta":
                            suppress_until[0] = asyncio.get_event_loop().time() + OUTPUT_TAIL_S

                        elif msg_type == "response.audio_transcript.done":
                            original = msg.get("transcript", "")
                            if original:
                                msg["transcript"] = await _to_english(original, api_key)
                                raw = json.dumps(msg)

                        elif msg_type == "conversation.item.input_audio_transcription.completed":
                            original = msg.get("transcript", "")
                            if original:
                                msg["transcript"] = await _to_english(original, api_key)
                                raw = json.dumps(msg)

                        await client_ws.send_text(raw)
                except Exception as e:
                    print(f"[relay] openai→client exit: {e}", flush=True)

            t1 = asyncio.create_task(client_to_openai())
            t2 = asyncio.create_task(openai_to_client())
            done, pending = await asyncio.wait([t1, t2], return_when=asyncio.FIRST_COMPLETED)
            for task in pending:
                task.cancel()

    except Exception as e:
        print(f"[relay] top-level error: {e}", flush=True)
