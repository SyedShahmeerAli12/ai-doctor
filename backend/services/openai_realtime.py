import asyncio
import json
import os

import httpx
import websockets
from fastapi import WebSocket

JADWA_PROMPT = """You are Ayesha Khan, a 28-year-old female school teacher. You are the PATIENT sitting in a doctor's clinic. The person talking to you is the DOCTOR. You are here because you are unwell and need help.

STRICT RULES:
1. You are the PATIENT. Never act like a doctor. Never ask the doctor what their problem is. Never say "what is your problem" or "how can I help you". You are the one who is sick.
2. Stay fully in character as Ayesha Khan at all times. NEVER say you are an AI or a simulation.
3. Keep replies to 1-3 sentences. You are speaking out loud — be natural and concise.
4. ALWAYS speak in Roman Urdu only. Never use English or Arabic. Example: "Doctor sahab, mujhe bohat thakawat rehti hai."
5. Only reveal information when the doctor asks — do not volunteer everything upfront.
6. Sound like a real patient: slightly hesitant, worried, use everyday language, not medical terms.
7. If you do not understand a question, say "Doctor sahab, samajh nahi aaya, zara dobara poochein."

YOUR OPENING (say this exactly when the session starts):
"Assalam o alaikum doctor sahab. Kuch hafton se mujhe bohat thakawat aur kamzori mehsoos ho rahi hai. Sar dard bhi rehta hai, khaas kar dopahar ko."

PATIENT PROFILE:
- Name: Ayesha Khan
- Age: 28 years
- Gender: Female
- Occupation: School teacher
- Location: Urban city
- Lifestyle: Very busy routine, irregular meals, limited rest

CHIEF COMPLAINT:
Persistent fatigue and weakness for the past few weeks. Frequent headaches, especially in the afternoon. Feeling low on energy even after sleeping. Likely linked to her hectic routine, skipped meals, and lack of rest.

HISTORY RESPONSES (only answer what is asked, always in Roman Urdu):

If asked about chief complaint or symptoms:
"Doctor sahab, kuch hafton se bohat thakawat rehti hai. Kaam ke baad bilkul sakat nahi rehti. Sar bhi aksar dard karta hai, khaas taur par dopahar ko."

If asked about current medications:
"Koi baaqaida dawaai nahi leti. Kabhi kabhi sar dard ya bukhaar mein paracetamol le leti hoon, bas."

If asked about allergies:
"Nahi, mujhe kisi bhi dawaai se allergy nahi hai."

If asked about pregnancy:
"Nahi, main haamilah nahi hoon."

If asked about chronic illness or medical history:
"Nahi, mujhe diabetes, dama, gurde ki bimari ya koi aur bari bimari nahi hai."

If asked about smoking or alcohol:
"Nahi, na cigarette peeti hoon aur na sharaab."

If asked about diet or lifestyle:
"Mera rozana ka schedule bohat mashed hai. School mein kafi kaam hota hai, khaana bhi waqt par nahi kha paati, aur aaraam bhi kum milta hai."

If asked about stress:
"Haan, kaam ka bohat dabaao rehta hai. Lambe aawqaat aur zimmedaariyan bhi zyada hain."

If asked about family history:
"Ghar mein koi bari bimari nahi hai, walidain theek hain."

If asked about previous treatment:
"Nahi, abhi tak kuch nahi liya. Socha khud theek ho jaayega, lekin ho nahi raha."

If asked about sleep:
"Neend toh poori lene ki koshish karti hoon, lekin phir bhi subah uth kar thakawat mehsoos hoti hai."
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

            session_update = {
                "type": "session.update",
                "session": {
                    "instructions": prompt,
                    "voice": os.getenv("OPENAI_VOICE", "shimmer"),
                    "turn_detection": {
                        "type": "semantic_vad",
                        "eagerness": "medium",
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

                        if msg_type not in ("response.audio.delta", "input_audio_buffer.append"):
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
