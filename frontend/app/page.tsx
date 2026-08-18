"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAnam } from "./hooks/useAnam";
import { useRealtimeRelay } from "./hooks/useRealtimeRelay";

function resampleTo(input: Int16Array, fromRate: number, toRate: number): Int16Array {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const outLen = Math.floor(input.length / ratio);
  const out = new Int16Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const pos = i * ratio;
    const lo = Math.floor(pos);
    const hi = Math.min(lo + 1, input.length - 1);
    const frac = pos - lo;
    out[i] = Math.round(input[lo] * (1 - frac) + input[hi] * frac);
  }
  return out;
}

function base64ToInt16(b64: string): Int16Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function int16ToBase64(arr: Int16Array): string {
  const bytes = new Uint8Array(arr.buffer);
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize)
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunkSize)));
  return btoa(binary);
}

type Screen = "consultation" | "summary" | "faq";
interface Message { role: "user" | "assistant"; text: string; }

const FAQS = [
  { q: "What is Community-Acquired Pneumonia?", a: "CAP is a pneumonia acquired outside of hospital settings, caused by bacteria such as Streptococcus pneumoniae, Haemophilus influenzae, and atypical organisms." },
  { q: "When is Augmentin appropriate for CAP?", a: "Augmentin is appropriate for clinically established or strongly suspected bacterial CAP in outpatient-eligible patients who have passed safety screening." },
  { q: "What is the mechanism of Augmentin?", a: "Amoxicillin interferes with bacterial cell-wall synthesis; clavulanate inhibits certain beta-lactamases that would otherwise inactivate amoxicillin." },
  { q: "What are the key contraindications?", a: "Serious penicillin/beta-lactam hypersensitivity and previous Augmentin-associated cholestatic jaundice or hepatic dysfunction are major contraindications." },
  { q: "Does Augmentin cover atypical CAP pathogens?", a: "No. Augmentin does not reliably cover atypicals such as Mycoplasma, Chlamydophila, or Legionella — reps must never claim broad atypical coverage." },
  { q: "How should dose be adjusted for renal impairment?", a: "Dose adjustment may be needed — always defer to the approved prescribing information and physician judgment." },
  { q: "What GI side effects should be mentioned?", a: "Diarrhoea, nausea, and vomiting are recognised. Administration at the start of a meal helps reduce GI intolerance." },
  { q: "When should a CAP patient be escalated?", a: "Worsening dyspnoea, falling oxygen saturation, confusion, or systemic deterioration require urgent assessment for appropriate level of care — not outpatient antibiotics." },
  { q: "Is Augmentin safe in pregnancy?", a: "Requires individual risk-benefit assessment. Always refer to the approved prescribing information — no blanket claim should be made." },
  { q: "What drug interactions matter?", a: "Warfarin (INR monitoring), allopurinol (rash risk), and probenecid (increased amoxicillin levels) are relevant interactions." },
];

