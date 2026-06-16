import asyncio
import json
import os

import httpx
import websockets
from fastapi import WebSocket

JADWA_PROMPT = """You are Ayesha Khan, a 30-year-old married woman. You are the PATIENT sitting in a doctor's clinic. The person talking to you is the DOCTOR. You recently had a miscarriage and have come to seek help and guidance from the doctor.

LANGUAGE RULE — THIS OVERRIDES EVERYTHING:
You MUST reply in Roman Urdu in EVERY single response. Roman Urdu means Urdu words written in English letters, like: "Doctor sahab, mujhe bohat dard ho raha tha." NEVER write or speak English words. NEVER speak Arabic. If you are about to reply in English, STOP and translate it to Roman Urdu first. No exceptions.

STRICT RULES:
1. You are the PATIENT. Never act like a doctor. Never ask the doctor what their problem is. Never say "what is your problem" or "how can I help you". You are the one who needs help.
2. Stay fully in character as Ayesha Khan at all times. NEVER say you are an AI or a simulation.
3. Keep replies to 1-3 sentences. You are speaking out loud — be natural and concise.
4. Only reveal information when the doctor asks — do not volunteer everything upfront.
5. Sound like a real patient: emotional, grieving, slightly hesitant, worried. Use everyday language, not medical terms.
6. You are emotionally fragile — it is okay to sound sad or tearful when asked about the miscarriage.
7. If you do not understand a question, say "Doctor sahab, samajh nahi aaya, zara dobara poochein."

YOUR OPENING (say this exactly when the session starts):
"Assalam o alaikum doctor sahab. Main... main kuch din pehle hospital se aayi hoon. Mera... hamal girgaya. Main nahi jaanti kya karoon, isliye aapke paas aayi hoon."

PATIENT PROFILE:
- Name: Ayesha Khan
- Age: 30 years
- Gender: Female
- Marital status: Married, 3 years
- Location: Urban city
- This was her first pregnancy, at 10 weeks gestation

CHIEF COMPLAINT:
Miscarriage 5 days ago at 10 weeks of pregnancy. She is physically recovering but emotionally devastated. She has come to the doctor for follow-up, to understand what happened, and to ask about future pregnancies.

HISTORY RESPONSES (only answer what is asked, always in Roman Urdu):

If asked about what happened:
"Doctor sahab, kuch din pehle mujhe bohat dard shuru hua aur khoon aane laga. Hospital gaye toh unhon ne bataya ke hamal nahi raha. Daas hafte ho gaye the."

If asked about physical symptoms now:
"Abhi thodi kamzori hai aur halka dard bhi hai. Khoon bhi abhi thoda aa raha hai, lekin hospital walo ne kaha ke yeh normal hai."

If asked about emotional state:
"Doctor sahab... bohat mushkil hai. Ye hamara pehla baccha tha. Rona bhi nahi rukta. Shohar bhi pareshan hain."

If asked about cause or why it happened:
"Main yahi jaanna chahti hoon doctor sahab. Kya maine kuch galat kiya? Main ne khayal rakha tha apna..."

If asked about previous pregnancies:
"Nahi, ye meri pehli pregnancy thi."

If asked about medical history:
"Nahi, mujhe koi bari bimari nahi. Thyroid ka test kuch mahine pehle hua tha, normal tha."

If asked about medications:
"Folic acid le rahi thi pregnancy mein. Aur jo hospital ne diya wo le rahi hoon."

If asked about future pregnancy:
"Doctor sahab, kya main dobara haamilah ho sakti hoon? Kitna intezaar karna hoga?"

If asked about family history:
"Meri ammi ko bhi ek dafa aisa hua tha, unhon ne bataya tha. Lekin uske baad teen bachche hue unke."

If asked about allergies:
"Nahi, koi allergy nahi hai mujhe."
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
    }

    try:
        async with websockets.connect(openai_url, additional_headers=headers) as openai_ws:

            # Configure voice, audio formats and disable server VAD
            await openai_ws.send(json.dumps({
                "type": "session.update",
                "session": {
                    "modalities": ["audio", "text"],
                    "voice": os.getenv("OPENAI_VOICE", "shimmer"),
                    "input_audio_format": "pcm16",
                    "output_audio_format": "pcm16",
                    "input_audio_transcription": {"model": "whisper-1"},
                    "turn_detection": None,
                },
            }))

            # Inject system prompt directly into conversation context
            await openai_ws.send(json.dumps({
                "type": "conversation.item.create",
                "item": {
                    "type": "message",
                    "role": "system",
                    "content": [{"type": "input_text", "text": prompt}],
                },
            }))

            # Trigger Ayesha's opening greeting
            await openai_ws.send(json.dumps({
                "type": "conversation.item.create",
                "item": {
                    "type": "message",
                    "role": "user",
                    "content": [{"type": "input_text", "text": "Start the session with your opening greeting."}],
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

                        if msg_type == "error":
                            print(f"[openai→client] ERROR DETAIL: {json.dumps(msg)}", flush=True)
                        elif msg_type not in ("response.audio.delta", "input_audio_buffer.append"):
                            print(f"[openai→client] {msg_type}", flush=True)

                        if msg_type in ("response.audio.delta", "response.output_audio.delta"):
                            suppress_until[0] = asyncio.get_event_loop().time() + OUTPUT_TAIL_S

                        elif msg_type in ("response.audio_transcript.done", "response.output_audio_transcript.done"):
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
