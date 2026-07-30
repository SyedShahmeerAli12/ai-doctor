"use client";
import { useCallback, useRef, useState } from "react";
import { createClient, AnamEvent } from "@anam-ai/js-sdk";

const VIDEO_ID = "jadwa-avatar-video";

interface UseAnamReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isConnected: boolean;
  isSpeaking: boolean;
  initAnam: (onAudioStream?: (stream: MediaStream) => void) => Promise<void>;
  sendAudioChunk: (base64: string) => void;
  endAudioSequence: () => void;
  clearBuffer: () => void;
  stopAnam: () => Promise<void>;
}

export function useAnam(): UseAnamReturn {
  const videoRef        = useRef<HTMLVideoElement>(null);
  const clientRef       = useRef<ReturnType<typeof createClient> | null>(null);
  const audioStreamRef  = useRef<any>(null);
  const endSpeechTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstChunkRef = useRef(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking,  setIsSpeaking]  = useState(false);

  const initAnam = useCallback(async (onAudioStream?: (stream: MediaStream) => void) => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const res = await fetch(`${base}/api/anam/token`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to get Anam token");
    const data = await res.json();
    const sessionToken = data.sessionToken ?? data.session_token;

    const client = createClient(sessionToken, { disableInputAudio: true });

    client.addListener(AnamEvent.CONNECTION_ESTABLISHED, () => setIsConnected(true));
    client.addListener(AnamEvent.AUDIO_STREAM_STARTED, (stream: MediaStream) => {
      console.log("[anam] AUDIO_STREAM_STARTED tracks:", stream.getAudioTracks().length);
      onAudioStream?.(stream);
    });
    client.addListener(AnamEvent.CONNECTION_CLOSED, () => {
      setIsConnected(false);
      setIsSpeaking(false);
      audioStreamRef.current = null;
    });
    client.addListener(AnamEvent.MESSAGE_STREAM_EVENT_RECEIVED, (e: any) => {
      if (e?.endOfSpeech) {
        if (endSpeechTimer.current) clearTimeout(endSpeechTimer.current);
        endSpeechTimer.current = setTimeout(() => setIsSpeaking(false), 1500);
      } else {
        if (endSpeechTimer.current) { clearTimeout(endSpeechTimer.current); endSpeechTimer.current = null; }
      }
    });

    clientRef.current = client;
    if (videoRef.current) videoRef.current.id = VIDEO_ID;
    await client.streamToVideoElement(VIDEO_ID);

    // Audio input stream — Anam lip-syncs to whatever PCM16 audio we feed it
    audioStreamRef.current = client.createAgentAudioInputStream({
      encoding: "pcm_s16le",
      sampleRate: 16000,
      channels: 1,
    });
    isFirstChunkRef.current = true;
  }, []);

  const sendAudioChunk = useCallback((base64: string) => {
    if (!audioStreamRef.current) return;
    if (isFirstChunkRef.current) {
      setIsSpeaking(true);
      isFirstChunkRef.current = false;
    }
    audioStreamRef.current.sendAudioChunk(base64);
  }, []);

  const endAudioSequence = useCallback(() => {
    if (!audioStreamRef.current) return;
    isFirstChunkRef.current = true;
    audioStreamRef.current.endSequence();
    if (endSpeechTimer.current) clearTimeout(endSpeechTimer.current);
    endSpeechTimer.current = setTimeout(() => setIsSpeaking(false), 2500);
  }, []);

  const clearBuffer = useCallback(() => {
    if (endSpeechTimer.current) { clearTimeout(endSpeechTimer.current); endSpeechTimer.current = null; }
    isFirstChunkRef.current = true;
    clientRef.current?.interruptPersona();
    if (audioStreamRef.current) {
      try { audioStreamRef.current.endSequence(); } catch {}
    }
    setIsSpeaking(false);
  }, []);

  const stopAnam = useCallback(async () => {
    if (endSpeechTimer.current) { clearTimeout(endSpeechTimer.current); endSpeechTimer.current = null; }
    audioStreamRef.current = null;
    await clientRef.current?.stopStreaming();
    clientRef.current = null;
    setIsConnected(false);
    setIsSpeaking(false);
  }, []);

  return { videoRef, isConnected, isSpeaking, initAnam, sendAudioChunk, endAudioSequence, clearBuffer, stopAnam };
}
