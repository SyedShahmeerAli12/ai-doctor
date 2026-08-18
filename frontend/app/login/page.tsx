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
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #e8edf3 100%)",
        padding: "clamp(16px, 4vw, 48px)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "clamp(320px, 50vw, 520px)" }}>

        {/* Logo */}
        <div className="flex flex-col items-center" style={{ marginBottom: "clamp(24px, 4vh, 48px)" }}>
          <img
            src="/gsk-new-logo.png"
            alt="GSK"
            style={{ height: "clamp(72px, 10vw, 110px)", objectFit: "contain", marginBottom: "clamp(10px, 1.5vh, 18px)" }}
          />
          <p style={{ fontSize: "clamp(12px, 1.2vw, 16px)", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#102643", margin: 0 }}>
            AI Doctor Simulation
          </p>
          <p style={{ fontSize: "clamp(11px, 1vw, 14px)", color: "#9ca3af", marginTop: 6, letterSpacing: "0.05em" }}>
            Rep Training Platform
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "clamp(12px, 2vw, 20px)",
            padding: "clamp(24px, 4vw, 48px)",
            border: "1px solid rgba(16,38,67,0.12)",
            boxShadow: "0 20px 60px rgba(16,38,67,0.10)",
          }}
        >
          <h2 style={{ fontSize: "clamp(16px, 1.5vw, 22px)", fontWeight: 600, color: "#102643", marginBottom: "clamp(20px, 3vh, 32px)", marginTop: 0 }}>
            Sign in to continue
          </h2>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vh, 20px)" }}>
            <div>
              <label style={{ display: "block", fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 500, color: "#6b7280", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter username"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "clamp(10px, 1.5vh, 16px) clamp(12px, 1.5vw, 18px)",
                  borderRadius: 10, border: "1px solid #e5e7eb",
                  background: "#f9fafb", fontSize: "clamp(13px, 1.2vw, 16px)",
                  color: "#111827", outline: "none", transition: "box-shadow 0.2s",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #f04c05")}
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 500, color: "#6b7280", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "clamp(10px, 1.5vh, 16px) clamp(12px, 1.5vw, 18px)",
                  borderRadius: 10, border: "1px solid #e5e7eb",
                  background: "#f9fafb", fontSize: "clamp(13px, 1.2vw, 16px)",
                  color: "#111827", outline: "none", transition: "box-shadow 0.2s",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #f04c05")}
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>

            {error && (
              <p style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", margin: 0 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "clamp(12px, 2vh, 18px)",
                borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #f04c05 0%, #ff7d3c 100%)",
                color: "#fff", fontSize: "clamp(13px, 1.2vw, 16px)",
                fontWeight: 700, letterSpacing: "0.15em", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1, transition: "opacity 0.2s, box-shadow 0.2s",
                marginTop: 4,
              }}
            >
              {loading ? "Signing in…" : "SIGN IN"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "clamp(11px, 1vw, 13px)", color: "#9ca3af", marginTop: "clamp(16px, 2vh, 24px)" }}>
          GSK · Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
