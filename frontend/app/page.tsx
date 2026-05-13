"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "./components/Avatar";
import Transcript, { type TranscriptItem } from "./components/Transcript";
import { useAnam } from "./hooks/useAnam";
import { useRealtimeRelay } from "./hooks/useRealtimeRelay";

type Screen = "consultation" | "summary";

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
  const [transcript,   setTranscript]   = useState<TranscriptItem[]>([]);
  const [sessionState, setSessionState] = useState<"idle" | "connecting" | "active">("idle");

  const anam  = useAnam();
  const relay = useRealtimeRelay();

  const addTranscript = useCallback((role: "user" | "assistant", text: string) => {
    const item: TranscriptItem = { ts: Date.now(), role, text };
    setTranscript((prev) => [...prev, item]);
  }, []);

  const audioCtxRef  = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef    = useRef<MediaStream | null>(null);

  // Auth check
  useEffect(() => {
    const token = sessionStorage.getItem("jadwa_token");
    if (!token) { router.push("/login"); return; }
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    fetch(`${base}/api/auth/verify`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { if (r.ok) setAuthed(true); else { sessionStorage.removeItem("jadwa_token"); router.push("/login"); } })
      .catch(() => router.push("/login"));
  }, []);

  // Close session on tab/browser close
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

  const handleDone = useCallback(() => {
    stopMic();
    relay.disconnect();
    anam.stopAnam();
    setSessionState("idle");
    setScreen("summary");
  }, [relay, anam]);

  const handleRestart = useCallback(() => {
    setTranscript([]);
    setScreen("consultation");
    setSessionState("idle");
  }, []);

  useEffect(() => () => { stopMic(); relay.disconnect(); anam.stopAnam(); }, []);

  if (!authed) return null;

  const isIdle       = sessionState === "idle";
  const isConnecting = sessionState === "connecting";
  const isActive     = sessionState === "active";

  // ── Summary / FAQ screen ──────────────────────────────────────────────────
  if (screen === "summary") {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-jadwa-green rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">J</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider leading-none mb-0.5">Session Complete</p>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Frequently Asked Questions</h2>
            </div>
          </div>

          {/* FAQ grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm font-semibold text-jadwa-green mb-1.5">{faq.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-jadwa-green text-white font-semibold text-sm hover:bg-jadwa-light transition-colors"
          >
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  // ── Consultation screen ───────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 sm:px-5 py-3 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-jadwa-green rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">J</span>
          </div>
          <span className="font-bold text-gray-900 text-sm">Jadwa Investment</span>
          <span className="text-gray-300 hidden sm:inline">·</span>
          <span className="text-gray-500 text-sm hidden sm:inline">Account Assistant</span>
        </div>
      </div>

      {/* Main — stacks vertically on mobile, side-by-side on md+ */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* Avatar — top on mobile, left on desktop */}
        <div className="w-full h-56 sm:h-72 md:h-auto md:w-[40%] md:flex-shrink-0 md:border-r border-b md:border-b-0 border-gray-200">
          <Avatar
            videoRef={anam.videoRef}
            isSpeaking={anam.isSpeaking}
            isConnected={anam.isConnected}
            isConnecting={isConnecting}
          />
        </div>

        {/* Transcript + controls */}
        <div className="flex-1 flex flex-col p-4 sm:p-5 gap-3 sm:gap-4 min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0">
            <Transcript
              items={transcript}
              isMicActive={isActive && !anam.isSpeaking}
            />
          </div>
          <div className="flex-shrink-0">
            {(isIdle || isConnecting) && (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-3.5 rounded-xl bg-jadwa-green text-white font-semibold text-sm
                  hover:bg-jadwa-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isConnecting ? "Connecting…" : "Start Consultation"}
              </button>
            )}
            {isActive && (
              <button
                onClick={handleDone}
                className="w-full py-3.5 rounded-xl bg-danger text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
