const SimliClient = SimliLib.SimliClient;
const LogLevel    = SimliLib.LogLevel;

// ── State ──────────────────────────────────────────────────────────────────
let ws            = null;
let simliClient   = null;
let transcript    = [];
let audioCtx      = null;
let processor     = null;
let stream        = null;
let suppressUntil = 0;
let assistantBuf  = "";

// ── DOM refs ───────────────────────────────────────────────────────────────
const videoEl         = document.getElementById("avatar-video");
const audioEl         = document.getElementById("avatar-audio");
const idleOverlay     = document.getElementById("idle-overlay");
const overlayText     = document.getElementById("overlay-text");
const speakingDot     = document.getElementById("speaking-dot");
const statusBadge     = document.getElementById("status-badge");
const transcriptBox   = document.getElementById("transcript-box");
const transcriptEmpty = document.getElementById("transcript-empty");
const startBtn        = document.getElementById("start-btn");
const doneBtn         = document.getElementById("done-btn");
const summaryModal    = document.getElementById("summary-modal");
const summaryContent  = document.getElementById("summary-content");

// ── Helpers ────────────────────────────────────────────────────────────────
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 8192;
  for (let i = 0; i < bytes.length; i += chunk)
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunk)));
  return btoa(binary);
}

function base64ToInt16Array(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function downsample(input, inRate, outRate) {
  if (inRate === outRate) return input;
  const ratio = inRate / outRate;
  const outLen = Math.floor(input.length / ratio);
  const out = new Int16Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const pos = i * ratio;
    const idx = Math.floor(pos);
    const frac = pos - idx;
    const a = input[idx] ?? 0;
    const b = input[idx + 1] ?? a;
    out[i] = Math.round(a + frac * (b - a));
  }
  return out;
}

function setStatus(state) {
  statusBadge.className = "badge badge-" + state;
  statusBadge.textContent = state === "idle" ? "Ready" : state === "connecting" ? "Connecting…" : "Live";
}

function setSpeaking(speaking) {
  speakingDot.className = "dot " + (speaking ? "dot-speaking" : "dot-listening");
}

function addMessage(role, text) {
  if (transcriptEmpty) transcriptEmpty.style.display = "none";

  const isUser = role === "user";
  const msg = document.createElement("div");
  msg.className = "msg " + (isUser ? "msg-user" : "msg-assistant");

  const avatarDiv = document.createElement("div");
  avatarDiv.className = "msg-avatar " + (isUser ? "msg-avatar-user" : "msg-avatar-sara");
  avatarDiv.textContent = isUser ? "Dr" : "S";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble " + (isUser ? "bubble-user" : "bubble-assistant");
  bubble.textContent = text;

  if (isUser) {
    msg.appendChild(bubble);
    msg.appendChild(avatarDiv);
  } else {
    msg.appendChild(avatarDiv);
    msg.appendChild(bubble);
  }

  transcriptBox.appendChild(msg);
  transcriptBox.scrollTop = transcriptBox.scrollHeight;

  transcript.push({ role, text });
}

// ── Mic ────────────────────────────────────────────────────────────────────
async function startMic() {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 24000 },
  });
  audioCtx = new AudioContext({ sampleRate: 24000 });
  const source = audioCtx.createMediaStreamSource(stream);
  processor = audioCtx.createScriptProcessor(4096, 1, 1);

  processor.onaudioprocess = (e) => {
    if (ws?.readyState !== WebSocket.OPEN) return;
    if (performance.now() / 1000 < suppressUntil) return;

    const input = e.inputBuffer.getChannelData(0);
    const pcm16 = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++)
      pcm16[i] = Math.max(-32768, Math.min(32767, Math.round(input[i] * 32767)));

    ws.send(JSON.stringify({
      type: "input_audio_buffer.append",
      audio: arrayBufferToBase64(pcm16.buffer),
    }));
  };

  source.connect(processor);
  processor.connect(audioCtx.destination);
}

function stopMic() {
  processor?.disconnect();
  processor = null;
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
  audioCtx?.close();
  audioCtx = null;
}

