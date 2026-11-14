"use client";

import React from "react";
import { Product } from "@/lib/catalog";

interface GameCoverArtProps {
  product: Product;
  className?: string;
}

export default function GameCoverArt({ product, className = "" }: GameCoverArtProps) {
  const slug = product.slug;

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col justify-between ${className}`}>
      {/* 1. Header Bar: Arcade Cartridge Brand */}
      <div className="relative z-10 flex items-center justify-between px-2.5 pt-2 pb-1 bg-black/40 backdrop-blur-xs border-b border-white/15">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[8px] font-black tracking-widest uppercase text-white/90 font-mono">
            ZEEBEE · ARCADE
          </span>
        </div>
        <span className="text-[7px] font-bold font-mono px-1.5 py-0.2 rounded bg-amber-400 text-neutral-950 uppercase tracking-tight">
          {product.category === "bluetooth-pvp"
            ? "BT 2P"
            : product.category === "coop-arcade"
            ? "CO-OP"
            : "BOARD"}
        </span>
      </div>

      {/* 2. Visual Artwork Window: Specific Custom SVG Graphics for Each Game */}
      <div className="relative z-1 flex-1 flex items-center justify-center p-2 overflow-hidden">
        {renderIllustration(slug)}
      </div>

      {/* 3. Bottom Title Plate & Quality Seal */}
      <div className="relative z-10 px-2.5 pb-2.5 pt-1.5 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex flex-col gap-1">
        {/* Title */}
        <h3 className="text-xs sm:text-[13px] font-black leading-tight text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-2">
          {product.name.replace(/\([^)]*\)/g, "").trim()}
        </h3>

        {/* Footer Badges */}
        <div className="flex items-center justify-between pt-0.5 border-t border-white/15 text-[8px] font-mono">
          <span className="text-amber-300 font-bold uppercase tracking-wider">
            {product.devicePrefix || "APK"}
          </span>
          <span className="text-white/70 tracking-tight">
            &lt; 25KB · OFFLINE
          </span>
        </div>
      </div>

      {/* 4. Realistic Gloss & Holographic Sheen Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 35%, transparent 50%, rgba(255,255,255,0.15) 80%, transparent 100%)",
        }}
      />

      {/* 5. Left Spine Crease Shadow for 3D Game Box Look */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-20" />
      <div className="absolute left-2.5 top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-20" />
    </div>
  );
}

function renderIllustration(slug: string) {
  switch (slug) {
    // ──────── 1. CỜ CA RÔ BLUETOOTH (NEON DUO) ────────
    case "game-tic-tac-toe-pro":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">
          <defs>
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="neonPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <filter id="glowGrid" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Grid lines */}
          <path d="M55,15 L55,125 M105,15 L105,125 M15,50 L145,50 M15,90 L145,90" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <path d="M55,25 L55,115 M105,25 L105,115 M25,50 L135,50 M25,90 L135,90" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          
          {/* Neon X (Left) */}
          <g filter="url(#glowGrid)" transform="translate(20, 20)">
            <line x1="5" y1="5" x2="25" y2="25" stroke="url(#neonCyan)" strokeWidth="5" strokeLinecap="round" />
            <line x1="25" y1="5" x2="5" y2="25" stroke="url(#neonCyan)" strokeWidth="5" strokeLinecap="round" />
          </g>
          {/* Neon O (Center) */}
          <g filter="url(#glowGrid)" transform="translate(65, 55)">
            <circle cx="15" cy="15" r="13" stroke="url(#neonPink)" strokeWidth="5" fill="none" />
          </g>
          {/* Neon X (Bottom Right) */}
          <g filter="url(#glowGrid)" transform="translate(112, 95)">
            <line x1="5" y1="5" x2="22" y2="22" stroke="url(#neonCyan)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="22" y1="5" x2="5" y2="22" stroke="url(#neonCyan)" strokeWidth="4.5" strokeLinecap="round" />
          </g>
          {/* Bluetooth Energy Sparks */}
          <circle cx="80" cy="70" r="38" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" fill="none" />
          <path d="M80,25 L84,33 L76,37 L84,41 L80,49" stroke="#38bdf8" strokeWidth="2" fill="none" />
        </svg>
      );

    // ──────── 2. ĐẤU TÀU CHIẾN RADAR ────────
    case "game-battleship-duel":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Radar Circles */}
          <circle cx="80" cy="70" r="55" fill="url(#radarGlow)" stroke="#059669" strokeWidth="1.5" />
          <circle cx="80" cy="70" r="38" fill="none" stroke="#047857" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="80" cy="70" r="20" fill="none" stroke="#047857" strokeWidth="1" />
          <line x1="80" y1="15" x2="80" y2="125" stroke="#047857" strokeWidth="1" />
          <line x1="25" y1="70" x2="135" y2="70" stroke="#047857" strokeWidth="1" />
          
          {/* Radar Sweep Cone */}
          <path d="M80,70 L125,40 A55,55 0 0,0 80,15 Z" fill="#34d399" opacity="0.25" />

          {/* Battleship Silhouette */}
          <path
            d="M35,90 L60,86 L110,86 L128,90 L115,100 L45,100 Z"
            fill="#064e3b"
            stroke="#34d399"
            strokeWidth="2"
          />
          {/* Turret guns */}
          <rect x="65" y="78" width="16" height="8" rx="2" fill="#10b981" />
          <line x1="81" y1="81" x2="100" y2="78" stroke="#34d399" strokeWidth="2.5" />
          <rect x="90" y="80" width="12" height="6" rx="1.5" fill="#10b981" />
          <line x1="102" y1="82" x2="116" y2="80" stroke="#34d399" strokeWidth="2" />

          {/* Target Reticle Lock */}
          <circle cx="105" cy="45" r="9" stroke="#ef4444" strokeWidth="1.5" fill="none" />
          <line x1="105" y1="32" x2="105" y2="58" stroke="#ef4444" strokeWidth="1" />
          <line x1="92" y1="45" x2="118" y2="45" stroke="#ef4444" strokeWidth="1" />
          <circle cx="105" cy="45" r="2" fill="#ef4444" />
        </svg>
      );

    // ──────── 3. OẲN TÙ TÌ XÚC XẮC ────────
    case "game-rock-paper-scissors":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
          <defs>
            <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Energy shockwave rings */}
          <circle cx="80" cy="70" r="48" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
          
          {/* 3D Dice (Left) */}
          <g transform="translate(30, 45) rotate(-15)">
            <rect x="0" y="0" width="36" height="36" rx="6" fill="url(#diceGrad)" stroke="#fff" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="3" fill="#1e293b" />
            <circle cx="26" cy="10" r="3" fill="#1e293b" />
            <circle cx="18" cy="18" r="3" fill="#dc2626" />
            <circle cx="10" cy="26" r="3" fill="#1e293b" />
            <circle cx="26" cy="26" r="3" fill="#1e293b" />
          </g>

          {/* Clash Lightning & Sparks */}
          <path d="M78,35 L86,60 L74,68 L88,95 L80,98" stroke="#fef08a" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Golden Fist / Scissors Crest (Right) */}
          <g transform="translate(90, 42) rotate(12)">
            <circle cx="22" cy="22" r="22" fill="#ea580c" stroke="#fde047" strokeWidth="2" />
            {/* Scissors Blades */}
            <path d="M12,12 L30,30 M12,30 L30,12" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2.5" />
            <circle cx="12" cy="30" r="4" fill="none" stroke="#fff" strokeWidth="2.5" />
          </g>
        </svg>
      );

    // ──────── 4. ĐẤU TRÍ ĐỐ VUI 2 NGƯỜI ────────
    case "game-quiz-duel":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
          <defs>
            <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
          </defs>
          {/* Synapse Network Background */}
          <path d="M30,40 L60,30 L90,50 L130,35 M40,90 L75,100 L110,85 L135,105" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          
          {/* Stylized Cyber Brain */}
          <path
            d="M50,70 C40,50 55,25 75,32 C85,20 105,25 108,40 C125,45 125,75 110,85 C115,105 95,115 80,105 C65,115 48,100 52,85 Z"
            fill="url(#brainGrad)"
            stroke="#e9d5ff"
            strokeWidth="2"
          />
          {/* Inner convolutions */}
          <path d="M65,55 Q80,45 80,68 T95,78 M68,82 Q80,88 92,80" stroke="#f3e8ff" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Central Glowing VS Badge */}
          <g transform="translate(62, 52)">
            <circle cx="18" cy="18" r="16" fill="#facc15" stroke="#78350f" strokeWidth="2" />
            <text x="18" y="23" textAnchor="middle" fill="#000" fontWeight="900" fontSize="13" fontFamily="sans-serif">VS</text>
          </g>
        </svg>
      );

    // ──────── 5. PARTY PACK 4-IN-1 BLUETOOTH ────────
    case "game-bluetooth-party-pack":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(236,72,153,0.5)]">
          {/* 4 Quadrants Box */}
          <rect x="25" y="20" width="50" height="45" rx="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="85" y="20" width="50" height="45" rx="8" fill="#e11d48" stroke="#fda4af" strokeWidth="1.5" />
          <rect x="25" y="75" width="50" height="45" rx="8" fill="#16a34a" stroke="#86efac" strokeWidth="1.5" />
          <rect x="85" y="75" width="50" height="45" rx="8" fill="#d97706" stroke="#fde047" strokeWidth="1.5" />

          {/* Mini Icons inside quadrants */}
          {/* Top-left: Gamepad */}
          <path d="M40,43 L60,43 M50,33 L50,53" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          {/* Top-right: Heart */}
          <path d="M102,40 C102,35 106,32 110,32 C115,32 118,37 118,40 C118,46 110,53 110,53 C110,53 102,46 102,40 Z" fill="#fff" />
          {/* Bottom-left: Star */}
          <polygon points="50,83 53,92 62,92 55,97 58,106 50,101 42,106 45,97 38,92 47,92" fill="#fff" />
          {/* Bottom-right: Crown */}
          <path d="M96,104 L100,92 L110,99 L120,92 L124,104 Z" fill="#fff" />

          {/* Center Party Emblem */}
          <circle cx="80" cy="70" r="16" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
          <text x="80" y="75" textAnchor="middle" fill="#000" fontWeight="900" fontSize="11" fontFamily="sans-serif">4-IN-1</text>
        </svg>
      );

    // ──────── 6. PONG SIÊU TỐC BLUETOOTH ────────
    case "game-pong-bluetooth":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]">
          {/* Synthwave Horizon Grid */}
          <defs>
            <linearGradient id="synthSun" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <path d="M15,85 L145,85 M25,97 L135,97 M38,110 L122,110 M15,85 L45,120 M145,85 L115,120 M80,85 L80,120" stroke="#6366f1" strokeWidth="1" opacity="0.4" />
          
          {/* Glowing Sun */}
          <circle cx="80" cy="60" r="32" fill="url(#synthSun)" opacity="0.8" />
          {/* Sun Horizontal Cuts */}
          <line x1="50" y1="55" x2="110" y2="55" stroke="#0f172a" strokeWidth="2" />
          <line x1="53" y1="63" x2="107" y2="63" stroke="#0f172a" strokeWidth="3" />
          <line x1="58" y1="72" x2="102" y2="72" stroke="#0f172a" strokeWidth="4" />

          {/* Left Paddle (Cyan) */}
          <rect x="24" y="35" width="8" height="42" rx="4" fill="#06b6d4" stroke="#e0f2fe" strokeWidth="1.5" />
          {/* Right Paddle (Pink) */}
          <rect x="128" y="55" width="8" height="42" rx="4" fill="#ec4899" stroke="#fce7f3" strokeWidth="1.5" />

          {/* Laser Ball with Trail */}
          <path d="M40,52 Q70,58 115,72" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4 3" fill="none" opacity="0.7" />
          <circle cx="115" cy="72" r="6" fill="#fff" stroke="#facc15" strokeWidth="2" />
        </svg>
      );

    // ──────── 7. VƯỢT MÊ CUNG CO-OP ────────
    case "game-coop-escape":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]">
          {/* Maze Paths */}
          <path
            d="M25,25 L135,25 L135,115 L25,115 Z M45,45 L115,45 L115,95 L45,95 Z M65,45 L65,75 L95,75"
            stroke="#16a34a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M85,25 L85,45 M115,70 L135,70 M45,70 L25,70 M85,95 L85,115" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />

          {/* Player 1 (Blue Orb) */}
          <circle cx="55" cy="35" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
          {/* Player 2 (Green Orb) */}
          <circle cx="105" cy="105" r="7" fill="#4ade80" stroke="#fff" strokeWidth="1.5" />

          {/* Cooperative Energy Tether */}
          <path d="M55,35 Q80,70 105,105" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          {/* Exit Portal Sparkle in center */}
          <circle cx="80" cy="60" r="10" fill="#facc15" opacity="0.4" />
          <polygon points="80,52 82,58 88,60 82,62 80,68 78,62 72,60 78,58" fill="#fff" />
        </svg>
      );

    // ──────── 8. THỦ THÀNH DUO CO-OP ────────
    case "game-tower-defense-duo":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(217,70,239,0.5)]">
          {/* Castle Ramparts */}
          <path
            d="M30,115 L30,65 L45,65 L45,75 L60,75 L60,65 L75,65 L75,115 Z M85,115 L85,65 L100,65 L100,75 L115,75 L115,65 L130,65 L130,115 Z"
            fill="#4a044e"
            stroke="#c026d3"
            strokeWidth="2"
          />
          {/* Left Turret Crystal */}
          <polygon points="52,40 60,55 52,65 44,55" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
          {/* Right Turret Crystal */}
          <polygon points="108,40 116,55 108,65 100,55" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />

          {/* Twin Laser Beams crossing in sky */}
          <line x1="52" y1="40" x2="80" y2="20" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="40" x2="80" y2="20" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          {/* Blast Target at apex */}
          <circle cx="80" cy="20" r="12" fill="#facc15" opacity="0.6" />
          <polygon points="80,10 83,18 91,20 83,22 80,30 77,22 69,20 77,18" fill="#fff" />

          {/* Forcefield Shield Arc */}
          <path d="M20,115 Q80,75 140,115" stroke="#e879f9" strokeWidth="2" fill="none" strokeDasharray="4 4" />
        </svg>
      );

    // ──────── 9. ĐẶT BOM BOMBER GRID ────────
    case "game-bomber-grid":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(234,88,12,0.6)]">
          {/* Crossfire Explosion Waves */}
          <rect x="70" y="15" width="20" height="110" rx="6" fill="#f97316" opacity="0.4" />
          <rect x="20" y="60" width="120" height="20" rx="6" fill="#f97316" opacity="0.4" />
          
          {/* Giant Classic Bomb */}
          <circle cx="75" cy="75" r="32" fill="#18181b" stroke="#3f3f46" strokeWidth="2.5" />
          {/* Bomb Highlight */}
          <ellipse cx="65" cy="62" rx="9" ry="5" fill="#71717a" opacity="0.6" transform="rotate(-30 65 62)" />
          {/* Bomb Neck */}
          <rect x="88" y="44" width="12" height="8" rx="2" fill="#71717a" transform="rotate(35 88 44)" />
          {/* Curved Fuse */}
          <path d="M96,44 Q110,32 118,36" stroke="#fbbf24" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Fuse Spark */}
          <g transform="translate(118, 36)">
            <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#ef4444" />
            <polygon points="0,-5 1,-1 5,0 1,1 0,5 -1,1 -5,0 -1,-1" fill="#fef08a" />
          </g>

          {/* 8-bit Brick obstacle blocks */}
          <rect x="25" y="25" width="22" height="22" rx="3" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
          <rect x="115" y="95" width="22" height="22" rx="3" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
        </svg>
      );

    // ──────── 10. BẮN THIÊN THẠCH CO-OP ────────
    case "game-asteroid-coop":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(2,132,199,0.6)]">
          {/* Starfield dots */}
          <circle cx="30" cy="30" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="130" cy="25" r="1" fill="#fff" opacity="0.6" />
          <circle cx="140" cy="85" r="2" fill="#38bdf8" opacity="0.7" />
          <circle cx="25" cy="105" r="1.5" fill="#fff" opacity="0.5" />

          {/* Giant Asteroid */}
          <polygon
            points="100,25 125,32 135,55 120,75 95,80 85,55 90,35"
            fill="#334155"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <circle cx="110" cy="45" r="5" fill="#1e293b" />
          <circle cx="105" cy="65" r="4" fill="#1e293b" />

          {/* Retro Vector Starfighter */}
          <g transform="translate(45, 75) rotate(-25)">
            {/* Plasma Thruster */}
            <polygon points="10,32 15,48 20,32" fill="#38bdf8" opacity="0.8" />
            <polygon points="12,32 15,42 18,32" fill="#fff" />
            {/* Ship Body */}
            <polygon points="15,5 30,32 15,26 0,32" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
            {/* Cockpit */}
            <polygon points="15,10 20,22 15,20 10,22" fill="#e0f2fe" />
          </g>

          {/* Dual Laser Blasts */}
          <line x1="62" y1="62" x2="95" y2="45" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="75" x2="105" y2="58" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // ──────── 11. CỜ CÁ NGỰA 4 NGƯỜI ────────
    case "game-ludo-lite":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]">
          {/* 4-Color Arena Quadrants */}
          <circle cx="80" cy="70" r="50" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
          <path d="M80,70 L80,20 A50,50 0 0,1 130,70 Z" fill="#dc2626" opacity="0.7" />
          <path d="M80,70 L130,70 A50,50 0 0,1 80,120 Z" fill="#eab308" opacity="0.7" />
          <path d="M80,70 L80,120 A50,50 0 0,1 30,70 Z" fill="#16a34a" opacity="0.7" />
          <path d="M80,70 L30,70 A50,50 0 0,1 80,20 Z" fill="#2563eb" opacity="0.7" />

          {/* Central Stylized 3D Horse Head (Knight) */}
          <g transform="translate(62, 38)">
            <path
              d="M12,55 L26,55 L26,45 C28,42 34,36 34,26 C34,18 28,12 25,6 C22,12 18,15 15,15 C10,15 5,20 6,28 C6,32 10,34 12,36 Z"
              fill="#fef08a"
              stroke="#78350f"
              strokeWidth="2.5"
            />
            <circle cx="21" cy="18" r="2.5" fill="#78350f" />
          </g>

          {/* Lucky Dice Overlay */}
          <g transform="translate(100, 75) rotate(15)">
            <rect x="0" y="0" width="26" height="26" rx="5" fill="#fff" stroke="#991b1b" strokeWidth="1.5" />
            <circle cx="7" cy="7" r="2.5" fill="#dc2626" />
            <circle cx="19" cy="7" r="2.5" fill="#dc2626" />
            <circle cx="13" cy="13" r="3" fill="#dc2626" />
            <circle cx="7" cy="19" r="2.5" fill="#dc2626" />
            <circle cx="19" cy="19" r="2.5" fill="#dc2626" />
          </g>
        </svg>
      );

    // ──────── 12. XẾP HÌNH GỖ KHỐI ────────
    case "game-block-puzzle":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(217,119,6,0.6)]">
          <defs>
            <linearGradient id="woodAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="woodTeak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Grid Slot Outline */}
          <rect x="25" y="20" width="110" height="100" rx="8" fill="#291e10" stroke="#78350f" strokeWidth="2" />
          {/* Subtle grid lines */}
          <line x1="52" y1="20" x2="52" y2="120" stroke="#451a03" strokeWidth="1" />
          <line x1="80" y1="20" x2="80" y2="120" stroke="#451a03" strokeWidth="1" />
          <line x1="108" y1="20" x2="108" y2="120" stroke="#451a03" strokeWidth="1" />
          <line x1="25" y1="45" x2="135" y2="45" stroke="#451a03" strokeWidth="1" />
          <line x1="25" y1="70" x2="135" y2="70" stroke="#451a03" strokeWidth="1" />
          <line x1="25" y1="95" x2="135" y2="95" stroke="#451a03" strokeWidth="1" />

          {/* 3D Wood Tetromino 1: T-Shape */}
          <g transform="translate(52, 45)">
            <rect x="0" y="0" width="26" height="24" rx="3" fill="url(#woodAmber)" stroke="#fef3c7" strokeWidth="1" />
            <rect x="27" y="0" width="26" height="24" rx="3" fill="url(#woodAmber)" stroke="#fef3c7" strokeWidth="1" />
            <rect x="54" y="0" width="26" height="24" rx="3" fill="url(#woodAmber)" stroke="#fef3c7" strokeWidth="1" />
            <rect x="27" y="25" width="26" height="24" rx="3" fill="url(#woodAmber)" stroke="#fef3c7" strokeWidth="1" />
          </g>

          {/* 3D Wood Block 2: Square Glowing Fitting */}
          <g transform="translate(26, 70)">
            <rect x="0" y="0" width="25" height="24" rx="3" fill="url(#woodTeak)" stroke="#fef3c7" strokeWidth="1" />
            <rect x="0" y="25" width="25" height="24" rx="3" fill="url(#woodTeak)" stroke="#fef3c7" strokeWidth="1" />
          </g>

          {/* Glowing snap sparkles */}
          <circle cx="80" cy="45" r="4" fill="#fde047" />
          <circle cx="108" cy="70" r="3" fill="#fde047" />
        </svg>
      );

    // ──────── 13. NỐI THÚ ONET CỔ ĐIỂN ────────
    case "game-animal-connect":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
          {/* Card 1: Panda (Left) */}
          <g transform="translate(25, 40)">
            <rect x="0" y="0" width="45" height="52" rx="8" fill="#f8fafc" stroke="#34d399" strokeWidth="2" />
            {/* Panda Ears */}
            <circle cx="10" cy="12" r="6" fill="#1e293b" />
            <circle cx="35" cy="12" r="6" fill="#1e293b" />
            {/* Panda Face */}
            <circle cx="22" cy="28" r="16" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
            <ellipse cx="16" cy="26" rx="4" ry="5" fill="#1e293b" transform="rotate(-15 16 26)" />
            <ellipse cx="28" cy="26" rx="4" ry="5" fill="#1e293b" transform="rotate(15 28 26)" />
            <circle cx="17" cy="25" r="1.5" fill="#fff" />
            <circle cx="27" cy="25" r="1.5" fill="#fff" />
            <ellipse cx="22" cy="33" rx="3" ry="2" fill="#1e293b" />
          </g>

          {/* Card 2: Panda (Right) */}
          <g transform="translate(90, 40)">
            <rect x="0" y="0" width="45" height="52" rx="8" fill="#f8fafc" stroke="#34d399" strokeWidth="2" />
            {/* Panda Ears */}
            <circle cx="10" cy="12" r="6" fill="#1e293b" />
            <circle cx="35" cy="12" r="6" fill="#1e293b" />
            {/* Panda Face */}
            <circle cx="22" cy="28" r="16" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
            <ellipse cx="16" cy="26" rx="4" ry="5" fill="#1e293b" transform="rotate(-15 16 26)" />
            <ellipse cx="28" cy="26" rx="4" ry="5" fill="#1e293b" transform="rotate(15 28 26)" />
            <circle cx="17" cy="25" r="1.5" fill="#fff" />
            <circle cx="27" cy="25" r="1.5" fill="#fff" />
            <ellipse cx="22" cy="33" rx="3" ry="2" fill="#1e293b" />
          </g>

          {/* Iconic Onet 3-Line Connection Ray */}
          <path
            d="M48,40 L48,22 L112,22 L112,40"
            stroke="#fbbf24"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Sparkles at corners */}
          <circle cx="48" cy="22" r="4" fill="#fef08a" />
          <circle cx="112" cy="22" r="4" fill="#fef08a" />
          <circle cx="80" cy="22" r="5" fill="#f43f5e" />
        </svg>
      );

    // ──────── 14. CỜ TÀO CÁO DÂN GIAN ────────
    case "game-backgammon":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
          {/* Vietnamese Lacquer Board Frame */}
          <rect x="25" y="20" width="110" height="100" rx="10" fill="#3b0764" stroke="#a855f7" strokeWidth="2.5" />
          <rect x="30" y="25" width="100" height="90" rx="6" fill="#2e1065" stroke="#facc15" strokeWidth="1" strokeDasharray="4 2" />

          {/* Diagonal Strategy Lines */}
          <line x1="30" y1="25" x2="130" y2="115" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="130" y1="25" x2="30" y2="115" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="80" y1="25" x2="80" y2="115" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="30" y1="70" x2="130" y2="70" stroke="#6b21a8" strokeWidth="1.5" />

          {/* Ivory & Mahogany Playing Stones */}
          {/* Center Fox King (Golden) */}
          <circle cx="80" cy="70" r="14" fill="#facc15" stroke="#78350f" strokeWidth="2.5" />
          <text x="80" y="74" textAnchor="middle" fill="#78350f" fontWeight="900" fontSize="12">CÁO</text>

          {/* Geese / Hounds (Ivory Stones) */}
          <circle cx="55" cy="45" r="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <circle cx="105" cy="45" r="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <circle cx="55" cy="95" r="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <circle cx="105" cy="95" r="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
        </svg>
      );

    // ──────── 15. LẬT HÌNH RÈN TRÍ NHỚ ────────
    case "game-memory-match":
      return (
        <svg viewBox="0 0 160 140" className="w-full h-full max-h-[130px] filter drop-shadow-[0_0_12px_rgba(20,184,166,0.5)]">
          {/* Card 1: Face Down with Glowing Diamond (Left) */}
          <g transform="translate(30, 35) rotate(-10)">
            <rect x="0" y="0" width="44" height="64" rx="8" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
            <rect x="5" y="5" width="34" height="54" rx="5" fill="#134e4a" stroke="#5eead4" strokeWidth="1" strokeDasharray="3 3" />
            {/* Glowing Question Glyph */}
            <text x="22" y="38" textAnchor="middle" fill="#fef08a" fontWeight="900" fontSize="24" fontFamily="sans-serif">?</text>
          </g>

          {/* Card 2: 3D Flipping Card in Perspective (Right) */}
          <g transform="translate(85, 30) rotate(12)">
            <rect x="0" y="0" width="44" height="64" rx="8" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
            {/* Revealed Crown Gem */}
            <circle cx="22" cy="32" r="14" fill="#facc15" stroke="#fff" strokeWidth="2" />
            <polygon points="22,22 26,29 34,29 28,34 30,42 22,37 14,42 16,34 10,29 18,29" fill="#dc2626" />
          </g>

          {/* Psychic Memory Flash Rays */}
          <path d="M75,20 L80,35 M85,15 L85,32 M95,22 L88,35" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ──────── DEFAULT FALLBACK ────────
    default:
      return (
        <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-3xl shadow-inner">
          🎮
        </div>
      );
  }
}
