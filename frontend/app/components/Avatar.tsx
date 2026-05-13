"use client";

interface AvatarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isSpeaking: boolean;
  isConnected: boolean;
  isConnecting: boolean;
}

export default function Avatar({ videoRef, isSpeaking, isConnected, isConnecting }: AvatarProps) {
  return (
    <div className="flex flex-col h-full bg-gray-950">
      <div className="relative flex-1 flex items-center justify-center bg-gray-950 overflow-hidden">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

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
      </div>

      <div className="px-5 py-4 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
            !isConnected ? "bg-gray-500" : isSpeaking ? "bg-green-400 animate-pulse" : "bg-green-500"
          }`} />
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Sara</p>
            <p className="text-gray-400 text-xs">Jadwa Account Assistant</p>
          </div>
          <div className="ml-auto">
            {isConnected && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                {isSpeaking ? "Speaking…" : "Listening"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