// ── WebSocket message handler ──────────────────────────────────────────────
function handleMessage(msg) {
  const type = msg.type || "";

  if (type === "response.audio.delta" && msg.delta) {
    suppressUntil = performance.now() / 1000 + 1.2;
    const pcm24 = base64ToInt16Array(msg.delta);
    const pcm16 = downsample(pcm24, 24000, 16000);
    simliClient?.sendAudioData(pcm16);
  }

  if (type === "input_audio_buffer.speech_started") {
    simliClient?.ClearBuffer();
  }

  if (type === "response.audio_transcript.delta" && msg.delta) {
    assistantBuf += msg.delta;
  }
  if (type === "response.audio_transcript.done") {
    if (assistantBuf.trim()) addMessage("assistant", assistantBuf.trim());
    assistantBuf = "";
  }

  if (type === "conversation.item.input_audio_transcription.completed" && msg.transcript?.trim()) {
    addMessage("user", msg.transcript.trim());
  }
}

// ── Start session ──────────────────────────────────────────────────────────
window.startSession = async function () {
  // Clean up any leftover session from a previous attempt
  if (simliClient) {
    try { await simliClient.stop(); } catch {}
    simliClient = null;
  }
  if (ws) {
    try { ws.close(); } catch {}
    ws = null;
  }
  stopMic();

  startBtn.disabled = true;
  setStatus("connecting");
  overlayText.textContent = "Connecting to Sara…";

  try {
    // 1. Connect WebSocket relay
    const wsProto = location.protocol === "https:" ? "wss" : "ws";
    ws = new WebSocket(`${wsProto}://${location.host}/api/session/relay`);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    ws.onmessage = (e) => {
      try { handleMessage(JSON.parse(e.data)); } catch {}
    };
    ws.onclose = () => setStatus("idle");

    // 2. Init Simli
    const tokenRes = await fetch("/api/simli/token", { method: "POST" });
    if (!tokenRes.ok) throw new Error("Simli token failed");
    const { session_token, ice_servers } = await tokenRes.json();

    simliClient = new SimliClient(
      session_token, videoEl, audioEl, ice_servers, LogLevel.ERROR, "p2p"
    );

    simliClient.on("start", () => {
      idleOverlay.style.display = "none";
      setStatus("active");
      setSpeaking(false);
      startBtn.style.display = "none";
      doneBtn.style.display = "block";
      startMic();
    });

    simliClient.on("speaking", () => setSpeaking(true));
    simliClient.on("silent",   () => setSpeaking(false));
    simliClient.on("stop",     () => {
      idleOverlay.style.display = "flex";
      setSpeaking(false);
    });

    await simliClient.start();

  } catch (err) {
    console.error("[start] error:", err);
    setStatus("idle");
    overlayText.textContent = "Connection failed. Try again.";
    startBtn.disabled = false;
  }
};

// ── End session ────────────────────────────────────────────────────────────
window.endSession = async function () {
  doneBtn.disabled = true;
  stopMic();
  ws?.close();
  await simliClient?.stop();
  simliClient = null;

  // Show modal immediately, then load summary
  summaryModal.style.display = "flex";
  summaryContent.textContent = "Generating summary…";

  try {
    const res = await fetch("/api/session/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });
    const { summary } = await res.json();
    summaryContent.textContent = summary;
  } catch {
    summaryContent.textContent = "Could not generate summary. Please try again.";
  }
};

// ── Restart ────────────────────────────────────────────────────────────────
window.restartSession = function () {
  transcript = [];
  assistantBuf = "";

  // Reset UI
  summaryModal.style.display = "none";
  transcriptBox.innerHTML = `<div class="transcript-empty" id="transcript-empty">Conversation will appear here...</div>`;
  idleOverlay.style.display = "flex";
  overlayText.textContent = "Click Start to begin";
  startBtn.style.display = "block";
  startBtn.disabled = false;
  doneBtn.style.display = "none";
  doneBtn.disabled = false;
  setStatus("idle");
  setSpeaking(false);
};
