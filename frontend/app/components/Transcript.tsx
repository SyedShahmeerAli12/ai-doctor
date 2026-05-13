"use client";
import { useEffect, useRef } from "react";

export interface TranscriptItem {
  ts: number;
  role: "user" | "assistant";
  text: string;
}

interface TranscriptProps {
  items: TranscriptItem[];
  isMicActive: boolean;
}

export default function Transcript({ items, isMicActive }: TranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live Transcript</span>
        {isMicActive && (
          <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Mic Active
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 pr-1">
        {items.length === 0 && (
          <p className="text-gray-400 text-sm text-center pt-8">Conversation will appear here…</p>
        )}
        {items.map((item) => (
          <div key={item.ts} className={`flex gap-2.5 animate-fade_in ${
            item.role === "user" ? "justify-end" : "justify-start"
          }`}>
            {item.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-gray-600 mt-0.5">S</div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              item.role === "user"
                ? "bg-jadwa-green text-white rounded-br-sm"
                : "bg-gray-100 text-gray-800 rounded-bl-sm"
            }`}>
              {item.text}
            </div>
            {item.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-jadwa-green flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white mt-0.5">U</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
