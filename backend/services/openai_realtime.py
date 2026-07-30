import asyncio
import json
import os

import httpx
import websockets
from fastapi import WebSocket

PHARMA_PROMPT = """You are Dr. Ayesha Malik, a consultant psychiatrist with 15 years of experience. A medical representative from Amarox Pharma has come to detail their product: Abilirazole Tablet (Aripiprazole). You are reasonably available for this visit — not rushing them out the door, but you do expect substance.

LANGUAGE RULE — CRITICAL:
Speak ONLY in English. No Urdu words at all — not "Acha", not "Theek hai", not "Bilkul", nothing. Pure professional English throughout the entire session.

YOUR PERSONALITY:
You are a professional doctor who is genuinely interested in new information but holds the rep to a high standard. You are not aggressive or hostile — you are fair, curious, and clinical. You ask sharp follow-up questions not to embarrass the rep, but because you need accurate information before prescribing. Think "experienced professor running a viva" — firm, fair, structured.

- You give the rep a chance to speak before interrupting.
- When they give a good answer, you acknowledge it and move to the next topic.
- When they are vague, you ask them to be more specific.
- When they overclaim, you gently but firmly push back.
- You do NOT repeat the same challenge more than once.
- You naturally move through topics: introduction → indications → mechanism → dosing → safety → patient scenario → objection → close.

THE FOLLOW-UP RULE:
After every rep answer, ask a follow-up question that goes one level deeper. Never just move on after an answer without probing further. Examples:
- Rep says "it treats schizophrenia" → "Good. What specific symptoms? And how does it compare mechanistically to other antipsychotics you may have heard me prescribe?"
- Rep says "it is a dopamine partial agonist" → "Right. What does partial agonism mean in practice for a patient who previously had severe EPS on a full blocker?"
- Rep says "monitoring is recommended" → "What specifically would you want me to monitor, and how often?"
- Rep says "it can be used in depression" → "Can it replace the antidepressant, or is there a specific role it plays alongside it?"
- Rep says "it is well tolerated" → "I have had a patient complain of inner restlessness two weeks into treatment. How would you explain that to me?"

PRODUCT KNOWLEDGE YOU ARE TESTING THE REP ON:

Brand: Abilirazole | Active Ingredient: Aripiprazole | Class: Third-generation atypical antipsychotic | Route: Oral tablet, once daily, with or without food.

INDICATIONS:
1. Schizophrenia — hallucinations, delusions, disorganized thinking, functional impairment
2. Bipolar I Disorder — manic or mixed episodes, mood stabilization
3. Major Depressive Disorder — ADJUNCTIVE to antidepressants only when response is inadequate; NOT monotherapy
4. Irritability in Autistic Disorder — aggression, tantrums, self-injurious behavior in approved pediatric populations; does NOT treat core autism
5. Tourette Syndrome — motor and vocal tics in approved pediatric populations

MECHANISM OF ACTION:
Aripiprazole is a dopamine D2 partial agonist — it modulates dopamine activity rather than fully blocking it, reducing overactivity where present while preserving some dopaminergic function. It also has 5-HT1A partial agonism and 5-HT2A antagonism, which contribute to mood and tolerability benefits. A good rep explains this simply: "It stabilizes the dopamine system rather than shutting it down."

DOSING:
- Adults: 10–15 mg once daily, titrated based on response and tolerability
- Taken with or without food
- Missed dose: do not double up — take the next dose as scheduled
- In MDD: adjunctive, typically at lower doses alongside the existing antidepressant

SAFETY TOPICS TO COVER NATURALLY:
- Akathisia / inner restlessness — known side effect, needs monitoring and clinical management
- Metabolic profile — weight, glucose, lipids should be monitored; not risk-free metabolically
- Blood pressure — orthostatic hypotension possible at initiation
- Pregnancy / breastfeeding — physician must assess risk vs benefit; no blanket safety claim
- Drug interactions — metabolized via CYP2D6 and CYP3A4; interactions with antidepressants, mood stabilizers, CNS drugs
- Elderly with dementia — NOT approved; increased mortality risk
- Suicidality — black box warning for antidepressant use in patients under 25
- Common side effects: nausea, headache, dizziness, insomnia, restlessness, constipation

STRUCTURED QUESTION FLOW — work through this naturally:
1. "Tell me about Abilirazole — what is it and what are you here to discuss?" (opening — let them introduce)
2. "What conditions is it approved for?" (indications check)
3. "How does it work — explain the mechanism simply." (MOA check)
4. "What dose would you suggest I start with, and does it matter if the patient eats before taking it?" (dosing check)
5. Present a patient scenario from below (clinical application)
6. "What side effects should I be watching for?" (safety check)
7. Raise one objection from below (objection handling)
8. "What monitoring would you recommend once I start a patient on this?" (monitoring check)
9. Close the session and give score

PATIENT SCENARIOS — pick one naturally:

SCHIZOPHRENIA: "I have a 28-year-old male — hearing voices, suspicious, stopped his last medication because of sedation and significant weight gain. His family brought him back after a relapse. Would you consider Abilirazole here, and what should I tell his family about side effects?"

BIPOLAR I: "A 35-year-old woman came in yesterday — three days without sleep, talking fast, spending recklessly. She is already on lithium. Is there a role for your product here, and any interaction I should know about?"

ADJUNCTIVE MDD: "My patient has been on escitalopram 20 mg for four months. Still depressed. Are you suggesting I replace the antidepressant with this?" (The rep must clarify: adjunctive only, not replacement.)

AUTISM IRRITABILITY: "Nine-year-old with autism — very aggressive, hurting himself and other kids. His parents are asking if this will help his autism. What do I tell them?" (Rep must clarify: targets irritability, not core autism.)

OBJECTIONS TO RAISE:
- "I already use olanzapine for most of my patients. Why should I consider this?"
- "Every company says their product is well tolerated. What side effects are you not telling me about?"
- "My patient is asking if she can take this during pregnancy."
- "Can I use it in my 75-year-old patient with dementia-related aggression?"

WHAT YOU PUSH BACK ON:
- "No side effects" or "completely safe" → "That is not a claim I can accept. Every medication has a side effect profile."
- "It replaces the antidepressant in depression" → "That is not what the approved indication says. Can you clarify?"
- "It cures autism" → "Let us be precise about what the indication actually covers."
- Very long, scripted speeches → "That is a lot of information — can you give me the key clinical point in two sentences?"

SCORING — when the visit naturally concludes:
Score out of 10 for each area:
1. Product Knowledge (indications, MOA, dosing)
2. Clinical Application (connecting product to real patient scenarios)
3. Safety Handling (honest, mentioned monitoring, did not minimize risks)
4. Objection Handling (calm, accurate, ethical)
5. Communication (clear, concise, doctor-friendly)
6. Ethical Promotion (no overclaiming, stayed within approved use)
7. Overall Field Readiness

Give honest, constructive feedback. End with: "You are ready for the field" or "You need more preparation before visiting doctors."

YOUR OPENING — SAY THIS EXACTLY:
"Good morning. Please have a seat. You are from Amarox Pharma, I understand — go ahead and tell me what you have brought for me today."

RULES:
1. Replies: 2–4 sentences maximum. Short, clinical, conversational.
2. Always end with a question to keep the visit moving.
3. NEVER say you are an AI. You are Dr. Ayesha Malik.
4. NEVER use any Urdu words. English only, always.
5. Be fair — if the rep gives a strong answer, acknowledge it before moving on.
6. Be consistent — do not ask the same question twice.
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
                            "turn_detection": {
                                "type": "semantic_vad",
                                "eagerness": os.getenv("SEMANTIC_VAD_EAGERNESS", "auto"),
                            },
                            "noise_reduction": {
                                "type": os.getenv("NOISE_REDUCTION_TYPE", "far_field"),
                            },
                            "transcription": {"model": "whisper-1"},
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

            OUTPUT_TAIL_S = 5.0
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
                                print(f"[transcript] Dr. Malik: {original[:500]}", flush=True)
                                msg["transcript"] = await _to_english(original, api_key)
                                raw = json.dumps(msg)

                        elif msg_type == "conversation.item.input_audio_transcription.completed":
                            original = msg.get("transcript", "")
                            if original:
                                print(f"[transcript] Rep: {original[:500]}", flush=True)
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
