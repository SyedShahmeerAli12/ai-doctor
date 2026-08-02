"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [heroOk, setHeroOk] = useState(true);
  const heroRef = useRef<HTMLImageElement>(null);

  // A 404 in Next dev returns an HTML page, so the <img> can report
  // complete:true with no pixels — and the failure often lands before
  // hydration, so onError alone misses it. Check naturalWidth on mount.
  useEffect(() => {
    const img = heroRef.current;
    if (!img) return;
    const check = () => { if (img.complete && img.naturalWidth === 0) setHeroOk(false); };
    check();
    img.addEventListener("load", check);
    img.addEventListener("error", () => setHeroOk(false));
    return () => img.removeEventListener("load", check);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#f7f8fc]" style={{ minHeight: "100dvh" }}>
      <style>{`
        @media (max-width: 640px) {
          .splash-left { padding-left: 6vw !important; padding-right: 6vw !important; }
          .splash-hero-row { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .splash-divider { display: none !important; }
          .splash-subtitle { margin-left: 0 !important; margin-top: 20px !important; font-size: 15px !important; }
          .splash-start-btn { margin-left: 0 !important; width: 100% !important; max-width: 100% !important; font-size: 18px !important; padding-top: 18px !important; padding-bottom: 18px !important; }
          .splash-heading { font-size: clamp(36px, 11vw, 54px) !important; }
          .splash-sub-heading { font-size: clamp(16px, 5vw, 22px) !important; }
        }
      `}</style>
      {/* ══ Right-side circular artwork ═════════════════════════════ */}
      <div className="absolute inset-y-0 right-0 hidden md:block pointer-events-none select-none">
        {/* Outer pale ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: "128vh",
            height: "128vh",
            top: "50%",
            right: "-34vh",
            transform: "translateY(-50%)",
            background: "#e8e9f7",
          }}
        />
        {/* Mid navy ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: "118vh",
            height: "118vh",
            top: "50%",
            right: "-32vh",
            transform: "translateY(-50%)",
            background: "linear-gradient(150deg,#1e1b6b 0%,#2a2183 55%,#3b32a8 100%)",
          }}
        />
        {/* Inner deep disc that holds the face */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: "104vh",
            height: "104vh",
            top: "50%",
            right: "-30vh",
            transform: "translateY(-50%)",
            background: "radial-gradient(circle at 38% 42%, #322a96 0%, #241d78 45%, #17124f 100%)",
          }}
        >
          <img
            ref={heroRef}
            src="/hero.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: heroOk ? "block" : "none" }}
          />
          {!heroOk && <HeadArt />}
        </div>

        {/* Hexagon feature icons */}
        <div className="absolute" style={{ right: "13vh", top: "52%" }}>
          <div className="flex flex-col gap-[3.2vh]">
            <Hex><BrainGlyph /></Hex>
            <Hex><PeopleGlyph /></Hex>
            <Hex><HeartGlyph /></Hex>
          </div>
        </div>
      </div>

      {/* ══ Bottom-left wave lines ══════════════════════════════════ */}
      <svg
        viewBox="0 0 900 220"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-[70%] h-[26vh] pointer-events-none"
        fill="none"
      >
        {Array.from({ length: 22 }).map((_, i) => (
          <path
            key={i}
            d={`M -40 ${120 + i * 4.5} C 180 ${60 + i * 4.5}, 300 ${190 + i * 4.5}, 520 ${132 + i * 4.5} S 800 ${58 + i * 4.5}, 940 ${104 + i * 4.5}`}
            stroke="#4b45c9"
            strokeWidth="0.7"
            opacity={0.16 - i * 0.004}
          />
        ))}
      </svg>

      {/* ══ Left content ════════════════════════════════════════════ */}
      <div className="splash-left relative z-10 flex flex-col w-full md:w-[58%] lg:w-[52%] px-[6vw] md:px-[5vw] py-[5vh]" style={{ minHeight: "100dvh" }}>
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <div className="flex items-start">
            <span
              className="font-extrabold text-[#1c2170]"
              style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.11em" }}
            >
              AMAROX
            </span>
            <span
              className="rounded-full bg-[#f47521] self-start"
              style={{
                width: "clamp(7px,0.75vw,11px)",
                height: "clamp(7px,0.75vw,11px)",
                marginLeft: "clamp(-8px,-0.7vw,-5px)",
                marginTop: "clamp(2px,0.3vw,5px)",
              }}
            />
          </div>
          <span
            className="font-semibold text-[#1c2170]"
            style={{
              fontSize: "clamp(12px,1.35vw,18px)",
              letterSpacing: "0.52em",
              marginTop: "clamp(2px,0.4vw,6px)",
            }}
          >
            PHARMA
          </span>
        </div>

        {/* Hero block — vertically centered */}
        <div className="flex flex-col my-auto" style={{ paddingBottom: "6vh" }}>
          <div className="splash-hero-row flex items-center" style={{ gap: "clamp(16px,2vw,30px)" }}>
            <ProfileIcon />
            <div className="splash-divider w-px self-stretch bg-[#c9ccdd]" style={{ minHeight: "clamp(90px,11vw,150px)" }} />
            <div className="flex flex-col">
              <h1
                className="splash-heading font-extrabold text-[#1c2170] leading-[1.02]"
                style={{ fontSize: "clamp(30px,4.2vw,58px)", letterSpacing: "-0.01em" }}
              >
                AI DOCTOR
              </h1>
              <h1
                className="splash-heading font-extrabold text-[#f47521] leading-[1.02]"
                style={{ fontSize: "clamp(30px,4.2vw,58px)", letterSpacing: "-0.01em" }}
              >
                SIMULATION
              </h1>
              <p
                className="splash-sub-heading font-medium text-[#1c2170]"
                style={{
                  fontSize: "clamp(15px,1.9vw,26px)",
                  letterSpacing: "0.13em",
                  marginTop: "clamp(6px,0.9vw,14px)",
                }}
              >
                REP TRAINING
              </p>
              {/* two-tone accent rule */}
              <div className="flex" style={{ marginTop: "clamp(12px,1.6vw,22px)" }}>
                <div className="h-[3px] bg-[#1c2170]" style={{ width: "clamp(34px,3.4vw,50px)" }} />
                <div className="h-[3px] bg-[#f47521]" style={{ width: "clamp(14px,1.4vw,20px)" }} />
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div
            className="splash-subtitle text-[#6b7089]"
            style={{
              fontSize: "clamp(14px,1.35vw,19px)",
              lineHeight: 1.65,
              marginTop: "clamp(24px,3.6vw,48px)",
              marginLeft: "clamp(0px,10vw,140px)",
            }}
          >
            <p>Practice. Learn. Improve.</p>
            <p>Build confidence in every conversation.</p>
          </div>

          {/* START */}
          <button
            onClick={() => router.push("/")}
            className="splash-start-btn bg-[#1c2170] text-white font-bold transition-all hover:bg-[#262c8c] hover:shadow-xl hover:shadow-indigo-900/25 active:scale-[0.98]"
            style={{
              marginTop: "clamp(26px,3.6vw,50px)",
              marginLeft: "clamp(0px,10vw,140px)",
              width: "clamp(240px,26vw,382px)",
              paddingTop: "clamp(16px,1.75vw,26px)",
              paddingBottom: "clamp(16px,1.75vw,26px)",
              borderRadius: "clamp(10px,0.95vw,14px)",
              fontSize: "clamp(18px,1.9vw,27px)",
              letterSpacing: "0.06em",
            }}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Left profile-head + neural-net icon ─────────────────────────── */
function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "clamp(64px,8.4vw,118px)", height: "clamp(64px,8.4vw,118px)" }}
      className="flex-shrink-0"
    >
      {/* orange arc over crown */}
      <path d="M 30 26 A 40 40 0 0 1 92 40" stroke="#f47521" strokeWidth="3.4" strokeLinecap="round" />
      {/* navy outer arc */}
      <path d="M 22 78 A 42 42 0 0 1 30 24" stroke="#1c2170" strokeWidth="3.4" strokeLinecap="round" />
      {/* head profile facing right */}
      <path
        d="M 44 104 L 44 88 C 30 84 24 70 28 56 C 32 40 46 30 62 32 C 76 34 86 46 84 58 L 92 72 L 82 75 L 84 86 C 84 91 80 93 74 92 L 74 104"
        stroke="#1c2170"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* neural nodes */}
      {[[44, 52], [58, 46], [70, 54], [48, 66], [62, 62], [74, 68], [56, 76]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill="#1c2170" />
      ))}
      {/* neural links */}
      {[
        [44, 52, 58, 46], [58, 46, 70, 54], [44, 52, 48, 66],
        [58, 46, 62, 62], [70, 54, 74, 68], [48, 66, 62, 62],
        [62, 62, 74, 68], [48, 66, 56, 76], [56, 76, 62, 62],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1c2170" strokeWidth="1.6" />
      ))}
    </svg>
  );
}

