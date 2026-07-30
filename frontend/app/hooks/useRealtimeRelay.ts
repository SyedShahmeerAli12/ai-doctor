"use client";
import { useCallback, useRef, useState } from "react";

type MessageHandler = (role: "user" | "assistant", text: string) => void;
type AudioHandler   = (base64: string) => void;

interface UseRealtimeRelayReturn {
  isConnected: boolean;
  connect: (onAudio: AudioHandler, onTranscript: MessageHandler, onInterrupt: () => void, onSpeechEnd?: () => void, onTranscriptDelta?: (delta: string) => void, onSpeechStart?: () => void) => void;
  sendAudio: (pcm16: Int16Array) => void;
  commitAudio: () => void;
  disconnect: () => void;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize)
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunkSize)));
  return btoa(binary);
}

function base64ToInt16Array(b64: string): Int16Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

export function useRealtimeRelay(): UseRealtimeRelayReturn {
  const wsRef             = useRef<WebSocket | null>(null);
  const audioSentRef      = useRef(false);
  const [isConnected, setIsConnected] = useState(false);
  const onAudioRef        = useRef<AudioHandler | null>(null);
  const onTranscriptRef   = useRef<MessageHandler | null>(null);
  const onInterruptRef    = useRef<(() => void) | null>(null);
  const onSpeechEndRef        = useRef<(() => void) | null>(null);
  const onSpeechStartRef      = useRef<(() => void) | null>(null);
  const onTranscriptDeltaRef  = useRef<((d: string) => void) | null>(null);
  const assistantBufRef       = useRef("");
  const speechStartFiredRef   = useRef(false);

  const connect = useCallback((
    onAudio: AudioHandler,
    onTranscript: MessageHandler,
    onInterrupt: () => void,
    onSpeechEnd?: () => void,
    onTranscriptDelta?: (delta: string) => void,
    onSpeechStart?: () => void,
  ) => {
    onAudioRef.current      = onAudio;
    onTranscriptRef.current = onTranscript;
    onInterruptRef.current  = onInterrupt;
    onSpeechEndRef.current         = onSpeechEnd ?? null;
    onSpeechStartRef.current       = onSpeechStart ?? null;
    onTranscriptDeltaRef.current   = onTranscriptDelta ?? null;
    speechStartFiredRef.current    = false;

    const base   = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const wsBase = base
      ? base.replace(/^http/, "ws")
      : `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}`;
    const ws = new WebSocket(`${wsBase}/api/session/relay`);

    ws.onopen  = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onerror = (e) => console.error("[relay] ws error", e);

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if ((msg.type === "response.audio.delta" || msg.type === "response.output_audio.delta") && msg.delta) {
          if (!speechStartFiredRef.current) {
            speechStartFiredRef.current = true;
            onSpeechStartRef.current?.();
          }
          onAudioRef.current?.(msg.delta);
        }

        if (msg.type === "input_audio_buffer.speech_started")
          onInterruptRef.current?.();

        if ((msg.type === "response.audio_transcript.delta" || msg.type === "response.output_audio_transcript.delta") && msg.delta) {
          assistantBufRef.current += msg.delta;
          onTranscriptDeltaRef.current?.(msg.delta);
        }

        if (msg.type === "response.audio_transcript.done" || msg.type === "response.output_audio_transcript.done") {
          if (assistantBufRef.current.trim())
            onTranscriptRef.current?.("assistant", assistantBufRef.current.trim());
          assistantBufRef.current = "";
        }

        if (msg.type === "response.output_audio.done" || msg.type === "response.audio.done") {
          speechStartFiredRef.current = false;
          onSpeechEndRef.current?.();
        }

        if (msg.type === "conversation.item.input_audio_transcription.completed" && msg.transcript?.trim())
          onTranscriptRef.current?.("user", msg.transcript.trim());

      } catch {}
    };

    wsRef.current = ws;
  }, []);

  const sendAudio = useCallback((pcm16: Int16Array) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;
    audioSentRef.current = true;
    wsRef.current.send(JSON.stringify({
      type: "input_audio_buffer.append",
      audio: arrayBufferToBase64(pcm16.buffer as ArrayBuffer),
    }));
  }, []);

  const commitAudio = useCallback(() => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;
    if (!audioSentRef.current) return;  // don't commit empty buffer
    audioSentRef.current = false;
    wsRef.current.send(JSON.stringify({ type: "input_audio_buffer.commit" }));
    wsRef.current.send(JSON.stringify({ type: "response.create" }));
  }, []);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    setIsConnected(false);
  }, []);

  return { isConnected, connect, sendAudio, commitAudio, disconnect };
}
