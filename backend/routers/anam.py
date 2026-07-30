from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter()

@router.post("/token")
async def get_anam_token():
    api_key   = os.getenv("ANAM_API_KEY")
    avatar_id = os.getenv("ANAM_AVATAR_ID") or os.getenv("ANAM_PERSONA_ID")
    voice_id  = os.getenv("ANAM_VOICE_ID")
    print(f"[anam] using avatarId: {avatar_id} voiceId: {voice_id}", flush=True)
    async with httpx.AsyncClient(timeout=15.0) as client:
        res = await client.post(
            "https://api.anam.ai/v1/auth/session-token",
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={"personaConfig": {
                "name": "Ayesha",
                "avatarId": avatar_id,
                "voiceId": voice_id,
                "brainType": "NONE",
                "languageCode": "en",
            }},
        )
    print(f"[anam] token response: {res.status_code} {res.text[:200]}", flush=True)
    if not res.is_success:
        raise HTTPException(status_code=502, detail=f"Anam token error: {res.text}")

    return res.json()
    