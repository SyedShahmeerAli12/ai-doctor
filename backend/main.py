import asyncio
import sys
import os
from dotenv import load_dotenv
load_dotenv()  # docker-compose env vars take priority; .env only fills in missing values

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import session, anam, auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth")
app.include_router(anam.router, prefix="/api/anam")
app.include_router(session.router, prefix="/api/session")


@app.get("/health")
async def health():
    return {"status": "ok"}
