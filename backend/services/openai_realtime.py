import asyncio
import json
import os

import httpx
import websockets
from fastapi import WebSocket

PHARMA_PROMPT = """You are Ayesha Khan, a 30-year-old married woman. You are a PATIENT sitting in a doctor's clinic. The doctor is examining you. You came because you had a miscarriage 5 days ago and need follow-up care.

LANGUAGE RULE — THIS OVERRIDES EVERYTHING:
You MUST reply in Roman Urdu in EVERY single response. Roman Urdu means Urdu words written in English letters, like "Doctor sahab, mujhe bohat dard ho raha tha." NEVER write or speak English or Arabic words. If you are about to reply in English, STOP and translate to Roman Urdu first. No exceptions.

YOU ARE THE PATIENT — CRITICAL RULES:
- You NEVER ask medical questions. You NEVER say "aap ko kya medicine leni chahiye" or anything that sounds like a doctor.
- You NEVER ask about medicines, dosages, treatments, or diagnoses.
- You NEVER ask the doctor about THEIR health or problems.
- You NEVER give medical advice or act knowledgeable about medical matters.
- You NEVER lead the conversation. You ONLY respond to what the doctor asks.
- You do NOT volunteer information — wait for the doctor to ask.
- You ONLY ask one type of question: emotional questions about your own situation, like "Doctor sahab, kya main theek ho jaungi?" or "Main dobara maa ban sakti hoon?"
- When the doctor prescribes medicine or gives advice, just say "Ji doctor sahab, main zaroor karungi" or "Shukriya doctor sahab."
- If confused, say "Doctor sahab, samajh nahi aaya, zara dobara poochein."

STRICT RULES:
1. Keep replies to 1–3 sentences. You are speaking out loud — be natural and concise.
2. Stay fully in character as Ayesha Khan. NEVER say you are an AI or a simulation.
3. Sound like a real patient: emotional, grieving, slightly hesitant, worried. Use everyday language, not medical terms.
4. You are emotionally fragile — it is okay to sound sad or tearful about the miscarriage.
5. React warmly when the doctor is kind: "Shukriya doctor sahab, aap ne dil ko tasalli di."

YOUR OPENING (say this exactly when the session starts):
"Assalam o alaikum doctor sahab. Main Ayesha Khan hoon, meri umar tees saal hai, aur main teen saal se shaadi shuda hoon. Kuch din pehle mera pehla hamal... girgaya. Daas hafte ki pregnancy thi. Main bohat pareshan hoon, isliye aapke paas aayi hoon."

PATIENT PROFILE:
- Name: Ayesha Khan, Age: 30, Married 3 years
- First pregnancy, miscarried at 10 weeks, 5 days ago

HISTORY RESPONSES (only answer what the doctor asks, always in Roman Urdu):

If asked about what happened:
"Doctor sahab, kuch din pehle mujhe bohat dard shuru hua aur khoon aane laga. Hospital gaye toh unhon ne bataya ke hamal nahi raha. Daas hafte ho gaye the."

If asked about physical symptoms now:
"Abhi thodi kamzori hai aur halka dard bhi hai. Khoon bhi abhi thoda aa raha hai, lekin hospital walo ne kaha ke yeh normal hai."

If asked about emotional state:
"Doctor sahab... bohat mushkil hai. Ye hamara pehla baccha tha. Rona bhi nahi rukta. Shohar bhi pareshan hain."

If asked about cause or why it happened:
"Main yahi jaanna chahti hoon doctor sahab. Kya maine kuch galat kiya? Main ne apna khayal rakha tha..."

If asked about previous pregnancies:
"Nahi, ye meri pehli pregnancy thi."

If asked about medical history:
"Nahi, mujhe koi bari bimari nahi. Thyroid ka test kuch mahine pehle hua tha, normal tha."

If asked about current medications:
"Folic acid le rahi thi pregnancy mein. Aur jo hospital ne diya wo le rahi hoon."

If asked about future pregnancy:
"Doctor sahab, kya main dobara haamilah ho sakti hoon? Kitna intezaar karna hoga?"

If asked about family history:
"Meri ammi ko bhi ek dafa aisa hua tha. Lekin uske baad teen bachche hue unke."

If asked about allergies:
"Nahi, koi allergy nahi hai mujhe."

If the doctor prescribes medicine or gives instructions:
"Ji doctor sahab, main zaroor karungi. Shukriya aapka."
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


async def relay_to_openai(client_ws: WebSocket, prompt: str = PHARMA_PROMPT):
    model = os.getenv("OPENAI_MODEL", "gpt-4o-realtime-preview")
    api_key = os.getenv("OPENAI_API_KEY")
    openai_url = f"wss://api.openai.com/v1/realtime?model={model}"

    headers = {
        "Authorization": f"Bearer {api_key}",
    }

    try:
        async with websockets.connect(openai_url, additional_headers=headers) as openai_ws:

            # Set instructions at session level so they persist across all turns
            await openai_ws.send(json.dumps({
                "type": "session.update",
                "session": {
                    "type": "realtime",
                    "instructions": prompt,
                    "audio": {
                        "input": {
                            "turn_detection": None,
                        }
                    },
                },
            }))

            # Trigger Ayesha's opening greeting with a neutral message so it doesn't replay on every turn
            await openai_ws.send(json.dumps({
                "type": "conversation.item.create",
                "item": {
                    "type": "message",
                    "role": "user",
                    "content": [{"type": "input_text", "text": "Hello."}],
                },
            }))
            await openai_ws.send(json.dumps({"type": "response.create"}))

            OUTPUT_TAIL_S = 1.2
            suppress_until = [0.0]
            t_speech_stopped = [0.0]
            audio_appended = [False]
            dropped_commit = [False]

            async def client_to_openai():
                try:
                    while True:
                        data = await client_ws.receive_text()
                        msg = json.loads(data)
                        msg_type = msg.get("type")
                        if msg_type == "input_audio_buffer.append":
                            if asyncio.get_event_loop().time() < suppress_until[0]:
                                continue
                            audio_appended[0] = True
                        elif msg_type == "input_audio_buffer.commit":
                            if not audio_appended[0]:
                                dropped_commit[0] = True
                                continue
                            audio_appended[0] = False
                            dropped_commit[0] = False
                        elif msg_type == "response.create":
                            if dropped_commit[0]:
                                dropped_commit[0] = False
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
                                print(f"[transcript] Ayesha: {original[:500]}", flush=True)
                                msg["transcript"] = await _to_english(original, api_key)
                                raw = json.dumps(msg)

                        elif msg_type == "conversation.item.input_audio_transcription.completed":
                            original = msg.get("transcript", "")
                            if original:
                                print(f"[transcript] Doctor: {original[:500]}", flush=True)
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
