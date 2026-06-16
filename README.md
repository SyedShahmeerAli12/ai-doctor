# Pharma Avatar — AI Medical Training Simulation

An interactive AI avatar system for medical training. A doctor trainee converses with **Ayesha Khan**, a simulated 30-year-old miscarriage patient. The avatar speaks in Roman Urdu using OpenAI's Realtime API voice, with lip-sync powered by Anam AI.

---

## Architecture

```
Browser
  │
  ├── Anam AI SDK (avatar video + lip-sync)
  │     └── receives PCM16 audio chunks from OpenAI → lip-syncs in real-time
  │
  └── WebSocket → FastAPI Backend
                      │
                      └── OpenAI Realtime API (gpt-realtime-1.5)
                                └── streams audio + transcript back
```

**Key design decisions:**
- OpenAI Realtime API handles STT + LLM + TTS (perfect Roman Urdu voice)
- Anam SDK v4 receives OpenAI's raw PCM16 audio via `createAgentAudioInputStream` — no Anam TTS involved
- Audio is downsampled from 24kHz (OpenAI) → 16kHz (Anam) in the browser via linear interpolation
- Push-to-talk (PTT) mode — server VAD disabled via `session.audio.input.turn_detection: null`
- Transcripts translated to English via `gpt-4o-mini` for display

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Avatar | Anam AI JS SDK v4 |
| Backend | FastAPI (Python 3.11) |
| AI Voice | OpenAI Realtime API (`gpt-realtime-1.5`) |
| Deployment | Docker + Nginx |

---

## Project Structure

```
pharma-avatar/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── routers/
│   │   ├── anam.py                # Anam session token endpoint
│   │   ├── auth.py                # JWT login/verify
│   │   └── session.py             # WebSocket relay + summarize
│   ├── services/
│   │   └── openai_realtime.py     # OpenAI Realtime WS relay + Ayesha prompt
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env                       # secrets (not committed)
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx               # Main consultation UI
│   │   ├── login/page.tsx         # Login screen
│   │   ├── hooks/
│   │   │   ├── useAnam.ts         # Anam avatar + audio stream
│   │   │   └── useRealtimeRelay.ts # OpenAI WebSocket relay
│   │   └── components/
│   │       ├── Avatar.tsx         # Video element wrapper
│   │       └── Transcript.tsx     # Chat transcript display
│   ├── package.json
│   ├── Dockerfile
│   └── .env.local                 # NEXT_PUBLIC_BACKEND_URL
│
├── nginx/
│   └── nginx.conf                 # Reverse proxy config
├── docker-compose.yml
└── .env                           # Server-level env (Docker reads this)
```

---

## Environment Variables

### `backend/.env`

```env
# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-realtime-1.5
OPENAI_VOICE=coral

# Anam AI
ANAM_API_KEY=...
ANAM_AVATAR_ID=...         # Avatar face ID from Anam dashboard
ANAM_VOICE_ID=...          # Voice ID (unused — OpenAI audio is used directly)


### `frontend/.env.local`

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000   # local
# NEXT_PUBLIC_BACKEND_URL=https://yourdomain.com  # production
```

---

## Running Locally

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` — login with `pharma` / `pharma123`.

---

## Running with Docker (Production)

```bash
# First time or after code changes
docker compose down && docker compose up -d --build

# View logs
docker compose logs -f

# Pull latest and redeploy
git pull --rebase origin main
docker compose down && docker compose up -d --build
```

> **Note:** The `backend/.env` file is never committed. Update it directly on the server after first deploy.

---

## User Flow

1. Doctor logs in → clicks **Start Consultation**
2. Ayesha introduces herself in Roman Urdu
3. Doctor taps **🎤 Tap to Speak** → speaks → taps **⏹ Done — Send**
4. Ayesha responds in Roman Urdu (OpenAI voice, Anam lip-sync)
5. Button stays disabled while Ayesha is speaking
6. Doctor clicks **End Session** → summary generated in English

---

## Ayesha Khan — Patient Profile

- **Name:** Ayesha Khan, 30 years old, married 3 years
- **Complaint:** Miscarriage at 10 weeks gestation (5 days ago)
- **Language:** Roman Urdu only (Urdu written in English letters)
- **Behavior:** Emotionally fragile, answers only what is asked, never breaks character

The full prompt is in `backend/services/openai_realtime.py` → `JADWA_PROMPT`.

---

## Updating Credentials

All keys live in `backend/.env`. Edit that file and restart:

| Key | Purpose |
|---|---|
| `ANAM_API_KEY` | Anam account API key |
| `ANAM_AVATAR_ID` | Avatar face (must belong to same Anam account as API key) |
| `OPENAI_API_KEY` | OpenAI key |
| `APP_USERNAME` / `APP_PASSWORD` | Login credentials |
