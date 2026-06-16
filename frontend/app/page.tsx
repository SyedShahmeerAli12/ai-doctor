"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "./components/Avatar";
import { useAnam } from "./hooks/useAnam";
import { useRealtimeRelay } from "./hooks/useRealtimeRelay";

type Screen = "consultation" | "summary" | "faq";

interface Message { role: "user" | "assistant"; text: string; }

const FAQS = [
  { q: "How can I open an investment account?", a: "Open digitally through our onboarding portal using your Saudi National ID or Iqama, mobile number, and email. KYC verification takes only a few minutes." },
  { q: "What documents are required?", a: "Saudi National ID or Iqama, valid mobile number, email address, source of income details, and FATCA/CRS declarations where applicable." },
  { q: "Can non-residents open an account?", a: "Yes. Eligible non-resident investors may open accounts subject to regulatory approvals and additional KYC documents such as passport, visa, and proof of overseas address." },
  { q: "How long does account opening take?", a: "Digital onboarding completes within minutes. Compliance and KYC review may take a few hours to 2 business days depending on document completeness." },
  { q: "Is physical presence required?", a: "Most accounts open digitally via Nafath verification. In certain cases, additional verification may be required." },
  { q: "What is KYC and why is it required?", a: "Know Your Customer is a regulatory requirement to verify your identity, source of funds, and investment objectives to comply with AML regulations." },
  { q: "What is FATCA?", a: "Foreign Account Tax Compliance Act — a US regulation identifying US taxpayers holding foreign financial accounts." },
  { q: "Why was my application rejected?", a: "Common reasons include incomplete documentation, failed identity verification, expired ID, or compliance concerns." },
  { q: "What investment products do you offer?", a: "Mutual Funds, Sukuk, Equity Portfolios, Discretionary Portfolio Management, ETFs, Money Market Funds, and Wealth Management Solutions." },
  { q: "Do you offer Shariah-compliant investments?", a: "Yes. We offer Shariah-compliant products certified by an appointed Shariah Board, designed according to Islamic finance principles." },
  { q: "What is the minimum investment amount?", a: "It varies by product. Some funds start from SAR 1,000 while discretionary portfolios may require higher minimums." },
  { q: "Can I withdraw my investments anytime?", a: "Liquidity depends on the product. Open-ended funds allow redemptions within a few business days. Certain products have lock-in periods." },
  { q: "What is risk tolerance?", a: "Your ability and willingness to handle fluctuations in the value of your investments. It helps us recommend the right products for you." },
  { q: "I did not receive my OTP.", a: "Please verify your mobile number and ensure network connectivity. If the issue continues, we can resend the OTP or connect you to support." },
  { q: "My Nafath verification failed.", a: "Ensure your Nafath application is active and linked to your valid National ID or Iqama. Retry after a few minutes." },
  { q: "Is my information secure?", a: "Yes. We use secure encryption, authentication protocols, and regulatory compliance controls to protect your personal and financial information." },
  { q: "Can businesses open investment accounts?", a: "Yes. Corporate clients need commercial registration documents, authorized signatories, and corporate KYC documentation." },
  { q: "How can I contact customer support?", a: "You can reach us via phone, email, live chat, WhatsApp, or through a dedicated relationship manager." },
];

