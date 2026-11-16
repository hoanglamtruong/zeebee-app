"use client";

import React, { useState } from "react";
import { Sparkles, RotateCcw, Eye, Shuffle, Dice6 } from "lucide-react";
import { SubGameProps } from "./PvpGames";

// ═══════════════════════════════════════════════════════════════════════
// 11. CỜ CÁ NGỰA (LUDO LITE)
// ═══════════════════════════════════════════════════════════════════════
export function LudoGame({ vipUnlocked, onRequestVip }: SubGameProps) {
  const TRACK_LEN = 24;
  // Position: -1 = in stable, 0..23 = on track, 24 = finished
  const [redHorses, setRedHorses] = useState<number[]>([-1, -1, 0, -1]);
  const [blueHorses, setBlueHorses] = useState<number[]>([-1, -1, 12, -1]);
  const [turn, setTurn] = useState<"RED" | "BLUE">("RED");
  const [dice, setDice] = useState<number | null>(null);
  const [log, setLog] = useState("Đổ xúc xắc! Ra 6 điểm để xuất chuồng hoặc tiến quân!");

  const rollDice = (forceSix = false) => {
    if (forceSix && !vipUnlocked) {
      onRequestVip("Mở khóa Xúc Xắc May Mắn Ra 6 Điểm Xuất Chuồng Ngay");
      return;
    }
    const val = forceSix ? 6 : Math.floor(Math.random() * 6) + 1;
    setDice(val);

    if (turn === "RED") {
      const next = [...redHorses];
      const onBoardIdx = next.findIndex((p) => p >= 0 && p < TRACK_LEN);
      const stableIdx = next.findIndex((p) => p === -1);

      if (val === 6 && stableIdx !== -1) {
        next[stableIdx] = 0;
        setLog("🎲 Bạn đổ được 6! Đã xuất 1 chú ngựa Đỏ ra đường đua!");
      } else if (onBoardIdx !== -1) {
        next[onBoardIdx] = Math.min(TRACK_LEN, next[onBoardIdx] + val);
        setLog(`🐎 Ngựa Đỏ tiến thêm ${val} bước! (${next[onBoardIdx]}/${TRACK_LEN})`);
      } else {
        setLog(`🎲 Đổ ra ${val}. Cần 6 điểm để xuất chuồng!`);
      }
      setRedHorses(next);
      if (val !== 6) setTurn("BLUE");
    } else {
      const next = [...blueHorses];
      const onBoardIdx = next.findIndex((p) => p >= 0 && p < TRACK_LEN);
      const stableIdx = next.findIndex((p) => p === -1);
      if (val === 6 && stableIdx !== -1) {
        next[stableIdx] = 0;
        setLog("🎲 Đội Xanh đổ được 6 và xuất chuồng!");
      } else if (onBoardIdx !== -1) {
        next[onBoardIdx] = Math.min(TRACK_LEN, next[onBoardIdx] + val);
        setLog(`🐎 Ngựa Xanh tiến ${val} bước!`);
      } else {
        setLog(`🎲 Đội Xanh đổ ra ${val}. Chuyển lượt!`);
      }
      setBlueHorses(next);
      if (val !== 6) setTurn("RED");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3.5 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-red-950/70 border border-red-400/40 text-xs">
        <span className={`font-black ${turn === "RED" ? "text-amber-300 underline" : "text-red-300"}`}>
          🐎 Đội Đỏ (P1): {redHorses.filter((x) => x === TRACK_LEN).length}/4 về đích
        </span>
        <span className={`font-black ${turn === "BLUE" ? "text-amber-300 underline" : "text-sky-300"}`}>
          🐎 Đội Xanh (P2): {blueHorses.filter((x) => x === TRACK_LEN).length}/4 về đích
        </span>
      </div>

      <div className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-center text-xs font-bold text-amber-300">
        {log}
      </div>

      {/* Visual Race Track */}
      <div className="w-full grid grid-cols-6 gap-1.5 p-3 rounded-2xl bg-slate-950 border-2 border-amber-400/40">
        {Array.from({ length: TRACK_LEN }).map((_, idx) => {
          const hasRed = redHorses.includes(idx);
          const hasBlue = blueHorses.includes(idx);
          return (
            <div
              key={idx}
              className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-xs font-bold ${
                idx === 0
                  ? "bg-red-500/20 border-red-400"
                  : idx === TRACK_LEN - 1
                  ? "bg-amber-400/30 border-amber-300"
                  : "bg-slate-900 border-white/10"
              }`}
            >
              <span className="text-[9px] text-slate-500 font-mono">{idx + 1}</span>
              <span className="text-sm">
                {hasRed && hasBlue ? "⚔️" : hasRed ? "🔴" : hasBlue ? "🔵" : idx === TRACK_LEN - 1 ? "🏁" : ""}
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full flex gap-2.5">
        <button
          onClick={() => rollDice(false)}
          className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-400 text-neutral-950 font-black text-sm shadow-lg cursor-pointer"
        >
          🎲 Đổ Xúc Xắc ({turn === "RED" ? "Đội Đỏ" : "Đội Xanh"}) {dice ? `[ ${dice} ]` : ""}
        </button>
        <button
          onClick={() => rollDice(true)}
          className="px-4 py-3.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-xs cursor-pointer"
        >
          🎲 Ra 6 VIP {!vipUnlocked && "🔒"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 12. XẾP HÌNH GỖ KHỐI 8x8 (BLOCK PUZZLE CLASSIC)
// ═══════════════════════════════════════════════════════════════════════
const SHAPES = [
  [[1, 1, 1]],
  [[1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 0],
    [1, 1],
  ],
];

export function BlockPuzzleGame({ vipUnlocked, onRequestVip }: SubGameProps) {
  const SIZE = 8;
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
  );
  const [selectedShapeIdx, setSelectedShapeIdx] = useState(0);
  const [score, setScore] = useState(0);

  const placeShape = (r: number, c: number) => {
    const shape = SHAPES[selectedShapeIdx];
    const next = grid.map((row) => [...row]);

    // Check bounds & overlap
    for (let sr = 0; sr < shape.length; sr++) {
      for (let sc = 0; sc < shape[0].length; sc++) {
        if (shape[sr][sc] === 1) {
          if (r + sr >= SIZE || c + sc >= SIZE || next[r + sr][c + sc] === 1) {
            return;
          }
        }
      }
    }

    // Place
    for (let sr = 0; sr < shape.length; sr++) {
      for (let sc = 0; sc < shape[0].length; sc++) {
        if (shape[sr][sc] === 1) next[r + sr][c + sc] = 1;
      }
    }

    // Clear full rows/cols
    let cleared = 0;
    for (let i = 0; i < SIZE; i++) {
      if (next[i].every((v) => v === 1)) {
        next[i] = Array(SIZE).fill(0);
        cleared++;
      }
    }
    for (let j = 0; j < SIZE; j++) {
      if (next.every((row) => row[j] === 1)) {
        for (let i = 0; i < SIZE; i++) next[i][j] = 0;
        cleared++;
      }
    }

    setGrid(next);
    setScore((s) => s + 10 + cleared * 50);
    setSelectedShapeIdx(Math.floor(Math.random() * SHAPES.length));
  };

  const useHammer = () => {
    if (!vipUnlocked) {
      onRequestVip("Mở khóa Búa Thần Đập Phá Khối Gỗ Bị Kẹt");
      return;
    }
    const next = grid.map((row) => row.map(() => 0));
    setGrid(next);
    setScore((s) => s + 100);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-amber-950/80 border border-amber-500/40 text-xs">
        <span className="font-black text-amber-300">🪵 Điểm Kỷ Lục: {score}</span>
        <span className="text-amber-100">Bấm vào ô trống trên bàn cờ để đặt khối gỗ</span>
      </div>

      <div className="w-full max-w-[300px] aspect-square grid grid-cols-8 gap-1 p-2 rounded-2xl bg-[#291d12] border-2 border-amber-600/60 shadow-2xl">
        {grid.map((row, r) =>
          row.map((val, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => placeShape(r, c)}
              className={`aspect-square rounded transition-all cursor-pointer ${
                val === 1
                  ? "bg-gradient-to-br from-amber-400 to-amber-700 border border-amber-200 shadow-inner"
                  : "bg-[#1c130b] hover:bg-amber-900/40 border border-amber-950"
              }`}
            />
          ))
        )}
      </div>

      {/* Shape Selector */}
      <div className="w-full flex items-center justify-between gap-2 bg-slate-900 p-3 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-300">Khối tiếp theo:</span>
          <div className="flex flex-col gap-0.5 bg-black/40 p-2 rounded">
            {SHAPES[selectedShapeIdx].map((row, r) => (
              <div key={r} className="flex gap-0.5">
                {row.map((v, c) => (
                  <div
                    key={c}
                    className={`w-3.5 h-3.5 rounded-xs ${v ? "bg-amber-400" : "bg-transparent"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={useHammer}
          className="px-3.5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-black text-xs cursor-pointer"
        >
          🔨 Búa Phá Bảng {!vipUnlocked && "🔒"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 13. NỐI THÚ ONET CỔ ĐIỂN (ANIMAL CONNECT)
// ═══════════════════════════════════════════════════════════════════════
const ANIMALS = ["🐼", "🐯", "🐸", "🦊", "🐨", "🐷", "🦁", "🐰"];

export function AnimalConnectGame({ vipUnlocked, onRequestVip }: SubGameProps) {
  const createBoard = () => {
    const pairs: string[] = [];
    for (let i = 0; i < 18; i++) {
      const a = ANIMALS[i % ANIMALS.length];
      pairs.push(a, a);
    }
    return pairs.sort(() => Math.random() - 0.5);
  };

  const [tiles, setTiles] = useState<(string | null)[]>(() => createBoard());
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleTileClick = (idx: number) => {
    if (!tiles[idx]) return;
    if (selected === null) {
      setSelected(idx);
      return;
    }
    if (selected === idx) {
      setSelected(null);
      return;
    }
    if (tiles[selected] === tiles[idx]) {
      const next = [...tiles];
      next[selected] = null;
      next[idx] = null;
      setTiles(next);
      setScore((s) => s + 20);
    }
    setSelected(null);
  };

  const handleHintMatch = () => {
    if (!vipUnlocked) {
      onRequestVip("Mở khóa Tự Động Tìm Cặp Thú & Xáo Bảng Không Giới Hạn");
      return;
    }
    for (let i = 0; i < tiles.length; i++) {
      if (!tiles[i]) continue;
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[i] === tiles[j]) {
          const next = [...tiles];
          next[i] = null;
          next[j] = null;
          setTiles(next);
          setScore((s) => s + 20);
          return;
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-400/40 text-xs">
        <span className="font-black text-emerald-300">🐼 Điểm Onet: {score}</span>
        <button
          onClick={() => setTiles(createBoard())}
          className="px-2.5 py-1 rounded bg-white/10 text-white font-bold cursor-pointer"
        >
          Ván mới
        </button>
      </div>

      <div className="w-full grid grid-cols-6 gap-1.5 p-2.5 rounded-2xl bg-slate-950 border-2 border-emerald-500/40">
        {tiles.map((animal, i) => (
          <button
            key={i}
            onClick={() => handleTileClick(i)}
            disabled={!animal}
            className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all cursor-pointer ${
              !animal
                ? "opacity-0 pointer-events-none"
                : selected === i
                ? "bg-amber-400 scale-105 ring-2 ring-white"
                : "bg-slate-800 hover:bg-slate-700 border border-white/10"
            }`}
          >
            {animal}
          </button>
        ))}
      </div>

      <button
        onClick={handleHintMatch}
        className="w-full py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Sparkles size={14} /> Tự Động Nối 1 Cặp Thú VIP {!vipUnlocked && "🔒"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 14. CỜ TÀO CÁO DÂN GIAN (FOX & HOUNDS STRATEGY)
// ═══════════════════════════════════════════════════════════════════════
export function FoxHoundsGame({ vipUnlocked, onRequestVip }: SubGameProps) {
  const SIZE = 5;
  const [fox, setFox] = useState<[number, number]>([2, 2]);
  const [hounds, setHounds] = useState<[number, number][]>([
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ]);
  const [selectedHound, setSelectedHound] = useState<number>(0);
  const [turn, setTurn] = useState<"HOUND" | "FOX">("HOUND");
  const [status, setStatus] = useState("Chọn 1 quân Gà/Thợ săn (⚪) bên dưới rồi bấm ô trống liền kề để vây Cáo (🦊)!");

  const handleCellClick = (r: number, c: number) => {
    const houndIdx = hounds.findIndex(([hr, hc]) => hr === r && hc === c);
    if (houndIdx !== -1) {
      setSelectedHound(houndIdx);
      return;
    }
    if (fox[0] === r && fox[1] === c) return;

    if (turn === "HOUND") {
      const [hr, hc] = hounds[selectedHound];
      if (Math.abs(hr - r) <= 1 && Math.abs(hc - c) <= 1) {
        const nextHounds = [...hounds];
        nextHounds[selectedHound] = [r, c];
        setHounds(nextHounds);

        // Fox AI moves to an adjacent empty cell
        const moves: [number, number][] = [];
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = fox[0] + dr;
            const nc = fox[1] + dc;
            if (
              nr >= 0 &&
              nr < SIZE &&
              nc >= 0 &&
              nc < SIZE &&
              !nextHounds.some(([x, y]) => x === nr && y === nc)
            ) {
              moves.push([nr, nc]);
            }
          }
        }
        if (moves.length === 0) {
          setStatus("🏆 CHIẾN THẮNG! Bạn đã vây bắt thành công Cáo già!");
        } else {
          const nextFox = moves[Math.floor(Math.random() * moves.length)];
          setFox(nextFox);
          setStatus("🦊 Cáo đã di chuyển! Tới lượt bạn điều quân vây ép!");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full p-2.5 rounded-xl bg-purple-950/80 border border-purple-400/40 text-center text-xs font-bold text-purple-200">
        {status}
      </div>

      <div className="w-full max-w-[290px] aspect-square grid grid-cols-5 gap-1.5 p-3 rounded-2xl bg-[#2e1065] border-2 border-amber-400/50">
        {Array.from({ length: SIZE }).map((_, r) =>
          Array.from({ length: SIZE }).map((__, c) => {
            const isFox = fox[0] === r && fox[1] === c;
            const hIdx = hounds.findIndex(([hr, hc]) => hr === r && hc === c);
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`aspect-square rounded-xl border flex items-center justify-center text-2xl transition-all cursor-pointer ${
                  isFox
                    ? "bg-amber-400 text-neutral-950 border-white scale-105"
                    : hIdx !== -1
                    ? selectedHound === hIdx
                      ? "bg-cyan-400 text-neutral-950 ring-2 ring-white"
                      : "bg-slate-200 text-neutral-900"
                    : "bg-purple-900/60 hover:bg-purple-800/60 border-purple-500/30"
                }`}
              >
                {isFox ? "🦊" : hIdx !== -1 ? "⚪" : ""}
              </button>
            );
          })
        )}
      </div>

      <button
        onClick={() => {
          if (!vipUnlocked) {
            onRequestVip("Mở khóa Bàn Cờ Cẩm Thạch & Thêm Quân Vây Bắt Cáo");
            return;
          }
          setHounds((prev) => [...prev, [0, 0]]);
        }}
        className="w-full py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold cursor-pointer"
      >
        ✨ Gọi Thêm 1 Quân Vây Cáo VIP {!vipUnlocked && "🔒"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 15. LẬT HÌNH TRÍ NHỚ (MEMORY MATCH DUEL)
// ═══════════════════════════════════════════════════════════════════════
const CARD_ICONS = ["🚀", "💎", "👑", "🐉", "⚡", "🔮", "🛡️", "⚔️"];

export function MemoryMatchGame({ vipUnlocked, onRequestVip }: SubGameProps) {
  const createDeck = () => {
    return [...CARD_ICONS, ...CARD_ICONS].sort(() => Math.random() - 0.5);
  };

  const [deck, setDeck] = useState<string[]>(() => createDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [peekAll, setPeekAll] = useState(false);
  const [moves, setMoves] = useState(0);

  const flipCard = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const next = [...flipped, idx];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = next;
      if (deck[first] === deck[second]) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 650);
      }
    }
  };

  const handleXRay = () => {
    if (!vipUnlocked) {
      onRequestVip("Mở khóa Nhìn Xuyên Thấu Toàn Bảng Trong 3 Giây");
      return;
    }
    setPeekAll(true);
    setTimeout(() => setPeekAll(false), 2500);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-400/40 text-xs">
        <span className="font-black text-cyan-300">🃏 Cặp Đã Mở: {matched.length / 2}/8</span>
        <span className="text-white font-mono">Lượt lật: {moves}</span>
        <button
          onClick={() => {
            setDeck(createDeck());
            setFlipped([]);
            setMatched([]);
            setMoves(0);
          }}
          className="px-2 py-0.5 rounded bg-white/10 text-white cursor-pointer"
        >
          Chơi lại
        </button>
      </div>

      <div className="w-full max-w-[300px] aspect-square grid grid-cols-4 gap-2 p-2.5 rounded-2xl bg-slate-950 border-2 border-cyan-500/40">
        {deck.map((icon, i) => {
          const isOpen = peekAll || flipped.includes(i) || matched.includes(i);
          return (
            <button
              key={i}
              onClick={() => flipCard(i)}
              className={`aspect-square rounded-xl text-2xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                matched.includes(i)
                  ? "bg-emerald-500/30 border-2 border-emerald-400"
                  : isOpen
                  ? "bg-amber-400 text-neutral-950 scale-105"
                  : "bg-gradient-to-br from-cyan-800 to-slate-900 border border-cyan-400/40 hover:border-amber-300"
              }`}
            >
              {isOpen ? icon : "❔"}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleXRay}
        className="w-full py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Eye size={14} /> Nhìn Xuyên Thấu Toàn Bảng (3 Giây) {!vipUnlocked && "🔒"}
      </button>
    </div>
  );
}
