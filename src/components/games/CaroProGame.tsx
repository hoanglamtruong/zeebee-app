"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw, Sparkles, Volume2, VolumeX, Trophy, Clock, Cpu } from "lucide-react";
import type { SubGameProps } from "./PvpGames";
import {
  playWoodTap,
  playUiClick,
  playWinFanfare,
  playLoseTone,
  isMuted,
  setMuted,
} from "@/lib/gameAudio";

type CellValue = "X" | "O" | null;
type Difficulty = "easy" | "medium" | "hard";

const SIZE = 13;
const TURN_SECONDS = 30;

export function CaroProGame({
  mode,
  vipUnlocked,
  onConsumeLife,
  onRequestVip,
  sendP2P,
  lastP2PMessage,
  isHost,
}: SubGameProps) {
  const [board, setBoard] = useState<CellValue[][]>(() =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  );
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | "DRAW" | null>(null);
  const [winLine, setWinLine] = useState<[number, number][]>([]);
  const [history, setHistory] = useState<{ r: number; c: number; p: "X" | "O" }[]>([]);
  const [hintCell, setHintCell] = useState<[number, number] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [timeLeft, setTimeLeft] = useState<number>(TURN_SECONDS);
  const [muted, setMutedState] = useState<boolean>(() => isMuted());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) playUiClick();
  };

  const checkWin = useCallback((b: CellValue[][], r: number, c: number, p: "X" | "O") => {
    const dirs = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];
    for (const [dr, dc] of dirs) {
      const cells: [number, number][] = [[r, c]];
      for (let step = 1; step < 5; step++) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && b[nr][nc] === p) {
          cells.push([nr, nc]);
        } else break;
      }
      for (let step = 1; step < 5; step++) {
        const nr = r - dr * step;
        const nc = c - dc * step;
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && b[nr][nc] === p) {
          cells.push([nr, nc]);
        } else break;
      }
      if (cells.length >= 5) return cells;
    }
    return null;
  }, []);

  const findBestMove = useCallback(
    (b: CellValue[][], aiPlayer: "X" | "O", diff: Difficulty): [number, number] => {
      const human = aiPlayer === "X" ? "O" : "X";

      // Easy mode: 35% chance to pick a random cell near existing pieces
      if (diff === "easy" && Math.random() < 0.35) {
        const candidates: [number, number][] = [];
        for (let r = 0; r < SIZE; r++) {
          for (let c = 0; c < SIZE; c++) {
            if (b[r][c] === null) candidates.push([r, c]);
          }
        }
        if (candidates.length > 0) {
          return candidates[Math.floor(Math.random() * candidates.length)];
        }
      }

      let bestScore = -1;
      let bestMove: [number, number] = [Math.floor(SIZE / 2), Math.floor(SIZE / 2)];

      const evalPoint = (r: number, c: number, target: "X" | "O") => {
        const dirs = [
          [0, 1],
          [1, 0],
          [1, 1],
          [1, -1],
        ];
        let total = 0;
        let openThrees = 0;

        for (const [dr, dc] of dirs) {
          let cnt = 0;
          let openEnds = 0;
          for (let s = 1; s <= 4; s++) {
            const nr = r + dr * s;
            const nc = c + dc * s;
            if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) break;
            if (b[nr][nc] === target) cnt++;
            else {
              if (b[nr][nc] === null) openEnds++;
              break;
            }
          }
          for (let s = 1; s <= 4; s++) {
            const nr = r - dr * s;
            const nc = c - dc * s;
            if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) break;
            if (b[nr][nc] === target) cnt++;
            else {
              if (b[nr][nc] === null) openEnds++;
              break;
            }
          }

          if (cnt >= 4) total += 200000;
          else if (cnt === 3 && openEnds === 2) {
            total += diff === "hard" ? 25000 : 10000;
            openThrees++;
          } else if (cnt === 3 && openEnds === 1) {
            total += diff === "hard" ? 3200 : 1500;
          } else if (cnt === 2 && openEnds === 2) {
            total += diff === "hard" ? 1200 : 600;
          } else if (cnt === 1 && openEnds === 2) {
            total += 60;
          }
        }

        // Double-threat bonus in Hard mode
        if (diff === "hard" && openThrees >= 2) {
          total += 40000;
        }
        return total;
      };

      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          if (b[r][c] !== null) continue;
          const attackMult = diff === "hard" ? 1.15 : 1.05;
          const attack = evalPoint(r, c, aiPlayer) * attackMult;
          const defend = evalPoint(r, c, human);
          const centerBias = 12 - (Math.abs(r - 6) + Math.abs(c - 6));
          const score = attack + defend + centerBias;
          if (score > bestScore) {
            bestScore = score;
            bestMove = [r, c];
          }
        }
      }
      return bestMove;
    },
    []
  );

  const makeMove = useCallback(
    (r: number, c: number, fromRemote = false) => {
      if (winner || board[r][c] !== null) return;
      if (mode === "online" && !fromRemote) {
        const mySymbol = isHost ? "X" : "O";
        if (turn !== mySymbol) return;
      }

      const nextBoard = board.map((row) => [...row]);
      nextBoard[r][c] = turn;
      setBoard(nextBoard);
      setHintCell(null);
      setTimeLeft(TURN_SECONDS);
      setHistory((prev) => [...prev, { r, c, p: turn }]);

      // Distinct crisp wood tap sound per symbol
      playWoodTap(turn === "X" ? 360 : 280);

      if (mode === "online" && !fromRemote) {
        sendP2P({ type: "CARO_MOVE", r, c });
      }

      const wLine = checkWin(nextBoard, r, c, turn);
      if (wLine) {
        setWinner(turn);
        setWinLine(wLine);
        setScores((s) => ({ ...s, [turn]: s[turn] + 1 }));
        if (mode === "ai" && turn === "O") {
          playLoseTone();
          onConsumeLife();
        } else if (mode === "online") {
          const mySymbol = isHost ? "X" : "O";
          if (turn === mySymbol) playWinFanfare();
          else playLoseTone();
        } else {
          playWinFanfare();
        }
        return;
      }

      if (nextBoard.every((row) => row.every((cell) => cell !== null))) {
        setWinner("DRAW");
        playUiClick();
        return;
      }

      setTurn(turn === "X" ? "O" : "X");
    },
    [board, turn, winner, mode, isHost, checkWin, sendP2P, onConsumeLife]
  );

  // Turn countdown timer
  useEffect(() => {
    if (winner) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [winner, turn]);

  // Auto-play a fallback move if human runs out of time in AI mode
  useEffect(() => {
    if (timeLeft === 0 && !winner && (mode === "ai" || mode === "2p-local")) {
      if (mode === "ai" && turn === "O") return;
      const [r, c] = findBestMove(board, turn, "easy");
      makeMove(r, c);
    }
  }, [timeLeft, winner, mode, turn, board, findBestMove, makeMove]);

  // AI auto-response
  useEffect(() => {
    if (mode === "ai" && turn === "O" && !winner) {
      const timer = setTimeout(() => {
        const [r, c] = findBestMove(board, "O", difficulty);
        makeMove(r, c);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [mode, turn, winner, board, difficulty, findBestMove, makeMove]);

  // Online P2P listener
  useEffect(() => {
    if (!lastP2PMessage) return;
    if (lastP2PMessage.type === "CARO_MOVE") {
      makeMove(Number(lastP2PMessage.r), Number(lastP2PMessage.c), true);
    } else if (lastP2PMessage.type === "CARO_RESET") {
      setBoard(Array.from({ length: SIZE }, () => Array(SIZE).fill(null)));
      setTurn("X");
      setWinner(null);
      setWinLine([]);
      setHistory([]);
      setTimeLeft(TURN_SECONDS);
    }
  }, [lastP2PMessage, makeMove]);

  const handleReset = () => {
    playUiClick();
    setBoard(Array.from({ length: SIZE }, () => Array(SIZE).fill(null)));
    setTurn("X");
    setWinner(null);
    setWinLine([]);
    setHistory([]);
    setHintCell(null);
    setTimeLeft(TURN_SECONDS);
    if (mode === "online") sendP2P({ type: "CARO_RESET" });
  };

  const handleUndo = () => {
    playUiClick();
    if (!vipUnlocked) {
      onRequestVip("Mở khóa Hoàn Tác Nước Đi & Bàn Cờ Hoàng Gia VIP");
      return;
    }
    if (history.length === 0 || winner) return;
    const stepsToPop = mode === "ai" && history.length >= 2 ? 2 : 1;
    const remaining = history.slice(0, history.length - stepsToPop);
    const nextBoard = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    remaining.forEach((m) => {
      nextBoard[m.r][m.c] = m.p;
    });
    setBoard(nextBoard);
    setHistory(remaining);
    setTurn(remaining.length % 2 === 0 ? "X" : "O");
    setTimeLeft(TURN_SECONDS);
  };

  const handleHint = () => {
    playUiClick();
    if (!vipUnlocked) {
      onRequestVip("Mở khóa AI Gợi Ý Nước Đi Chiến Thắng");
      return;
    }
    const [r, c] = findBestMove(board, turn, "hard");
    setHintCell([r, c]);
  };

  const lastMove = history[history.length - 1];
  const myOnlineSymbol = isHost ? "X" : "O";

  return (
    <div className="flex flex-col items-center gap-2.5 w-full max-w-md mx-auto select-none">
      {/* Top Control Bar: Difficulty (AI) / Role (Online) + Audio Toggle */}
      <div className="w-full flex items-center justify-between gap-2 px-1">
        {mode === "ai" ? (
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 rounded-lg p-0.5 text-[11px]">
            <Cpu size={13} className="text-cyan-400 ml-1.5 mr-0.5" />
            {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => {
                  playUiClick();
                  setDifficulty(d);
                }}
                className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                  difficulty === d
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {d === "easy" ? "Dễ" : d === "medium" ? "Vừa" : "Khó"}
              </button>
            ))}
          </div>
        ) : mode === "online" ? (
          <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-[11px] font-bold text-slate-200">
            Bạn cầm quân:{" "}
            <span className={myOnlineSymbol === "X" ? "text-cyan-400" : "text-rose-400"}>
              {myOnlineSymbol}
            </span>
          </div>
        ) : (
          <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-[11px] font-bold text-slate-300">
            2 Người 1 Máy · Đấu 5 Quân
          </div>
        )}

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono font-bold border ${
              timeLeft <= 7 && !winner
                ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                : "bg-slate-900/90 border-slate-700 text-slate-300"
            }`}
          >
            <Clock size={12} />
            <span>{timeLeft}s</span>
          </div>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
            className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            {muted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} className="text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Scoreboard & Status */}
      <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/95 border border-cyan-500/30 text-xs shadow-lg">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
            turn === "X" && !winner
              ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(34,211,238,0.2)]"
              : "text-slate-400"
          }`}
        >
          <span className="text-sm font-black text-cyan-400">X</span>
          <span>P1: {scores.X}</span>
        </div>

        <div className="text-center font-bold text-amber-300 px-1">
          {winner === "DRAW" ? (
            "🤝 HÒA CỜ!"
          ) : winner ? (
            <span className="flex items-center gap-1 text-amber-300">
              <Trophy size={14} className="text-amber-400" />
              QUÂN {winner} THẮNG!
            </span>
          ) : mode === "online" && turn !== myOnlineSymbol ? (
            <span className="text-slate-400">Đợi đối thủ...</span>
          ) : (
            <span>Lượt: Quân {turn}</span>
          )}
        </div>

        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
            turn === "O" && !winner
              ? "bg-rose-500/20 border border-rose-400 text-rose-300 font-bold shadow-[0_0_12px_rgba(251,113,133,0.2)]"
              : "text-slate-400"
          }`}
        >
          <span className="text-sm font-black text-rose-400">O</span>
          <span>
            {mode === "ai" ? "AI" : "P2"}: {scores.O}
          </span>
        </div>
      </div>

      {/* 13x13 Board Grid */}
      <div
        className={`relative w-full aspect-square grid gap-[1px] p-1.5 rounded-xl border-2 shadow-2xl transition-colors ${
          vipUnlocked
            ? "bg-amber-950/70 border-amber-400 shadow-amber-500/20"
            : "bg-slate-800 border-cyan-500/40 shadow-cyan-500/10"
        }`}
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isWin = winLine.some(([wr, wc]) => wr === r && wc === c);
            const isLast = lastMove && lastMove.r === r && lastMove.c === c;
            const isHint = hintCell && hintCell[0] === r && hintCell[1] === c;
            const isCenter = r === 6 && c === 6;

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => makeMove(r, c)}
                className={`relative aspect-square flex items-center justify-center transition-all cursor-pointer touch-manipulation ${
                  isWin
                    ? "bg-amber-400 scale-105 z-10 rounded-xs shadow-[0_0_10px_rgba(251,191,36,0.9)]"
                    : isHint
                    ? "bg-emerald-500/40 animate-pulse border border-emerald-300"
                    : isLast
                    ? "bg-slate-700/90 ring-1 ring-inset ring-amber-400/50"
                    : "bg-slate-900/95 hover:bg-slate-800 active:bg-slate-700"
                }`}
              >
                {isCenter && !cell && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600/70 pointer-events-none" />
                )}

                {cell === "X" && (
                  <svg viewBox="0 0 24 24" className="w-[72%] h-[72%] animate-[scaleIn_0.14s_ease-out]">
                    <path
                      d="M5 5L19 19M19 5L5 19"
                      stroke={isWin ? "#09090b" : "#22d3ee"}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {cell === "O" && (
                  <svg viewBox="0 0 24 24" className="w-[72%] h-[72%] animate-[scaleIn_0.14s_ease-out]">
                    <circle
                      cx="12"
                      cy="12"
                      r="7"
                      fill="none"
                      stroke={isWin ? "#09090b" : "#fb7185"}
                      strokeWidth="3.5"
                    />
                  </svg>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Controls */}
      <div className="w-full grid grid-cols-3 gap-2">
        <button
          onClick={handleUndo}
          className="min-h-[44px] py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={14} className="text-amber-300" />
          <span>Hoàn Tác {!vipUnlocked && "🔒"}</span>
        </button>
        <button
          onClick={handleHint}
          className="min-h-[44px] py-2 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles size={14} />
          <span>Gợi Ý AI {!vipUnlocked && "🔒"}</span>
        </button>
        <button
          onClick={handleReset}
          className="min-h-[44px] py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          <span>Ván Mới</span>
        </button>
      </div>
    </div>
  );
}
