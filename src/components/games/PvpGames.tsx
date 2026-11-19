"use client";

import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw, Sparkles, Shield, Eye, Zap, Trophy, Users, Volume2 } from "lucide-react";

export interface SubGameProps {
  mode: "ai" | "2p-local" | "online";
  vipUnlocked: boolean;
  lives: number;
  onConsumeLife: () => void;
  onRequestVip: (reason: string) => void;
  sendP2P: (data: Record<string, unknown>) => void;
  lastP2PMessage: Record<string, unknown> | null;
  isHost: boolean;
}

// ═══════════════════════════════════════════════════════════════════════
// 1. CỜ CA RÔ (GOMOKU PRO 13x13) - COOKER-01-CARO
// ═══════════════════════════════════════════════════════════════════════
export { CaroProGame as CaroGame } from "./CaroProGame";


// ═══════════════════════════════════════════════════════════════════════
// 2. ĐẤU TÀU CHIẾN HẢI QUÂN (BATTLESHIP DUEL 8x8)
// ═══════════════════════════════════════════════════════════════════════
export function BattleshipGame({
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
}: SubGameProps) {
  const SIZE = 8;
  const SHIP_SIZES = [4, 3, 3, 2];

  const generateFleet = () => {
    const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    for (const len of SHIP_SIZES) {
      let placed = false;
      while (!placed) {
        const horiz = Math.random() > 0.5;
        const r = Math.floor(Math.random() * (horiz ? SIZE : SIZE - len));
        const c = Math.floor(Math.random() * (horiz ? SIZE - len : SIZE));
        let ok = true;
        for (let i = 0; i < len; i++) {
          if (grid[horiz ? r : r + i][horiz ? c + i : c] !== 0) ok = false;
        }
        if (ok) {
          for (let i = 0; i < len; i++) {
            grid[horiz ? r : r + i][horiz ? c + i : c] = 1;
          }
          placed = true;
        }
      }
    }
    return grid;
  };

  const [enemyFleet, setEnemyFleet] = useState<number[][]>(() => generateFleet());
  const [myFleet, setMyFleet] = useState<number[][]>(() => generateFleet());
  const [enemyShots, setEnemyShots] = useState<("HIT" | "MISS" | "RADAR" | null)[][]>(() =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  );
  const [myShots, setMyShots] = useState<("HIT" | "MISS" | null)[][]>(() =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  );
  const [status, setStatus] = useState<string>("Bấm vào tọa độ Radar địch để khai hỏa!");
  const [winner, setWinner] = useState<"PLAYER" | "ENEMY" | null>(null);

  const totalShipCells = SHIP_SIZES.reduce((a, b) => a + b, 0);

  const fireAt = (r: number, c: number) => {
    if (winner || enemyShots[r][c] === "HIT" || enemyShots[r][c] === "MISS") return;

    const nextEnemyShots = enemyShots.map((row) => [...row]);
    const isHit = enemyFleet[r][c] === 1;
    nextEnemyShots[r][c] = isHit ? "HIT" : "MISS";
    setEnemyShots(nextEnemyShots);

    const playerHits = nextEnemyShots.flat().filter((x) => x === "HIT").length;
    if (playerHits >= totalShipCells) {
      setWinner("PLAYER");
      setStatus("🏆 CHIẾN THẮNG! Bạn đã đánh chìm toàn bộ hạm đội đối phương!");
      return;
    }

    if (isHit) {
      setStatus("💥 TRÚNG MỤC TIÊU! Bạn được bắn tiếp lượt nữa!");
      return;
    } else {
      setStatus("🌊 Trượt mục tiêu! Đối phương đang phản kích...");
    }

    // Enemy counter-fire
    setTimeout(() => {
      const nextMyShots = myShots.map((row) => [...row]);
      const available: [number, number][] = [];
      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if (!nextMyShots[i][j]) available.push([i, j]);
        }
      }
      if (available.length === 0) return;
      const [er, ec] = available[Math.floor(Math.random() * available.length)];
      const eHit = myFleet[er][ec] === 1;
      nextMyShots[er][ec] = eHit ? "HIT" : "MISS";
      setMyShots(nextMyShots);

      const enemyHits = nextMyShots.flat().filter((x) => x === "HIT").length;
      if (enemyHits >= totalShipCells) {
        setWinner("ENEMY");
        setStatus("💀 Hạm đội của bạn đã bị đánh chìm!");
        onConsumeLife();
      }
    }, 350);
  };

  const handleRadarScan = () => {
    if (!vipUnlocked) {
      onRequestVip("Mở khóa Radar Sonar Quét Lộ Vị Trí Tàu Ngầm Địch");
      return;
    }
    const nextEnemyShots = enemyShots.map((row) => [...row]);
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (enemyFleet[r][c] === 1 && !nextEnemyShots[r][c]) {
          nextEnemyShots[r][c] = "RADAR";
          setEnemyShots(nextEnemyShots);
          setStatus(`📡 RADAR VIP: Phát hiện tàu địch tại tọa độ (${r + 1}, ${c + 1})!`);
          return;
        }
      }
    }
  };

  const resetBattle = () => {
    setEnemyFleet(generateFleet());
    setMyFleet(generateFleet());
    setEnemyShots(Array.from({ length: SIZE }, () => Array(SIZE).fill(null)));
    setMyShots(Array.from({ length: SIZE }, () => Array(SIZE).fill(null)));
    setWinner(null);
    setStatus("Bấm vào tọa độ Radar địch để khai hỏa!");
  };

  const playerHits = enemyShots.flat().filter((x) => x === "HIT").length;
  const enemyHits = myShots.flat().filter((x) => x === "HIT").length;

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full px-3 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-center">
        <p className="text-xs font-bold text-emerald-300">{status}</p>
        <div className="flex justify-between text-[11px] text-slate-300 mt-1 font-mono">
          <span>Tàu địch bị bắn trúng: {playerHits}/{totalShipCells}</span>
          <span>Tàu ta trúng đạn: {enemyHits}/{totalShipCells}</span>
        </div>
      </div>

      {/* Enemy Radar Grid (Primary Target) */}
      <div className="w-full space-y-1">
        <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
          🎯 RADAR VÙNG BIỂN ĐỐI PHƯƠNG (BẤM ĐỂ BẮN)
        </span>
        <div className="grid grid-cols-8 gap-1 p-2 rounded-xl bg-[#022c22] border-2 border-emerald-500/50 shadow-xl">
          {enemyShots.map((row, r) =>
            row.map((shot, c) => (
              <button
                key={`e-${r}-${c}`}
                onClick={() => fireAt(r, c)}
                className={`aspect-square rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                  shot === "HIT"
                    ? "bg-red-600 text-white animate-pulse"
                    : shot === "MISS"
                    ? "bg-slate-800 text-slate-500"
                    : shot === "RADAR"
                    ? "bg-amber-400 text-neutral-950 animate-bounce"
                    : "bg-emerald-900/60 hover:bg-emerald-700/60 border border-emerald-500/20"
                }`}
              >
                {shot === "HIT" ? "💥" : shot === "MISS" ? "•" : shot === "RADAR" ? "📡" : ""}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Player Fleet Mini View */}
      <div className="w-full flex items-center justify-between gap-3 bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
        <div className="space-y-1 flex-1">
          <span className="text-[11px] font-bold text-cyan-300 block">⚓ Hạm Đội Của Bạn</span>
          <p className="text-[10px] text-slate-400">
            Sử dụng Radar VIP để phát hiện chính xác vị trí tàu sân bay địch.
          </p>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleRadarScan}
              className="px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-black text-xs flex items-center gap-1 cursor-pointer"
            >
              <Eye size={13} /> Quét Radar {!vipUnlocked && "🔒"}
            </button>
            <button
              onClick={resetBattle}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-white font-bold text-xs cursor-pointer"
            >
              Trận Mới
            </button>
          </div>
        </div>

        <div className="w-24 h-24 grid grid-cols-8 gap-[1px] p-1 bg-slate-950 rounded border border-cyan-500/30 shrink-0">
          {myFleet.map((row, r) =>
            row.map((cell, c) => {
              const s = myShots[r][c];
              return (
                <div
                  key={`m-${r}-${c}`}
                  className={`w-full h-full ${
                    s === "HIT"
                      ? "bg-red-500"
                      : s === "MISS"
                      ? "bg-slate-700"
                      : cell === 1
                      ? "bg-cyan-400"
                      : "bg-slate-900"
                  }`}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 3. OẲN TÙ TÌ PHẢN XẠ (RPS ARENA)
// ═══════════════════════════════════════════════════════════════════════
export function RPSGame({
  mode,
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
}: SubGameProps) {
  type Hand = "ROCK" | "PAPER" | "SCISSORS";
  const HANDS: { id: Hand; label: string; emoji: string }[] = [
    { id: "ROCK", label: "Búa", emoji: "✊" },
    { id: "PAPER", label: "Bao", emoji: "✋" },
    { id: "SCISSORS", label: "Kéo", emoji: "✌️" },
  ];

  const [p1Choice, setP1Choice] = useState<Hand | null>(null);
  const [p2Choice, setP2Choice] = useState<Hand | null>(null);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [resultText, setResultText] = useState("Chọn Kéo - Búa - Bao để xuất chiêu!");
  const [shieldActive, setShieldActive] = useState(false);

  const resolveRound = (c1: Hand, c2: Hand) => {
    if (c1 === c2) {
      setResultText("⚡ HÒA NHAU! Cùng ra một chiêu!");
      return;
    }
    const p1Wins =
      (c1 === "ROCK" && c2 === "SCISSORS") ||
      (c1 === "PAPER" && c2 === "ROCK") ||
      (c1 === "SCISSORS" && c2 === "PAPER");

    if (p1Wins) {
      setScores((s) => ({ ...s, p1: s.p1 + 1 }));
      setResultText("🔥 BẠN THẮNG HIỆP NÀY!");
    } else {
      if (shieldActive) {
        setShieldActive(false);
        setResultText("🛡️ KHIÊN VIP ĐÃ CHẮN ĐÒN THUA CHO BẠN!");
      } else {
        setScores((s) => ({ ...s, p2: s.p2 + 1 }));
        setResultText("💥 ĐỐI THỦ THẮNG HIỆP NÀY!");
        onConsumeLife();
      }
    }
  };

  const handleSelectP1 = (h: Hand) => {
    if (mode === "2p-local") {
      setP1Choice(h);
      setResultText("Người chơi 1 đã khóa chiêu! Mời Người chơi 2 chọn!");
    } else {
      const aiH = HANDS[Math.floor(Math.random() * 3)].id;
      setP1Choice(h);
      setP2Choice(aiH);
      resolveRound(h, aiH);
    }
  };

  const handleSelectP2 = (h: Hand) => {
    if (!p1Choice) return;
    setP2Choice(h);
    resolveRound(p1Choice, h);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-amber-950/60 border border-amber-400/40">
        <div className="text-center">
          <div className="text-[10px] text-amber-200 uppercase">Người chơi 1</div>
          <div className="text-2xl font-black text-amber-400">{scores.p1}</div>
        </div>
        <div className="text-center px-2">
          <span className="text-xs font-bold text-white block">{resultText}</span>
          {shieldActive && (
            <span className="text-[10px] text-emerald-300 font-bold">🛡️ Đang bật Khiên Chắn Thua</span>
          )}
        </div>
        <div className="text-center">
          <div className="text-[10px] text-amber-200 uppercase">{mode === "2p-local" ? "Người chơi 2" : "Boss AI"}</div>
          <div className="text-2xl font-black text-rose-400">{scores.p2}</div>
        </div>
      </div>

      {/* Arena Clash Display */}
      <div className="w-full py-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 flex items-center justify-around">
        <div className="text-center space-y-1">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl">
            {p1Choice ? (mode === "2p-local" && !p2Choice ? "🔒" : HANDS.find((x) => x.id === p1Choice)?.emoji) : "❔"}
          </div>
          <span className="text-xs font-bold text-amber-300 block">P1</span>
        </div>

        <div className="text-2xl font-black text-amber-400 italic">VS</div>

        <div className="text-center space-y-1">
          <div className="w-20 h-20 rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-4xl">
            {p2Choice ? HANDS.find((x) => x.id === p2Choice)?.emoji : "❔"}
          </div>
          <span className="text-xs font-bold text-rose-300 block">{mode === "2p-local" ? "P2" : "AI"}</span>
        </div>
      </div>

      {/* Hand Buttons P1 */}
      <div className="w-full space-y-2">
        <span className="text-xs font-bold text-amber-300 block text-center">
          {mode === "2p-local" && p1Choice && !p2Choice ? "👉 Lượt Người Chơi 2 Chọn:" : "👉 Chọn Chiêu Của Bạn:"}
        </span>
        <div className="grid grid-cols-3 gap-3">
          {HANDS.map((h) => (
            <button
              key={h.id}
              onClick={() => {
                if (mode === "2p-local" && p1Choice && !p2Choice) {
                  handleSelectP2(h.id);
                } else {
                  setP2Choice(null);
                  handleSelectP1(h.id);
                }
              }}
              className="py-4 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-neutral-950 border border-white/15 transition-all flex flex-col items-center gap-1 cursor-pointer group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{h.emoji}</span>
              <span className="text-xs font-black">{h.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          if (!vipUnlocked) {
            onRequestVip("Mở khóa Khiên Bất Tử Chắn 1 Trận Thua");
            return;
          }
          setShieldActive(true);
        }}
        className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Shield size={14} /> Bật Khiên Chắn Thua Hiệp Tới {!vipUnlocked && "🔒"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 4. ĐỐ VUI TRÍ TUỆ ĐỐI KHÁNG (QUIZ DUEL)
// ═══════════════════════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q: "Đỉnh núi nào cao nhất Việt Nam được mệnh danh là 'Nóc nhà Đông Dương'?",
    options: ["Fansipan", "Pu Ta Leng", "Bạch Mộc Lương Tử", "Langbiang"],
    a: 0,
  },
  {
    q: "Hành tinh nào trong Hệ Mặt Trời có kích thước lớn nhất?",
    options: ["Sao Thổ", "Sao Mộc", "Sao Hải Vương", "Trái Đất"],
    a: 1,
  },
  {
    q: "Nguyên tố hóa học nào dẫn điện tốt nhất ở điều kiện thường?",
    options: ["Vàng (Au)", "Đồng (Cu)", "Bạc (Ag)", "Nhôm (Al)"],
    a: 2,
  },
  {
    q: "Ai là tác giả của kiệt tác văn học 'Truyện Kiều'?",
    options: ["Nguyễn Trãi", "Nguyễn Du", "Hồ Xuân Hương", "Nguyễn Khuyến"],
    a: 1,
  },
  {
    q: "Quốc gia nào có diện tích lớn nhất thế giới?",
    options: ["Canada", "Trung Quốc", "Hoa Kỳ", "Nga"],
    a: 3,
  },
  {
    q: "Vịnh Hạ Long thuộc tỉnh nào của Việt Nam?",
    options: ["Hải Phòng", "Quảng Ninh", "Ninh Bình", "Thanh Hóa"],
    a: 1,
  },
  {
    q: "Tốc độ ánh sáng trong chân không xấp xỉ bao nhiêu km/giây?",
    options: ["150.000 km/s", "300.000 km/s", "500.000 km/s", "1.000.000 km/s"],
    a: 1,
  },
  {
    q: "Trong cờ vua, quân cờ nào có thể nhảy qua đầu các quân cờ khác?",
    options: ["Quân Tượng", "Quân Xe", "Quân Mã", "Quân Hậu"],
    a: 2,
  },
];

export function QuizDuelGame({
  mode,
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
}: SubGameProps) {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);

  const current = QUIZ_QUESTIONS[idx % QUIZ_QUESTIONS.length];

  const handleAnswer = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const isCorrect = optIdx === current.a;
    if (isCorrect) {
      if (activePlayer === 1) setScores((s) => ({ ...s, p1: s.p1 + 10 }));
      else setScores((s) => ({ ...s, p2: s.p2 + 10 }));
    } else {
      onConsumeLife();
    }

    setTimeout(() => {
      setSelected(null);
      setHiddenOptions([]);
      setIdx((i) => i + 1);
      if (mode === "2p-local") setActivePlayer((p) => (p === 1 ? 2 : 1));
    }, 1000);
  };

  const handle5050 = () => {
    if (!vipUnlocked) {
      onRequestVip("Mở khóa Quyền Trợ Giúp 50/50 Loại 2 Đáp Án Sai");
      return;
    }
    const wrong = [0, 1, 2, 3].filter((i) => i !== current.a);
    setHiddenOptions(wrong.slice(0, 2));
  };

  return (
    <div className="flex flex-col gap-3.5 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-violet-950/70 border border-violet-400/40 text-xs">
        <span className={`font-black ${activePlayer === 1 ? "text-amber-300 underline" : "text-white"}`}>
          P1: {scores.p1} điểm
        </span>
        <span className="px-2 py-0.5 rounded bg-violet-500/30 text-violet-200 font-mono">
          Câu {(idx % QUIZ_QUESTIONS.length) + 1}/{QUIZ_QUESTIONS.length}
        </span>
        {mode === "2p-local" && (
          <span className={`font-black ${activePlayer === 2 ? "text-cyan-300 underline" : "text-white"}`}>
            P2: {scores.p2} điểm
          </span>
        )}
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-violet-500/30 shadow-xl space-y-2">
        {mode === "2p-local" && (
          <div className="text-[11px] font-bold text-amber-300 uppercase">
            🎤 Lượt trả lời của: Người chơi {activePlayer}
          </div>
        )}
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{current.q}</h3>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {current.options.map((opt, i) => {
          if (hiddenOptions.includes(i)) return null;
          const isCorrect = i === current.a;
          let btnStyle = "bg-white/5 hover:bg-white/10 border-white/15 text-white";
          if (selected !== null) {
            if (isCorrect) btnStyle = "bg-emerald-500 text-neutral-950 border-emerald-300 font-black";
            else if (selected === i) btnStyle = "bg-red-600 text-white border-red-400";
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
            >
              <span>
                {String.fromCharCode(65 + i)}. {opt}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handle5050}
        className="py-2.5 px-4 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Sparkles size={14} /> Trợ Giúp 50/50 (Loại 2 Đáp Án Sai) {!vipUnlocked && "🔒"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 5. PARTY PACK 4-IN-1 (VÒNG QUAY & THỬ THÁCH BÀN TIỆC)
// ═══════════════════════════════════════════════════════════════════════
const PARTY_DARES = [
  "🎯 Thật lòng: Kể tên người bạn nhắn tin nhiều nhất tuần qua!",
  "🔥 Thử thách: Uống 1 ngụm nước hoặc hát 1 câu bài hát bất kỳ!",
  "😂 Thử thách: Để người bên phải chụp 1 tấm ảnh selfie biểu cảm hài hước!",
  "💎 May mắn: Bạn được miễn hình phạt ở lượt kế tiếp!",
  "⚡ Thật lòng: Điều điên rồ nhất bạn từng làm khi đi du lịch là gì?",
  "🕺 Thử thách: Nhảy hoặc làm động tác theo yêu cầu của cả bàn trong 10 giây!",
  "👑 Đặc quyền: Chỉ định 1 người bất kỳ trong bàn thực hiện thử thách thay bạn!",
];

export function PartyPackGame({ vipUnlocked, onRequestVip }: SubGameProps) {
  const [tab, setTab] = useState<"wheel" | "card" | "bomb">("wheel");
  const [currentDare, setCurrentDare] = useState(PARTY_DARES[0]);
  const [spinning, setSpinning] = useState(false);
  const [bombMin, setBombMin] = useState(1);
  const [bombMax, setBombMax] = useState(100);
  const [secretBomb, setSecretBomb] = useState(() => Math.floor(Math.random() * 98) + 2);
  const [guessInput, setGuessInput] = useState("");
  const [bombExploded, setBombExploded] = useState(false);

  const spinChallenge = () => {
    setSpinning(true);
    setTimeout(() => {
      const next = PARTY_DARES[Math.floor(Math.random() * PARTY_DARES.length)];
      setCurrentDare(next);
      setSpinning(false);
    }, 500);
  };

  const handleBombGuess = () => {
    const val = parseInt(guessInput, 10);
    if (isNaN(val) || val <= bombMin || val >= bombMax) return;
    setGuessInput("");
    if (val === secretBomb) {
      setBombExploded(true);
    } else if (val < secretBomb) {
      setBombMin(val);
    } else {
      setBombMax(val);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setTab("wheel")}
          className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${tab === "wheel" ? "bg-pink-500 text-white" : "bg-white/10 text-slate-300"}`}
        >
          🎡 Vòng Quay
        </button>
        <button
          onClick={() => setTab("bomb")}
          className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${tab === "bomb" ? "bg-amber-400 text-neutral-950" : "bg-white/10 text-slate-300"}`}
        >
          💣 Bom Số 1-100
        </button>
        <button
          onClick={() => {
            if (!vipUnlocked) {
              onRequestVip("Mở khóa Bộ Thẻ Bài Bàn Tiệc VIP Đặc Biệt");
              return;
            }
            setTab("card");
          }}
          className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${tab === "card" ? "bg-cyan-400 text-neutral-950" : "bg-white/10 text-slate-300"}`}
        >
          🃏 Thẻ VIP {!vipUnlocked && "🔒"}
        </button>
      </div>

      {tab !== "bomb" ? (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-950/80 via-slate-900 to-cyan-950/80 border border-pink-400/40 text-center space-y-5 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center text-4xl">
            {spinning ? "🌀" : "🎉"}
          </div>
          <p className="text-base sm:text-lg font-black text-white min-h-[3.5rem] flex items-center justify-center">
            {spinning ? "Đang quay thử thách..." : currentDare}
          </p>
          <button
            onClick={spinChallenge}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-amber-400 text-neutral-950 font-black text-sm shadow-lg cursor-pointer"
          >
            🎲 Rút Thử Thách Tiếp Theo
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-400/40 text-center space-y-4">
          <h3 className="text-sm font-bold text-amber-300 uppercase">💣 Đếm Số Tránh Bom Cùng Bàn Tiệc</h3>
          {bombExploded ? (
            <div className="space-y-3 py-4">
              <div className="text-5xl animate-bounce">💥</div>
              <p className="text-lg font-black text-red-400">BÙM! Trúng quả bom số {secretBomb}!</p>
              <p className="text-xs text-slate-300">Người vừa đoán phải nhận 1 thử thách của cả bàn!</p>
              <button
                onClick={() => {
                  setBombMin(1);
                  setBombMax(100);
                  setSecretBomb(Math.floor(Math.random() * 98) + 2);
                  setBombExploded(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-black text-xs cursor-pointer"
              >
                Chơi Lại Ván Mới
              </button>
            </div>
          ) : (
            <>
              <div className="text-3xl font-black text-white font-mono">
                {bombMin} &lt; 💣 &lt; {bombMax}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  placeholder={`Nhập số từ ${bombMin + 1} đến ${bombMax - 1}`}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-white/20 text-white text-sm text-center"
                />
                <button
                  onClick={handleBombGuess}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-black text-xs cursor-pointer"
                >
                  Chốt!
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
