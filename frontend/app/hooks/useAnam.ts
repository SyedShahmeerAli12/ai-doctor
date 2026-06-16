"use client";
import { useCallback, useRef, useState } from "react";
import { createClient, AnamEvent } from "@anam-ai/js-sdk";

const VIDEO_ID = "jadwa-avatar-video";

interface UseAnamReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isConnected: boolean;
  isSpeaking: boolean;
  initAnam: () => Promise<void>;
  streamText: (chunk: string, isEnd: boolean) => void;
  clearBuffer: () => void;
  stopAnam: () => Promise<void>;
}

export function useAnam(): UseAnamReturn {
  const videoRef          = useRef<HTMLVideoElement>(null);
  const clientRef         = useRef<ReturnType<typeof createClient> | null>(null);
  const talkRef           = useRef<any>(null);
  const endSpeechTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking,  setIsSpeaking]  = useState(false);

  const initAnam = useCallback(async () => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const res = await fetch(`${base}/api/anam/token`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to get Anam token");
    const data = await res.json();
    const sessionToken = data.sessionToken ?? data.session_token;

    const client = createClient(sessionToken, { disableInputAudio: true });

    client.addListener(AnamEvent.CONNECTION_ESTABLISHED, () => setIsConnected(true));
    client.addListener(AnamEvent.CONNECTION_CLOSED, () => {
      setIsConnected(false);
      setIsSpeaking(false);
      talkRef.current = null;
    });
    client.addListener(AnamEvent.MESSAGE_STREAM_EVENT_RECEIVED, (e: any) => {
      if (e?.endOfSpeech) {
        // Debounce: wait 1.5s before disabling — prevents flicker between sentences
        if (endSpeechTimer.current) clearTimeout(endSpeechTimer.current);
        endSpeechTimer.current = setTimeout(() => setIsSpeaking(false), 1500);
      } else {
        // New speech chunk arriving — cancel any pending disable
        if (endSpeechTimer.current) { clearTimeout(endSpeechTimer.current); endSpeechTimer.current = null; }
      }
    });

    clientRef.current = client;
    if (videoRef.current) videoRef.current.id = VIDEO_ID;
    await client.streamToVideoElement(VIDEO_ID);
  }, []);

  const streamText = useCallback((chunk: string, isEnd: boolean) => {
    if (!clientRef.current) return;

    // Lazily create a new stream at the start of each response
    if (!talkRef.current) {
      try {
        talkRef.current = clientRef.current.createTalkMessageStream();
        setIsSpeaking(true);
      } catch { return; }
    }

    if (isEnd) {
      try { talkRef.current.endMessage(); } catch {}
      talkRef.current = null;
      // isSpeaking stays true until MESSAGE_STREAM_EVENT_RECEIVED fires endOfSpeech
    } else if (chunk) {
      try { talkRef.current.streamMessageChunk(chunk, false); } catch {}
    }
  }, []);

  const clearBuffer = useCallback(() => {
    if (endSpeechTimer.current) { clearTimeout(endSpeechTimer.current); endSpeechTimer.current = null; }
    talkRef.current = null;
    clientRef.current?.interruptPersona();
    setIsSpeaking(false);
  }, []);

  const stopAnam = useCallback(async () => {
    if (endSpeechTimer.current) { clearTimeout(endSpeechTimer.current); endSpeechTimer.current = null; }
    talkRef.current = null;
    await clientRef.current?.stopStreaming();
    clientRef.current = null;
    setIsConnected(false);
    setIsSpeaking(false);
  }, []);

  return { videoRef, isConnected, isSpeaking, initAnam, streamText, clearBuffer, stopAnam };
}