/* ── AI head artwork ─────────────────────────────────────────────── */
const HEAD_PATH =
  "M 250 640 L 250 505 C 205 486 150 430 138 348 C 124 254 168 158 250 118 " +
  "C 330 79 424 106 462 172 C 492 224 486 268 474 300 L 468 318 L 462 330 " +
  "L 512 402 L 466 416 L 470 434 L 484 448 L 466 462 C 474 490 458 512 420 520 " +
  "L 366 548 L 366 640 Z";

// Neural mesh over the cranium
const NODES: [number, number][] = [
  [252, 150], [316, 132], [382, 152], [428, 200], [440, 262],
  [196, 196], [166, 262], [180, 330], [232, 372], [300, 196],
  [258, 246], [330, 240], [392, 284], [292, 312], [356, 340],
  [222, 292], [412, 348],
];
const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 1], [9, 10], [10, 5], [9, 11], [11, 2], [11, 12], [12, 4],
  [10, 13], [13, 11], [13, 14], [14, 12], [15, 10], [15, 6], [15, 13],
  [8, 15], [14, 16], [16, 12], [8, 13],
];

function HeadArt() {
  return (
    <svg
      viewBox="0 0 660 760"
      fill="none"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hg" x1="18%" y1="8%" x2="86%" y2="96%">
          <stop offset="0%" stopColor="#8b93ff" stopOpacity="0.95" />
          <stop offset="42%" stopColor="#5a51d8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1a1560" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="46%">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#6366f1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rim" cx="34%" cy="26%">
          <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#c7d2fe" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <clipPath id="headClip">
          <path d={HEAD_PATH} />
        </clipPath>
      </defs>

      {/* ambient glow */}
      <ellipse cx="325" cy="350" rx="300" ry="330" fill="url(#glow)" />

      {/* soft halo behind the silhouette */}
      <path d={HEAD_PATH} fill="#4f46e5" opacity="0.32" filter="url(#soft)" />

      {/* main silhouette */}
      <path d={HEAD_PATH} fill="url(#hg)" />
      <path d={HEAD_PATH} fill="url(#rim)" />
      <path d={HEAD_PATH} stroke="#c7d2fe" strokeWidth="1.6" opacity="0.55" fill="none" />

      {/* mesh + features clipped inside the head */}
      <g clipPath="url(#headClip)">
        {LINKS.map(([a, b], i) => (
          <line
            key={`l${i}`}
            x1={NODES[a][0]} y1={NODES[a][1]}
            x2={NODES[b][0]} y2={NODES[b][1]}
            stroke="#dbeafe" strokeWidth="1.1" opacity="0.45"
          />
        ))}
        {NODES.map(([x, y], i) => (
          <g key={`n${i}`}>
            <circle cx={x} cy={y} r="7" fill="#e0e7ff" opacity="0.18" />
            <circle cx={x} cy={y} r="3.1" fill="#f1f5ff" opacity="0.95" />
          </g>
        ))}

        {/* brow + eye */}
        <path d="M 372 372 Q 404 360 436 370" stroke="#e0e7ff" strokeWidth="3.4" opacity="0.5" strokeLinecap="round" />
        <path d="M 376 400 Q 406 386 438 398 Q 408 418 376 400 Z" fill="#dbeafe" opacity="0.85" />
        <circle cx="407" cy="400" r="6.4" fill="#1e1b4b" opacity="0.65" />
        <circle cx="409" cy="397" r="2.2" fill="#ffffff" opacity="0.9" />

        {/* cheek / jaw contour */}
        <path d="M 300 430 Q 342 496 414 512" stroke="#a5b4fc" strokeWidth="2" opacity="0.3" fill="none" />
        {/* lips */}
        <path d="M 430 436 Q 452 428 470 436 Q 452 452 430 436 Z" fill="#dbeafe" opacity="0.45" />
      </g>

      {/* floating particles */}
      {[
        [92, 236, 3.2], [572, 292, 2.6], [120, 470, 2.2], [560, 470, 3.4],
        [212, 76, 2.4], [452, 62, 2.8], [604, 386, 2], [72, 356, 2.4],
        [520, 620, 2.6], [156, 610, 2.2],
      ].map(([x, y, r], i) => (
        <circle key={`p${i}`} cx={x} cy={y} r={r} fill="#e0e7ff" opacity="0.55" />
      ))}
    </svg>
  );
}

