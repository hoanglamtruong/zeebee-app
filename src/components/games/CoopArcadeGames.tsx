"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Play, RotateCcw, Shield, Zap } from "lucide-react";
import { SubGameProps } from "./PvpGames";

// ═══════════════════════════════════════════════════════════════════════
// 6. BÓNG BÀN PONG ĐỐI KHÁNG 60FPS (PONG RETRO DUEL)
// ═══════════════════════════════════════════════════════════════════════
export function PongGame({
  mode,
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
}: SubGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [paused, setPaused] = useState(false);

  const stateRef = useRef({
    p1X: 110,
    p2X: 110,
    ballX: 160,
    ballY: 210,
    vx: 3.2,
    vy: 3.8,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const W = 320;
    const H = 420;
    const p1Width = vipUnlocked ? 92 : 68;
    const p2Width = 68;

    const render = () => {
      if (!paused) {
        const s = stateRef.current;
        s.ballX += s.vx;
        s.ballY += s.vy;

        // Wall bounce
        if (s.ballX < 8 || s.ballX > W - 8) s.vx *= -1;

        // AI movement for Top Paddle (P2)
        if (mode !== "2p-local") {
          const target = s.ballX - p2Width / 2;
          s.p2X += (target - s.p2X) * 0.085;
          s.p2X = Math.max(0, Math.min(W - p2Width, s.p2X));
        }

        // Bottom paddle collision (P1)
        if (s.ballY >= H - 28 && s.ballY <= H - 16 && s.vy > 0) {
          if (s.ballX >= s.p1X - 6 && s.ballX <= s.p1X + p1Width + 6) {
            const hitOffset = (s.ballX - (s.p1X + p1Width / 2)) / (p1Width / 2);
            s.vy = -Math.min(7.5, Math.abs(s.vy) * 1.05);
            s.vx = hitOffset * 4.5;
          }
        }

        // Top paddle collision (P2)
        if (s.ballY <= 28 && s.ballY >= 16 && s.vy < 0) {
          if (s.ballX >= s.p2X - 6 && s.ballX <= s.p2X + p2Width + 6) {
            const hitOffset = (s.ballX - (s.p2X + p2Width / 2)) / (p2Width / 2);
            s.vy = Math.min(7.5, Math.abs(s.vy) * 1.05);
            s.vx = hitOffset * 4.5;
          }
        }

        // Score check
        if (s.ballY < 0) {
          setScores((prev) => ({ ...prev, p1: prev.p1 + 1 }));
          s.ballX = W / 2;
          s.ballY = H / 2;
          s.vy = 3.6;
        } else if (s.ballY > H) {
          setScores((prev) => ({ ...prev, p2: prev.p2 + 1 }));
          onConsumeLife();
          s.ballX = W / 2;
          s.ballY = H / 2;
          s.vy = -3.6;
        }
      }

      // Draw Arena
      ctx.fillStyle = "#090d1e";
      ctx.fillRect(0, 0, W, H);

      // Center line
      ctx.strokeStyle = "rgba(167, 139, 250, 0.25)";
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const s = stateRef.current;

      // Top Paddle (P2 / AI)
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(s.p2X, 16, p2Width, 10);

      // Bottom Paddle (P1)
      ctx.fillStyle = vipUnlocked ? "#facc15" : "#22d3ee";
      ctx.fillRect(s.p1X, H - 26, p1Width, 10);

      // Ball
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [mode, paused, vipUnlocked, onConsumeLife]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 320;
    const y = ((e.clientY - rect.top) / rect.height) * 420;
    const p1Width = vipUnlocked ? 92 : 68;
    if (mode === "2p-local" && y < 210) {
      stateRef.current.p2X = Math.max(0, Math.min(320 - 68, x - 34));
    } else {
      stateRef.current.p1X = Math.max(0, Math.min(320 - p1Width, x - p1Width / 2));
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900 border border-violet-500/30 text-xs">
        <span className="font-black text-cyan-300">Bạn (Dưới): {scores.p1}</span>
        <button
          onClick={() => setPaused((p) => !p)}
          className="px-2.5 py-1 rounded bg-white/10 text-white font-bold cursor-pointer"
        >
          {paused ? "▶ Tiếp tục" : "⏸ Tạm dừng"}
        </button>
        <span className="font-black text-rose-400">
          {mode === "2p-local" ? "P2 (Trên)" : "AI"}: {scores.p2}
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={320}
        height={420}
        onPointerMove={handlePointerMove}
        className="w-full max-w-[320px] rounded-2xl border-2 border-violet-500/50 shadow-2xl touch-none cursor-ew-resize"
      />

      <p className="text-[11px] text-slate-400 text-center">
        Vuốt ngang trên bàn đấu để điều khiển thanh đỡ bóng. (Chế độ 2 người: mỗi người vuốt nửa sân của mình).
      </p>

      <button
        onClick={() => {
          if (!vipUnlocked) onRequestVip("Mở khóa Vợt Siêu Rộng (+40% chiều dài) & Bóng Lửa");
        }}
        className="w-full py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Sparkles size={14} /> {vipUnlocked ? "Đã Kích Hoạt Vợt Siêu Rộng VIP" : "Kích Hoạt Vợt Siêu Rộng (+40%) 🔒"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 7. GIẢI MÃ MÊ CUNG CO-OP (CO-OP ESCAPE GRID)
// ═══════════════════════════════════════════════════════════════════════
export function MazeEscapeGame({ vipUnlocked, onRequestVip }: SubGameProps) {
  // 0: floor, 1: wall, 2: switch, 3: gate, 4: exit
  const INITIAL_MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 2, 1],
    [1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 3, 1, 1, 0, 1],
    [1, 2, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const [pA, setPA] = useState<[number, number]>([1, 1]);
  const [pB, setPB] = useState<[number, number]>([5, 6]);
  const [activeChar, setActiveChar] = useState<"A" | "B">("A");
  const [gateOpen, setGateOpen] = useState(false);
  const [level, setLevel] = useState(1);
  const [won, setWon] = useState(false);

  const move = (dr: number, dc: number) => {
    if (won) return;
    const [r, c] = activeChar === "A" ? pA : pB;
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) return;
    const tile = INITIAL_MAP[nr][nc];
    if (tile === 1 && !vipUnlocked) return;
    if (tile === 3 && !gateOpen && !vipUnlocked) return;

    if (activeChar === "A") setPA([nr, nc]);
    else setPB([nr, nc]);

    const nextA = activeChar === "A" ? [nr, nc] : pA;
    const nextB = activeChar === "B" ? [nr, nc] : pB;

    if (INITIAL_MAP[nextA[0]][nextA[1]] === 2 || INITIAL_MAP[nextB[0]][nextB[1]] === 2) {
      setGateOpen(true);
    }

    if (INITIAL_MAP[nextA[0]][nextA[1]] === 4 && INITIAL_MAP[nextB[0]][nextB[1]] === 4) {
      setWon(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs">
        <span className="font-bold text-emerald-300">Ải Mê Cung #{level}</span>
        <span className="text-amber-300 font-bold">
          {won ? "🎉 ĐÃ THOÁT MÊ CUNG!" : gateOpen ? "🔓 Cổng Laser Đã Mở" : "🔒 Dẫm công tắc vàng để mở cổng"}
        </span>
      </div>

      {/* 8x8 Maze */}
      <div className="w-full max-w-[320px] aspect-square grid grid-cols-8 gap-1 p-2 rounded-2xl bg-slate-950 border-2 border-emerald-500/40">
        {INITIAL_MAP.map((row, r) =>
          row.map((tile, c) => {
            const isA = pA[0] === r && pA[1] === c;
            const isB = pB[0] === r && pB[1] === c;
            return (
              <div
                key={`${r}-${c}`}
                className={`rounded-md flex items-center justify-center text-sm font-black ${
                  tile === 1
                    ? "bg-slate-800 border border-slate-700"
                    : tile === 2
                    ? "bg-amber-500/30 border border-amber-400"
                    : tile === 3
                    ? gateOpen
                      ? "bg-emerald-900/30 border border-emerald-500/30"
                      : "bg-rose-600/80 border border-rose-400"
                    : tile === 4
                    ? "bg-cyan-500/30 border-2 border-cyan-300 animate-pulse"
                    : "bg-slate-900"
                }`}
              >
                {isA && isB ? "🧑‍🤝‍🧑" : isA ? "🔵" : isB ? "🟢" : tile === 2 ? "⚡" : tile === 4 ? "🚪" : tile === 3 && !gateOpen ? "🚧" : ""}
              </div>
            );
          })
        )}
      </div>

      {/* Switch Character & D-Pad */}
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1">
          <button
            onClick={() => setActiveChar((c) => (c === "A" ? "B" : "A"))}
            className="py-2.5 px-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-black cursor-pointer"
          >
            Đang điều khiển: Nhân vật {activeChar === "A" ? "🔵 A" : "🟢 B"} (Bấm để đổi)
          </button>
          <button
            onClick={() => {
              if (!vipUnlocked) {
                onRequestVip("Mở khóa Đi Xuyên Tường & Qua Màn Nhanh");
                return;
              }
              setGateOpen(true);
            }}
            className="py-2 px-3 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold cursor-pointer"
          >
            ✨ Đi Xuyên Tường / Mở Cổng VIP {!vipUnlocked && "🔒"}
          </button>
          {won && (
            <button
              onClick={() => {
                setLevel((l) => l + 1);
                setPA([1, 1]);
                setPB([5, 6]);
                setGateOpen(false);
                setWon(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-emerald-400 text-neutral-950 font-black text-xs cursor-pointer"
            >
              ▶ Qua Màn Tiếp Theo
            </button>
          )}
        </div>

        {/* D-Pad */}
        <div className="grid grid-cols-3 gap-1.5 w-32 h-32 shrink-0">
          <div />
          <button onClick={() => move(-1, 0)} className="bg-white/15 hover:bg-white/25 rounded-lg text-white font-bold cursor-pointer">▲</button>
          <div />
          <button onClick={() => move(0, -1)} className="bg-white/15 hover:bg-white/25 rounded-lg text-white font-bold cursor-pointer">◀</button>
          <button onClick={() => move(1, 0)} className="bg-white/15 hover:bg-white/25 rounded-lg text-white font-bold cursor-pointer">▼</button>
          <button onClick={() => move(0, 1)} className="bg-white/15 hover:bg-white/25 rounded-lg text-white font-bold cursor-pointer">▶</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 8. THỦ THÀNH DUO CO-OP (TOWER DEFENSE)
// ═══════════════════════════════════════════════════════════════════════
export function TowerDefenseGame({
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
}: SubGameProps) {
  const [gold, setGold] = useState(150);
  const [wave, setWave] = useState(1);
  const [baseHp, setBaseHp] = useState(10);
  const [slots, setSlots] = useState<(null | { type: "LASER" | "ICE" | "PLASMA"; level: number })[]>(
    Array(8).fill(null)
  );
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [battleLog, setBattleLog] = useState("Đặt tháp pháo vào các ô phòng thủ rồi bấm Gọi Đợt Quái!");

  const buildTower = (type: "LASER" | "ICE" | "PLASMA", cost: number) => {
    if (type === "PLASMA" && !vipUnlocked) {
      onRequestVip("Mở khóa Tháp Pháo Plasma Thần Thánh & +500 Vàng");
      return;
    }
    if (gold < cost) {
      setBattleLog("⚠️ Không đủ vàng! Hãy làm nhiệm vụ nhận tiếp tế hoặc gọi đợt quái.");
      return;
    }
    const next = [...slots];
    next[selectedSlot] = { type, level: (next[selectedSlot]?.level || 0) + 1 };
    setSlots(next);
    setGold((g) => g - cost);
    setBattleLog(`✅ Đã xây dựng/nâng cấp tháp ${type} tại vị trí #${selectedSlot + 1}!`);
  };

  const startWave = () => {
    const totalPower = slots.reduce((sum, s) => {
      if (!s) return sum;
      const base = s.type === "PLASMA" ? 45 : s.type === "LASER" ? 20 : 15;
      return sum + base * s.level;
    }, 0);

    const waveHp = wave * 28;
    if (totalPower >= waveHp) {
      const reward = 60 + wave * 15;
      setGold((g) => g + reward);
      setWave((w) => w + 1);
      setBattleLog(`🏆 Đẩy lùi Đợt ${wave}! Tiêu diệt toàn bộ quái, thưởng +${reward} Vàng!`);
    } else {
      setBaseHp((hp) => Math.max(0, hp - 2));
      setGold((g) => g + 35);
      setWave((w) => w + 1);
      onConsumeLife();
      setBattleLog(`💥 Hỏa lực (${totalPower}) chưa đủ chặn Đợt ${wave} (${waveHp})! Cứ điểm mất 2 máu!`);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-fuchsia-950/70 border border-fuchsia-400/40 text-xs">
        <span className="font-black text-amber-300">💰 Vàng: {gold}</span>
        <span className="font-bold text-white">Đợt Quái: #{wave}</span>
        <span className="font-black text-rose-400">🏰 Thành: {baseHp}/10</span>
      </div>

      <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-center text-xs text-amber-200">
        {battleLog}
      </div>

      {/* 8 Defense Turret Slots along the road */}
      <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-950 border-2 border-fuchsia-500/40">
        {slots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setSelectedSlot(i)}
            className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all cursor-pointer ${
              selectedSlot === i
                ? "border-amber-400 bg-amber-400/15 scale-105"
                : "border-white/10 bg-slate-900 hover:bg-slate-800"
            }`}
          >
            <span className="text-2xl">
              {!slot ? "➕" : slot.type === "PLASMA" ? "⚡" : slot.type === "LASER" ? "🔫" : "❄️"}
            </span>
            <span className="text-[10px] font-mono text-slate-300 mt-1">
              {slot ? `${slot.type} Lv.${slot.level}` : `Ô #${i + 1}`}
            </span>
          </button>
        ))}
      </div>

      {/* Build Menu */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => buildTower("ICE", 40)}
          className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold cursor-pointer"
        >
          ❄️ Tháp Băng (40G)
        </button>
        <button
          onClick={() => buildTower("LASER", 60)}
          className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-bold cursor-pointer"
        >
          🔫 Tháp Laser (60G)
        </button>
        <button
          onClick={() => buildTower("PLASMA", 80)}
          className="p-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold cursor-pointer"
        >
          ⚡ Tháp VIP (80G) {!vipUnlocked && "🔒"}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={startWave}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-amber-400 text-neutral-950 font-black text-xs sm:text-sm cursor-pointer shadow-lg"
        >
          ⚔️ Gọi Đợt Quái Tiếp Theo (Wave #{wave})
        </button>
        <button
          onClick={() => {
            if (!vipUnlocked) {
              onRequestVip("Nhận Tiếp Tế +500 Vàng Khởi Đầu & Mở Khóa Tháp Plasma");
              return;
            }
            setGold((g) => g + 500);
          }}
          className="px-3.5 py-3 rounded-xl bg-amber-400 text-neutral-950 font-black text-xs cursor-pointer"
        >
          +500 Vàng {!vipUnlocked && "🔒"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 9. ĐẶT BOM CHIẾN THUẬT (BOMBER GRID LITE)
// ═══════════════════════════════════════════════════════════════════════
export function BomberGridGame({
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
}: SubGameProps) {
  const SIZE = 7;
  // 0: empty, 1: solid pillar, 2: brick crate
  const createArena = () => {
    const g = Array.from({ length: SIZE }, (_, r) =>
      Array.from({ length: SIZE }, (__, c) => {
        if (r % 2 === 1 && c % 2 === 1) return 1;
        if ((r < 2 && c < 2) || (r > SIZE - 3 && c > SIZE - 3)) return 0;
        return Math.random() < 0.55 ? 2 : 0;
      })
    );
    return g;
  };

  const [grid, setGrid] = useState<number[][]>(() => createArena());
  const [player, setPlayer] = useState<[number, number]>([0, 0]);
  const [enemy, setEnemy] = useState<[number, number]>([SIZE - 1, SIZE - 1]);
  const [bomb, setBomb] = useState<{ r: number; c: number } | null>(null);
  const [flames, setFlames] = useState<[number, number][]>([]);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("Di chuyển và đặt bom phá gạch, tiêu diệt đối thủ!");

  const movePlayer = (dr: number, dc: number) => {
    const nr = player[0] + dr;
    const nc = player[1] + dc;
    if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) return;
    if (grid[nr][nc] !== 0) return;
    setPlayer([nr, nc]);

    // Enemy random step
    const dirs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    const valid = dirs
      .map(([er, ec]) => [enemy[0] + er, enemy[1] + ec] as [number, number])
      .filter(([er, ec]) => er >= 0 && er < SIZE && ec >= 0 && ec < SIZE && grid[er][ec] === 0);
    if (valid.length > 0) {
      setEnemy(valid[Math.floor(Math.random() * valid.length)]);
    }
  };

  const plantBomb = () => {
    if (bomb) return;
    const [br, bc] = player;
    setBomb({ r: br, c: bc });

    setTimeout(() => {
      const range = vipUnlocked ? 3 : 1;
      const hitCells: [number, number][] = [[br, bc]];
      const nextGrid = grid.map((row) => [...row]);
      const dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];
      for (const [dr, dc] of dirs) {
        for (let step = 1; step <= range; step++) {
          const nr = br + dr * step;
          const nc = bc + dc * step;
          if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) break;
          if (nextGrid[nr][nc] === 1) break;
          hitCells.push([nr, nc]);
          if (nextGrid[nr][nc] === 2) {
            nextGrid[nr][nc] = 0;
            setScore((s) => s + 10);
            break;
          }
        }
      }
      setGrid(nextGrid);
      setFlames(hitCells);
      setBomb(null);

      // Check enemy hit
      if (hitCells.some(([hr, hc]) => hr === enemy[0] && hc === enemy[1])) {
        setScore((s) => s + 100);
        setMsg("🏆 BÙM! Bạn đã hạ gục đối thủ! +100 điểm!");
        setEnemy([SIZE - 1, SIZE - 1]);
      }

      setTimeout(() => setFlames([]), 450);
    }, 1100);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-950/70 border border-amber-500/40 text-xs">
        <span className="font-black text-amber-300">💣 Điểm: {score}</span>
        <span className="text-white font-semibold">{msg}</span>
      </div>

      <div className="w-full max-w-[310px] aspect-square grid grid-cols-7 gap-1 p-2 rounded-2xl bg-neutral-950 border-2 border-amber-500/40">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isP = player[0] === r && player[1] === c;
            const isE = enemy[0] === r && enemy[1] === c;
            const isB = bomb && bomb.r === r && bomb.c === c;
            const isF = flames.some(([fr, fc]) => fr === r && fc === c);
            return (
              <div
                key={`${r}-${c}`}
                className={`rounded flex items-center justify-center text-base ${
                  isF
                    ? "bg-orange-500 animate-ping"
                    : cell === 1
                    ? "bg-neutral-700 border border-neutral-500"
                    : cell === 2
                    ? "bg-amber-800/80 border border-amber-600"
                    : "bg-neutral-900"
                }`}
              >
                {isF ? "🔥" : isB ? "💣" : isP ? "🤠" : isE ? "👾" : cell === 2 ? "🧱" : ""}
              </div>
            );
          })
        )}
      </div>

      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1">
          <button
            onClick={plantBomb}
            className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-neutral-950 font-black text-sm shadow-lg cursor-pointer"
          >
            💣 ĐẶT BOM NGAY
          </button>
          <button
            onClick={() => {
              if (!vipUnlocked) onRequestVip("Mở khóa Bom Lửa Dài Gấp 3 Lần & Khiên Chống Nổ");
            }}
            className="py-2 px-3 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold cursor-pointer"
          >
            🔥 Bom Lửa Dài VIP (3 Ô) {!vipUnlocked && "🔒"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 w-32 h-32 shrink-0">
          <div />
          <button onClick={() => movePlayer(-1, 0)} className="bg-white/15 rounded-lg text-white font-bold cursor-pointer">▲</button>
          <div />
          <button onClick={() => movePlayer(0, -1)} className="bg-white/15 rounded-lg text-white font-bold cursor-pointer">◀</button>
          <button onClick={() => movePlayer(1, 0)} className="bg-white/15 rounded-lg text-white font-bold cursor-pointer">▼</button>
          <button onClick={() => movePlayer(0, 1)} className="bg-white/15 rounded-lg text-white font-bold cursor-pointer">▶</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 10. BẮN THIÊN THẠCH KHÔNG GIAN (ASTEROID CO-OP)
// ═══════════════════════════════════════════════════════════════════════
export function AsteroidGame({
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
}: SubGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);

  const stateRef = useRef({
    shipX: 160,
    bullets: [] as { x: number; y: number }[],
    rocks: [
      { x: 60, y: 40, r: 18, vy: 1.4 },
      { x: 180, y: -20, r: 22, vy: 1.2 },
      { x: 250, y: 80, r: 16, vy: 1.6 },
    ],
    tick: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const W = 320;
    const H = 380;

    const loop = () => {
      const s = stateRef.current;
      s.tick++;

      // Auto-shoot
      if (s.tick % 14 === 0) {
        if (vipUnlocked) {
          s.bullets.push({ x: s.shipX - 10, y: H - 40 });
          s.bullets.push({ x: s.shipX + 10, y: H - 40 });
        } else {
          s.bullets.push({ x: s.shipX, y: H - 40 });
        }
      }

      // Move bullets
      s.bullets.forEach((b) => (b.y -= 6));
      s.bullets = s.bullets.filter((b) => b.y > 0);

      // Move rocks & check collision
      s.rocks.forEach((rk) => {
        rk.y += rk.vy;
        if (rk.y > H + 20) {
          rk.y = -20;
          rk.x = Math.random() * (W - 40) + 20;
          onConsumeLife();
        }

        // Bullet hit
        s.bullets.forEach((b) => {
          const dist = Math.hypot(b.x - rk.x, b.y - rk.y);
          if (dist < rk.r + 4) {
            b.y = -100;
            rk.y = -25;
            rk.x = Math.random() * (W - 40) + 20;
            setScore((prev) => prev + 25);
          }
        });
      });

      // Draw space
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, W, H);

      // Draw ship
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.moveTo(s.shipX, H - 42);
      ctx.lineTo(s.shipX - 14, H - 16);
      ctx.lineTo(s.shipX + 14, H - 16);
      ctx.closePath();
      ctx.fill();

      // Draw bullets
      ctx.fillStyle = vipUnlocked ? "#facc15" : "#38bdf8";
      s.bullets.forEach((b) => {
        ctx.fillRect(b.x - 2, b.y, 4, 10);
      });

      // Draw rocks
      ctx.fillStyle = "#64748b";
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      s.rocks.forEach((rk) => {
        ctx.beginPath();
        ctx.arc(rk.x, rk.y, rk.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [vipUnlocked, onConsumeLife]);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-sky-950/70 border border-sky-400/40 text-xs">
        <span className="font-black text-sky-300">🚀 Điểm Không Gian: {score}</span>
        <span className="text-amber-300 font-bold">{vipUnlocked ? "⚡ Pháo Laser Đôi VIP" : "Pháo Đơn Cơ Bản"}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={320}
        height={380}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 320;
          stateRef.current.shipX = Math.max(20, Math.min(300, x));
        }}
        className="w-full max-w-[320px] rounded-2xl border-2 border-sky-500/40 shadow-2xl touch-none cursor-ew-resize"
      />

      <button
        onClick={() => {
          if (!vipUnlocked) onRequestVip("Mở khóa Pháo Tia Chớp Laser Đôi & Khiên Hộ Tống");
        }}
        className="w-full py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold cursor-pointer"
      >
        ⚡ Kích Hoạt Pháo Laser Đôi VIP {!vipUnlocked && "🔒"}
      </button>
    </div>
  );
}
