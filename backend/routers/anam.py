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
                "name": "Ayesha",
                "avatarId": persona_id,
                "voiceId": os.getenv("ANAM_VOICE_ID"),
                "systemPrompt": "You are Ayesha Khan, a 28-year-old patient visiting a doctor. Wait silently for the doctor to speak first.",
            }},
        )
        if not res.is_success:
            raise HTTPException(status_code=502, detail=f"Anam token error: {res.text}")

    return res.json()
    