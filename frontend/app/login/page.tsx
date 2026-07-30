"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const res = await fetch(`${base}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }
      const { token } = await res.json();
      sessionStorage.setItem("jadwa_token", token);
      window.location.href = "/splash.html";
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #eef0ff 100%)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-1 mb-1">
            <span
              className="text-3xl font-black tracking-wider"
              style={{ color: "#1a237e", letterSpacing: "0.12em" }}
            >
              AMAROX
            </span>
            <span className="text-3xl font-black" style={{ color: "#ff6600" }}>×</span>
          </div>
          <span
            className="text-xs font-semibold tracking-[0.35em]"
            style={{ color: "#1a237e" }}
          >
            PHARMA
          </span>
          <p className="text-sm text-gray-400 mt-3 tracking-wide">AI Doctor Simulation · Rep Training</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-100/50 p-8">
          <h2 className="text-base font-semibold mb-6" style={{ color: "#1a237e" }}>
            Sign in to continue
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter username"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": "#1a237e" } as React.CSSProperties}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #1a237e")}
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #1a237e")}
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-widest
                transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-1"
              style={{ background: "#1a237e" }}
            >
              {loading ? "Signing in…" : "SIGN IN"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Amarox Pharma · Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