/* ── Hexagon chrome ──────────────────────────────────────────────── */
function Hex({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "clamp(46px,5.4vh,74px)",
        height: "clamp(52px,6.1vh,84px)",
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        background: "rgba(129,140,248,0.16)",
        boxShadow: "inset 0 0 0 1.2px rgba(165,180,252,0.45)",
      }}
    >
      {children}
    </div>
  );
}

const glyph = { width: "48%", height: "48%", stroke: "#dbeafe", strokeWidth: 1.6, fill: "none" as const };

function BrainGlyph() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: glyph.width, height: glyph.height }} fill="none">
      <path d="M12 4v16M12 6a3 3 0 0 0-3-3 2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 8a2.5 2.5 0 0 0 .8 4.4A2.5 2.5 0 0 0 6 17a3 3 0 0 0 3 3 3 3 0 0 0 3-3M12 6a3 3 0 0 1 3-3 2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 19 8a2.5 2.5 0 0 1-.8 4.4A2.5 2.5 0 0 1 18 17a3 3 0 0 1-3 3 3 3 0 0 1-3-3"
        stroke={glyph.stroke} strokeWidth={glyph.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleGlyph() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: glyph.width, height: glyph.height }} fill="none">
      <circle cx="12" cy="8" r="3" stroke={glyph.stroke} strokeWidth={glyph.strokeWidth} />
      <circle cx="5" cy="10" r="2.2" stroke={glyph.stroke} strokeWidth={glyph.strokeWidth} />
      <circle cx="19" cy="10" r="2.2" stroke={glyph.stroke} strokeWidth={glyph.strokeWidth} />
      <path d="M7 19a5 5 0 0 1 10 0M1.5 18a4 4 0 0 1 3.5-3.9M22.5 18a4 4 0 0 0-3.5-3.9"
        stroke={glyph.stroke} strokeWidth={glyph.strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

function HeartGlyph() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: glyph.width, height: glyph.height }} fill="none">
      <path d="M12 20.5S3.5 14.6 3.5 8.9A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.5 2.3c0 5.7-8.5 11.6-8.5 11.6Z"
        stroke={glyph.stroke} strokeWidth={glyph.strokeWidth} strokeLinejoin="round" />
      <path d="M12 6.6V20" stroke={glyph.stroke} strokeWidth={glyph.strokeWidth} opacity="0.5" />
    </svg>
  );
}
