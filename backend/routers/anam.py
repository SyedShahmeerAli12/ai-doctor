from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter()

@router.post("/token")
async def get_anam_token():
    api_key = os.getenv("ANAM_API_KEY")
    persona_id = os.getenv("ANAM_PERSONA_ID")

    async with httpx.AsyncClient(timeout=15.0) as client:
        res = await client.post(
            "https://api.anam.ai/v1/auth/session-token",
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={"personaConfig": {
                "name": "Sara",
                "avatarId": persona_id,
                "voiceId": os.getenv("ANAM_VOICE_ID"),
                "llmId": "a7cf662c-2ace-4de1-a21e-ef0fbf144bb7",
                "systemPrompt": "You are Sara, a Jadwa Investment account assistant.",
            }},
        )
        if not res.is_success:
            raise HTTPException(status_code=502, detail=f"Anam token error: {res.text}")

    return res.json()
