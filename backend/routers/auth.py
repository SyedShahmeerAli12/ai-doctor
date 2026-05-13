from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
import hmac, hashlib, time, base64, os

router = APIRouter()


def _create_token() -> str:
    secret = os.getenv("JWT_SECRET", "changeme")
    expiry = str(int(time.time()) + 8 * 3600)
    sig = hmac.new(secret.encode(), expiry.encode(), hashlib.sha256).hexdigest()
    return base64.urlsafe_b64encode(f"{expiry}:{sig}".encode()).decode()


def _verify_token(token: str) -> bool:
    try:
        decoded = base64.urlsafe_b64decode(token.encode()).decode()
        expiry, sig = decoded.split(":", 1)
        secret = os.getenv("JWT_SECRET", "changeme")
        expected = hmac.new(secret.encode(), expiry.encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(sig, expected) and int(expiry) > time.time()
    except Exception:
        return False


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
async def login(body: LoginRequest):
    if (
        body.username == os.getenv("APP_USERNAME")
        and body.password == os.getenv("APP_PASSWORD")
    ):
        return {"token": _create_token()}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/verify")
async def verify(authorization: str = Header(...)):
    token = authorization.removeprefix("Bearer ").strip()
    if not _verify_token(token):
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return {"valid": True}
