"use client";

interface AvatarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isSpeaking: boolean;
  isConnected: boolean;
  isConnecting: boolean;
}

export default function Avatar({ videoRef, isSpeaking, isConnected, isConnecting }: AvatarProps) {
  return (
    <div className="w-full h-full bg-gray-950 flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ height: "100%", width: "auto", maxWidth: "100%" }}
      />

      {!isConnected && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950">
          <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          {isConnecting && (
            <p className="text-gray-400 text-sm animate-pulse">Connecting to Sara…</p>
          )}
        </div>
      )}

      {isConnected && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isSpeaking ? "bg-green-400 animate-pulse" : "bg-green-500"}`} />
          <span className="text-white text-xs font-medium">{isSpeaking ? "Speaking…" : "Listening"}</span>
        </div>
      )}
    </div>
  );
}