export default function Page() {
  const router = useRouter();
  const [authed,       setAuthed]       = useState(false);
  const [screen,       setScreen]       = useState<Screen>("consultation");
  const [sessionState, setSessionState] = useState<"idle" | "connecting" | "active">("idle");
  const [transcript,   setTranscript]   = useState<Message[]>([]);
  const [summary,      setSummary]      = useState("");
  const [topics,       setTopics]       = useState<string[]>([]);
  const [summarizing,  setSummarizing]  = useState(false);
  const [isTalking,    setIsTalking]    = useState(false);
  const isTalkingRef = useRef(false);

  const anam  = useAnam();
  const relay = useRealtimeRelay();

  const audioCtxRef  = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef    = useRef<MediaStream | null>(null);

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
    }
  }, [anam.isConnected, sessionState]);

  const startMic = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 24000 },
    });
    streamRef.current = stream;
    const ctx = new AudioContext({ sampleRate: 24000 });
    audioCtxRef.current = ctx;
    const source = ctx.createMediaStreamSource(stream);
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;
    processor.onaudioprocess = (e) => {
      if (!isTalkingRef.current) return;
      const input = e.inputBuffer.getChannelData(0);
      const pcm16 = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++)
        pcm16[i] = Math.max(-32768, Math.min(32767, Math.round(input[i] * 32767)));
      relay.sendAudio(pcm16);
    };
    source.connect(processor);
    processor.connect(ctx.destination);
  };

  const stopMic = () => {
    processorRef.current?.disconnect();
    processorRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
  };

  const handleConnect = useCallback(() => {
    setSessionState("connecting");
    relay.connect(
      () => {},
      addTranscript,
      () => anam.clearBuffer(),
      () => anam.streamText("", true),
      (delta) => anam.streamText(delta, false),
    );
  }, [relay, anam, addTranscript]);

  const handlePTT = useCallback(() => {
    if (anam.isSpeaking) return;
    if (!isTalkingRef.current) {
      // Start talking — interrupt avatar if needed and open mic
      anam.clearBuffer();
      isTalkingRef.current = true;
      setIsTalking(true);
    } else {
      // Done talking — close mic, commit audio, trigger response
      isTalkingRef.current = false;
      setIsTalking(false);
      relay.commitAudio();
    }
  }, [anam, relay]);

  const handleDone = useCallback(async () => {
    stopMic();
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
      setTopics(data.topics || []);
    } catch {
      setSummary("Session complete. Thank you for consulting with Sara.");
      setTopics([]);
    } finally {
      setSummarizing(false);
    }
  }, [relay, anam, transcript]);

  const handleRestart = useCallback(() => {
    setTranscript([]);
    setSummary("");
    setTopics([]);
    setScreen("consultation");
    setSessionState("idle");
    isTalkingRef.current = false;
    setIsTalking(false);
  }, []);

  useEffect(() => () => { stopMic(); relay.disconnect(); anam.stopAnam(); }, []);

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
            <img src="/dt-logo.png" alt="DigiTrends" className="h-8 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider leading-none mb-0.5">Knowledge Base</p>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Frequently Asked Questions</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm font-semibold text-dt-red mb-1.5">{faq.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-dt-red text-white font-semibold text-sm hover:opacity-90 transition-colors"
          >
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

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/dt-logo.png" alt="DigiTrends" className="h-8 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider leading-none mb-0.5">Session Complete</p>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Consultation Summary</h2>
            </div>
          </div>

          {/* Sara card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-dt-red flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Sara</p>
                <p className="text-xs text-gray-400">DT Voice Assistant</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">Session Ended</span>
              </div>
            </div>

            {summarizing ? (
              <div className="flex items-center gap-2 text-gray-400 py-2">
                <svg className="animate-spin h-4 w-4 text-dt-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm text-gray-500">Generating your summary…</span>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{summary}</p>

                {topics.length > 0 && (
                  <>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Topics Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-red-50 text-dt-red font-medium border border-red-100">
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-auto">
            <button
              onClick={() => setScreen("faq")}
              className="w-full py-3.5 rounded-xl border-2 border-dt-red text-dt-red font-semibold text-sm hover:bg-red-50 transition-colors"
            >
              FAQs
            </button>
            <button
              onClick={handleRestart}
              className="w-full py-3.5 rounded-xl bg-dt-red text-white font-semibold text-sm hover:opacity-90 transition-colors"
            >
              Start New Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Consultation screen — full page avatar ────────────────────────────────
  return (
    <div className="flex flex-col bg-gray-950 overflow-hidden" style={{ height: "100dvh" }}>
      <div className="flex-1 min-h-0 relative">
        <Avatar
          videoRef={anam.videoRef}
          isSpeaking={anam.isSpeaking}
          isConnected={anam.isConnected}
          isConnecting={isConnecting}
        />
      </div>

      <div
        className="flex-shrink-0 px-4 py-4 sm:px-6 sm:py-5 bg-gray-900 border-t border-gray-800"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        {(isIdle || isConnecting) && (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full py-3.5 rounded-xl bg-dt-red text-white font-semibold text-sm
              hover:opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isConnecting ? "Connecting…" : "Start Consultation"}
          </button>
        )}
        {isActive && (
          <div className="flex flex-col gap-2">
            <button
              onClick={handlePTT}
              disabled={anam.isSpeaking}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all
                disabled:opacity-40 disabled:cursor-not-allowed
                ${isTalking
                  ? "bg-green-600 text-white scale-[1.02] shadow-lg shadow-green-900/40"
                  : "bg-dt-red text-white hover:opacity-90"
                }`}
            >
              {anam.isSpeaking ? "She is speaking…" : isTalking ? "⏹ Done — Send" : "🎤 Tap to Speak"}
            </button>
            <button
              onClick={handleDone}
              className="w-full py-2.5 rounded-xl border border-gray-600 text-gray-400 text-xs font-medium hover:text-white hover:border-gray-400 transition-colors"
            >
              End Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
