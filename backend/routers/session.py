from fastapi import APIRouter, WebSocket
from pydantic import BaseModel
from typing import List
import httpx, os
from services.openai_realtime import relay_to_openai

router = APIRouter()


@router.websocket("/relay")
async def websocket_relay(ws: WebSocket):
    await ws.accept()
    print("[relay] client connected", flush=True)
    await relay_to_openai(ws)
    print("[relay] client disconnected", flush=True)


class Message(BaseModel):
    role: str
    text: str

class SummarizeRequest(BaseModel):
    messages: List[Message]

@router.post("/summarize")
async def summarize(body: SummarizeRequest):
    if not body.messages:
        return {"summary": "No conversation to summarize."}

    transcript = "\n".join(
        f"{'User' if m.role == 'user' else 'Sara'}: {m.text}"
        for m in body.messages
    )

    system_prompt = (
        "You are a session summarizer for a medical training simulation. "
        "Given a conversation transcript between a doctor (user) and Ayesha Khan (a miscarriage patient), return a JSON object with exactly two keys:\n"
        "1. \"summary\": a 2-3 sentence paragraph summarising what history the doctor took and what the patient disclosed. Start with 'During this session...'. Skip greetings.\n"
        "2. \"topics\": a JSON array of 2-5 short topic labels (3-5 words each) representing the history areas covered. Example: [\"Chief Complaint\", \"Emotional State\", \"Future Pregnancy Concerns\"]\n"
        "Return ONLY valid JSON, no markdown, no explanation."
    )

    api_key = os.getenv("OPENAI_API_KEY")
    async with httpx.AsyncClient(timeout=20.0) as client:
        resp = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Transcript:\n{transcript}"},
                ],
                "max_tokens": 300,
                "temperature": 0.4,
                "response_format": {"type": "json_object"},
            },
        )
    import json as _json
    raw = resp.json()["choices"][0]["message"]["content"].strip()
    parsed = _json.loads(raw)
    return {
        "summary": parsed.get("summary", "Session complete."),
        "topics": parsed.get("topics", []),
    }
