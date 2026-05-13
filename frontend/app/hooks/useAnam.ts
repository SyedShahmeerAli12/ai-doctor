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
  const videoRef    = useRef<HTMLVideoElement>(null);
  const clientRef   = useRef<ReturnType<typeof createClient> | null>(null);
  const talkRef     = useRef<any>(null);
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
      setIsSpeaking(false);
    } else if (chunk) {
      try { talkRef.current.streamMessageChunk(chunk, false); } catch {}
    }
  }, []);

  const clearBuffer = useCallback(() => {
    talkRef.current = null;
    clientRef.current?.interruptPersona();
    setIsSpeaking(false);
  }, []);

  const stopAnam = useCallback(async () => {
    talkRef.current = null;
    await clientRef.current?.stopStreaming();
    clientRef.current = null;
    setIsConnected(false);
    setIsSpeaking(false);
  }, []);

  return { videoRef, isConnected, isSpeaking, initAnam, streamText, clearBuffer, stopAnam };
}
