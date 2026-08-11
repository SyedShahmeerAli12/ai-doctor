// API health check script for OpenAI and Anam APIs
const OPENAI_API_KEY = "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";
const OPENAI_MODEL = "gpt-realtime-1.5";

const ANAM_API_KEY = "M2I1YjRiYWItNzBjZi00ZDUwLWJkM2MtOWJjYjRmN2JmYjY0Ok5wWnJWM01NZ01iRnFiNHorcks3ay9rOFFSV1R2anU4K2xlaW0rZXVRNlk9";
const ANAM_PERSONA_ID = "331974d8-44b6-49de-9499-43d1b590501f";
const ANAM_VOICE_ID = "a1a5faa9-ff64-4c99-ab1e-48f461250b23";

function status(ok) {
  return ok ? "✓ OK" : "✗ FAIL";
}

async function checkOpenAI() {
  console.log("\n--- OpenAI API ---");
  try {
    // Check key validity via models list endpoint (cheap, no token usage)
    const res = await fetch("https://api.openai.com/v1/models", {
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    });
    const json = await res.json();

    if (!res.ok) {
      console.log(`[${status(false)}] Auth: ${json.error?.message ?? res.statusText}`);
      return;
    }
    console.log(`[${status(true)}] Auth: key accepted (HTTP ${res.status})`);

    // Check if the realtime model is listed
    const modelIds = (json.data ?? []).map((m) => m.id);
    const found = modelIds.some((id) => id.includes("realtime"));
    console.log(
      `[${status(found)}] Model "${OPENAI_MODEL}": ${
        found ? "realtime models available" : "no realtime model found in list"
      }`
    );
    if (!found) {
      console.log("   Available models (first 10):", modelIds.slice(0, 10).join(", "));
    }
  } catch (err) {
    console.log(`[${status(false)}] Network error: ${err.message}`);
  }
}

async function checkAnamSession() {
  console.log("\n--- Anam AI API ---");
  try {
    // Request a session token — this is the standard first call before streaming
    const res = await fetch("https://api.anam.ai/v1/auth/session-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANAM_API_KEY}`,
      },
      body: JSON.stringify({}),
    });
    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      const token = json.sessionToken ?? json.token ?? "(present)";
      console.log(`[${status(true)}] Session token: received (HTTP ${res.status})`);
      console.log(`   Token preview: ${String(token).slice(0, 20)}…`);
    } else {
      console.log(`[${status(false)}] Session token: ${json.message ?? json.error ?? res.statusText} (HTTP ${res.status})`);
    }
  } catch (err) {
    console.log(`[${status(false)}] Network error: ${err.message}`);
  }
}

async function checkAnamPersona() {
  try {
    const res = await fetch(`https://api.anam.ai/v1/personas/${ANAM_PERSONA_ID}`, {
      headers: { Authorization: `Bearer ${ANAM_API_KEY}` },
    });
    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      const name = json.name ?? json.persona?.name ?? "unnamed";
      console.log(`[${status(true)}] Persona "${ANAM_PERSONA_ID}": found (name: ${name})`);
    } else {
      console.log(`[${status(false)}] Persona "${ANAM_PERSONA_ID}": ${json.message ?? json.error ?? res.statusText} (HTTP ${res.status})`);
    }
  } catch (err) {
    console.log(`[${status(false)}] Persona check network error: ${err.message}`);
  }
}

async function checkAnamVoice() {
  try {
    const res = await fetch(`https://api.anam.ai/v1/voices/${ANAM_VOICE_ID}`, {
      headers: { Authorization: `Bearer ${ANAM_API_KEY}` },
    });
    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      const name = json.name ?? json.voice?.name ?? "unnamed";
      console.log(`[${status(true)}] Voice "${ANAM_VOICE_ID}": found (name: ${name})`);
    } else {
      console.log(`[${status(false)}] Voice "${ANAM_VOICE_ID}": ${json.message ?? json.error ?? res.statusText} (HTTP ${res.status})`);
    }
  } catch (err) {
    console.log(`[${status(false)}] Voice check network error: ${err.message}`);
  }
}

(async () => {
  console.log("=== API Health Check ===");
  console.log(`Timestamp: ${new Date().toISOString()}`);

  await checkOpenAI();
  await checkAnamSession();
  await checkAnamPersona();
  await checkAnamVoice();

  console.log("\n=== Done ===");
})();