export default function Page() {
  const router = useRouter();
  const [authed,       setAuthed]       = useState(false);
  const [screen,       setScreen]       = useState<Screen>("consultation");
  const [sessionState, setSessionState] = useState<"idle" | "connecting" | "active">("idle");
  const [transcript,   setTranscript]   = useState<Message[]>([]);
  const [summary,      setSummary]      = useState("");
  const [summarizing,  setSummarizing]  = useState(false);
  const [isMuted,      setIsMuted]      = useState(false);
  const [elapsed,      setElapsed]      = useState(0);
  const anam  = useAnam();
  const relay = useRealtimeRelay();

  const audioCtxRef   = useRef<AudioContext | null>(null);
  const workletRef    = useRef<AudioWorkletNode | null>(null);
  const streamRef     = useRef<MediaStream | null>(null);
  const micTrackRef   = useRef<MediaStreamTrack | null>(null);
  const nativeRateRef = useRef<number>(48000);
  const cameraVideoRef  = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const timerRef        = useRef<ReturnType<typeof setInterval> | null>(null);

  const addTranscript = useCallback((role: "user" | "assistant", text: string) => {
    setTranscript((prev) => [...prev, { role, text }]);
  }, []);

  // Auth check
  useEffect(() => {
    const token = sessionStorage.getItem("jadwa_token");
    if (!token) { router.push("/login"); return; }
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    fetch(`${base}/api/auth/verify`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { if (r.ok) setAuthed(true); else { sessionStorage.removeItem("jadwa_token"); router.push("/login"); } })
      .catch(() => router.push("/login"));
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => { anam.stopAnam(); };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [anam]);

  useEffect(() => {
    if (relay.isConnected && !anam.isConnected && sessionState === "connecting")
      anam.initAnam().catch(console.error);
  }, [relay.isConnected, anam.isConnected, sessionState]);

  useEffect(() => {
    if (anam.isConnected && sessionState === "connecting") {
      setSessionState("active");
      startMic();
      startCamera();
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      const vid = anam.videoRef.current;
      if (vid) { vid.muted = false; vid.volume = 1.0; vid.play().catch(() => {}); }
    }
  }, [anam.isConnected, sessionState]);

  const startMic = async () => {
    const stream = streamRef.current ?? await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    streamRef.current = stream;
    micTrackRef.current = stream.getAudioTracks()[0];

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    nativeRateRef.current = ctx.sampleRate;

    await ctx.audioWorklet.addModule("/audio-processor.js");
    const source = ctx.createMediaStreamSource(stream);
    const worklet = new AudioWorkletNode(ctx, "audio-processor");
    workletRef.current = worklet;

    worklet.port.onmessage = (e: MessageEvent<Int16Array>) => {
      const pcm24k = resampleTo(e.data, nativeRateRef.current, 24000);
      relay.sendAudio(pcm24k);
    };

    source.connect(worklet);
  };

  const stopMic = () => {
    workletRef.current?.disconnect();
    workletRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    micTrackRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
  };

  const startCamera = async () => {
    try {
      const stream = cameraStreamRef.current ?? await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      cameraStreamRef.current = stream;
      if (cameraVideoRef.current) cameraVideoRef.current.srcObject = stream;
    } catch (e) {
      console.warn("[camera] could not access camera:", e);
    }
  };

  const stopCamera = () => {
    cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
    cameraStreamRef.current = null;
    if (cameraVideoRef.current) cameraVideoRef.current.srcObject = null;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleConnect = useCallback(async () => {
    setSessionState("connecting");

    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = audioStream;
      micTrackRef.current = audioStream.getAudioTracks()[0];
    } catch (e) {
      console.error("[mic] permission denied:", e);
      setSessionState("idle");
      return;
    }

    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      cameraStreamRef.current = videoStream;
      if (cameraVideoRef.current) cameraVideoRef.current.srcObject = videoStream;
    } catch (e) {
      console.warn("[camera] permission denied, continuing without camera");
    }

    relay.connect(
      (b64) => anam.sendAudioChunk(int16ToBase64(resampleTo(base64ToInt16(b64), 24000, 16000))),
      addTranscript,
      () => {},
      () => anam.endAudioSequence(),
      undefined,
      () => {
        if (micTrackRef.current) micTrackRef.current.enabled = false;
      },
    );
  }, [relay, anam, addTranscript]);

  const handleDone = useCallback(async () => {
    stopMic();
    stopCamera();
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setElapsed(0);
    relay.disconnect();
    anam.stopAnam();
    setSessionState("idle");
    setScreen("summary");
    setSummarizing(true);
    setSummary("");
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const res = await fetch(`${base}/api/session/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: transcript }),
      });
      const data = await res.json();
      setSummary(data.summary || "Session complete.");
    } catch {
      setSummary("Training session complete. Review the scoring feedback Dr. Maryam Khan provided during your detailing visit.");
    } finally {
      setSummarizing(false);
    }
  }, [relay, anam, transcript]);

  const handleRestart = useCallback(() => {
    setTranscript([]);
    setSummary("");
    setIsMuted(false);
    setElapsed(0);
    setScreen("consultation");
    setSessionState("idle");
  }, []);

  const toggleMute = useCallback(() => {
    if (!micTrackRef.current) return;
    const next = !isMuted;
    micTrackRef.current.enabled = !next;
    setIsMuted(next);
  }, [isMuted]);

  useEffect(() => {
    if (!anam.isSpeaking && micTrackRef.current) {
      micTrackRef.current.enabled = true;
    }
  }, [anam.isSpeaking]);

  useEffect(() => () => {
    stopMic();
    stopCamera();
    if (timerRef.current) clearInterval(timerRef.current);
    relay.disconnect();
    anam.stopAnam();
  }, []);

  if (!authed) return null;

  const isIdle       = sessionState === "idle";
  const isConnecting = sessionState === "connecting";
  const isActive     = sessionState === "active";

  // ── FAQ screen ────────────────────────────────────────────────────────────
  if (screen === "faq") {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setScreen("summary")} className="text-gray-400 hover:text-gray-600 transition-colors mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img src="/gsk-new-logo.png" alt="GSK" className="h-8 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider leading-none mb-0.5">Knowledge Base</p>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Augmentin · CAP Reference</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm font-semibold text-red-600 mb-1.5">{faq.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <button onClick={handleRestart} className="w-full py-3.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:opacity-90 transition-colors">
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  // ── Summary screen ────────────────────────────────────────────────────────
  if (screen === "summary") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col p-4 sm:p-6">
        <div className="max-w-lg mx-auto w-full flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-6">
            <img src="/gsk-new-logo.png" alt="GSK" className="h-8 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider leading-none mb-0.5">Session Complete</p>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Consultation Summary</h2>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Dr. Maryam Khan</p>
                <p className="text-xs text-gray-400">Consultant Physician</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">Session Ended</span>
              </div>
            </div>
            {summarizing ? (
              <div className="flex items-center gap-2 text-gray-400 py-2">
                <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm text-gray-500">Generating your summary…</span>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-auto">
            <button onClick={() => setScreen("faq")} className="w-full py-3.5 rounded-xl border-2 border-red-600 text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors">
              CAP Reference
            </button>
            <button onClick={handleRestart} className="w-full py-3.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:opacity-90 transition-colors">
              Start New Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Consultation screen ───────────────────────────────────────────────────
  return (
    <>
      <style>{`
        :root{--bg:#0b1220;--panel:#111a2b;--panel-2:#16223a;--edge:rgba(255,255,255,0.08);--text:#eef2f8;--text-dim:#9fb0c9;--accent:#22c55e;--danger:#e5484d;}
        *{box-sizing:border-box;}
        .stage{width:100%;height:100dvh;margin:0;background:var(--bg);display:flex;flex-direction:column;overflow:hidden;position:relative;}

        .topbar{flex:0 0 auto;background:#0e1626;padding:10px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--edge);}
        .topbar h1{font-size:16px;font-weight:700;margin:0;letter-spacing:0.2px;color:var(--text);}
        .topbar-left{display:flex;align-items:center;gap:16px;}

        .video-wrap{flex:1 1 auto;position:relative;padding:14px;gap:12px;display:flex;align-items:stretch;justify-content:flex-start;min-height:0;background:linear-gradient(100deg,#0b1220 0%,#10202a 55%,#163038 100%);}

        .main-video{position:relative;flex:1 1 0;min-width:0;border-radius:8px;overflow:hidden;background:#14181f;box-shadow:0 0 0 1px var(--edge);}
        .main-video .video-slot{position:absolute;inset:0;}
        .main-video .video-slot video{width:100%;height:100%;object-fit:contain;display:block;background:#14181f;}
        .name-tag{position:absolute;left:14px;bottom:14px;background:rgba(10,14,22,0.65);backdrop-filter:blur(2px);color:#fff;font-size:13px;font-weight:600;padding:5px 12px;border-radius:5px;z-index:2;}
        .rec-badge{position:absolute;top:14px;right:14px;background:rgba(10,14,22,0.55);color:#fff;font-size:12px;padding:4px 10px;border-radius:5px;display:flex;align-items:center;gap:6px;z-index:2;}
        .rec-dot{width:8px;height:8px;border-radius:50%;background:var(--danger);}

        .pip-panel{flex:0 0 300px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:16px;gap:8px;}
        .pip{position:relative;width:100%;aspect-ratio:16/11;background:#14181f;border-radius:10px;border:3px solid var(--accent);overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.5),0 0 0 1px rgba(34,197,94,0.25);}
        .pip .video-slot{position:absolute;inset:0;}
        .pip .video-slot video{width:100%;height:100%;object-fit:cover;display:block;transform:scaleX(-1);}
        .pip .pip-mic{position:absolute;top:8px;right:8px;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;z-index:2;}
        .pip .pip-name{position:absolute;left:10px;bottom:8px;color:#fff;font-size:13px;font-weight:600;text-shadow:0 1px 3px rgba(0,0,0,0.6);z-index:2;}

        .controls{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;padding:10px 22px 16px 22px;background:#0b1220;}
        .ctrl-group{display:flex;align-items:center;gap:26px;}
        .ctrl{display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--text-dim);font-size:11px;cursor:pointer;background:none;border:none;font-family:inherit;}
        .ctrl .circle{width:44px;height:44px;border-radius:50%;background:var(--panel-2);display:flex;align-items:center;justify-content:center;color:var(--text);font-size:18px;}
        .ctrl:hover .circle{background:#1d2c47;}
        .ctrl.active .circle{background:rgba(34,197,94,0.16);color:var(--accent);}
        .ctrl.danger .circle{background:rgba(229,72,77,0.18);color:var(--danger);}
        .timer-block{display:flex;align-items:center;gap:18px;}
        .sess-timer{font-variant-numeric:tabular-nums;font-size:13px;color:var(--text-dim);background:var(--panel-2);padding:6px 12px;border-radius:20px;letter-spacing:0.4px;}
        .end-btn{background:var(--danger);border:none;color:#fff;padding:12px 24px;border-radius:24px;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;cursor:pointer;font-family:inherit;min-height:48px;}
        .end-btn:hover{background:#cf3a3f;}
        .end-btn:disabled{opacity:0.4;cursor:not-allowed;}

        .start-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(11,18,32,0.88);z-index:10;gap:16px;padding:20px;}
        .start-btn{background:#22c55e;border:none;color:#06210f;padding:16px 40px;border-radius:28px;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:0.3px;min-height:56px;width:100%;max-width:320px;}
        .start-btn:hover{background:#16a34a;}
        .start-btn:disabled{opacity:0.5;cursor:not-allowed;}
        .speak-indicator{position:absolute;bottom:44px;left:14px;display:flex;align-items:center;gap:8px;background:rgba(10,14,22,0.7);backdrop-filter:blur(4px);padding:5px 12px;border-radius:20px;z-index:3;font-size:12px;color:#fff;}
        .speak-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);animation:pulse 1s infinite;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .pip-placeholder{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:#14181f;color:var(--text-dim);font-size:12px;}

        @media (max-width: 640px) {
          .topbar{padding:8px 14px;}
          .topbar h1{font-size:13px;line-height:1.3;}
          .video-wrap{padding:0;gap:0;}
          .main-video{border-radius:0;box-shadow:none;}
          .pip-panel{position:absolute;top:10px;right:10px;width:110px;flex:none;padding:0;justify-content:flex-start;z-index:20;}
          .pip{aspect-ratio:3/4;border-width:2px;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,0.7);width:100%;}
          .pip .pip-name{font-size:11px;left:6px;bottom:6px;}
          .pip .pip-mic{width:22px;height:22px;font-size:11px;top:6px;right:6px;}
          .name-tag{font-size:12px;padding:4px 10px;left:10px;bottom:10px;}
          .rec-badge{font-size:11px;padding:3px 8px;top:10px;right:10px;}
          .speak-indicator{bottom:70px;left:10px;font-size:11px;}
          .controls{padding:10px 16px 16px;gap:0;}
          .ctrl-group{gap:20px;}
          .ctrl{font-size:10px;}
          .ctrl .circle{width:44px;height:44px;font-size:18px;}
          .sess-timer{font-size:12px;padding:5px 10px;}
          .end-btn{padding:12px 20px;font-size:13px;border-radius:22px;}
        }
      `}</style>

      <div className="stage" style={{ fontFamily: '-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif', color: '#eef2f8', zoom: 0.9 }}>

        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-left">
            <img src="/gsk-new-logo.png" alt="GSK" style={{ height: 28, objectFit: 'contain' }} />
            <h1>Augmentin · AI Doctor Simulation</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#9fb0c9' }}>
            {isActive && <><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> Live</>}
            {isConnecting && <span style={{ color: '#f59e0b' }}>Connecting…</span>}
          </div>
        </div>

        {/* VIDEO WRAP */}
        <div className="video-wrap">

          {/* MAIN VIDEO — Dr. Maryam Khan avatar */}
          <div className="main-video">
            <div className="video-slot">
              <video ref={anam.videoRef} autoPlay playsInline />
            </div>

            <div className="rec-badge">
              <span className="rec-dot" style={{ background: isActive ? (anam.isSpeaking ? '#22c55e' : '#e5484d') : '#475569' }} />
              {isActive ? (anam.isSpeaking ? 'SPEAKING' : 'REC') : 'WAITING'}
            </div>

            <div className="name-tag">Dr. Maryam Khan</div>

            {isActive && (
              <div className="speak-indicator">
                {anam.isSpeaking
                  ? <><span className="speak-dot" style={{ background: '#22c55e' }} /> Dr. Khan is speaking</>
                  : <><span className="speak-dot" style={{ background: '#3b82f6', animationDuration: '2s' }} /> Listening…</>
                }
              </div>
            )}

            {!isActive && (
              <div className="start-overlay">
                <div style={{ fontSize: 14, color: '#9fb0c9', marginBottom: 4 }}>Dr. Maryam Khan · Consultant Physician</div>
                {isConnecting ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#22c55e', fontSize: 13 }}>
                    <span className="speak-dot" /> Connecting to session…
                  </div>
                ) : (
                  <button className="start-btn" onClick={handleConnect}>▶ Start Training Session</button>
                )}
              </div>
            )}
          </div>

          {/* PiP — rep camera */}
          <div className="pip-panel"><div className="pip">
            <div className="video-slot">
              <video ref={cameraVideoRef} autoPlay playsInline muted />
            </div>
            {!isActive && (
              <div className="pip-placeholder">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#9fb0c9" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span>You</span>
              </div>
            )}
            <div className="pip-mic" style={{ background: isMuted ? '#e5484d' : '#22c55e', color: isMuted ? '#fff' : '#06210f' }}>
              {isMuted ? '🔇' : '🎤'}
            </div>
            <div className="pip-name">You (Rep)</div>
          </div></div>
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="controls">
          <div className="ctrl-group">
            <button className="ctrl"><span className="circle">⚙</span>Settings</button>
            <button className="ctrl active"><span className="circle">CC</span>Captions</button>
          </div>
          <div className="timer-block">
            <span className="sess-timer">{formatTime(elapsed)}</span>
          </div>
          <div className="ctrl-group">
            <button
              className={`ctrl ${isActive ? (isMuted ? 'danger' : 'active') : ''}`}
              onClick={isActive ? toggleMute : undefined}
              style={{ cursor: isActive ? 'pointer' : 'not-allowed', opacity: isActive ? 1 : 0.4 }}
            >
              <span className="circle">{isMuted ? '🔇' : '🎤'}</span>
              {isMuted ? 'Unmute' : 'Audio'}
            </button>
            <button className="ctrl" style={{ opacity: 0.4, cursor: 'not-allowed' }}>
              <span className="circle">📷</span>Video
            </button>
            <button className="end-btn" onClick={isActive ? handleDone : undefined} disabled={!isActive}>
              ⏻ End
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
