from fastapi import APIRouter, WebSocket
from services.openai_realtime import relay_to_openai

router = APIRouter()


@router.websocket("/relay")
async def websocket_relay(ws: WebSocket):
    await ws.accept()
    print("[relay] client connected", flush=True)
    await relay_to_openai(ws)
    print("[relay] client disconnected", flush=True)
