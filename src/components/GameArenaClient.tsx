"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Gift,
  Heart,
  Radio,
  Users,
  Bot,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  QrCode,
  Download,
  X,
} from "lucide-react";
import { Product } from "@/lib/catalog";
import AdBanner from "@/components/AdBanner";
import AffiliateMissionModal from "@/components/AffiliateMissionModal";
import {
  CaroGame,
  BattleshipGame,
  RPSGame,
  QuizDuelGame,
  PartyPackGame,
} from "./games/PvpGames";
import {
  PongGame,
  MazeEscapeGame,
  TowerDefenseGame,
  BomberGridGame,
  AsteroidGame,
} from "./games/CoopArcadeGames";
import {
  LudoGame,
  BlockPuzzleGame,
  AnimalConnectGame,
  FoxHoundsGame,
  MemoryMatchGame,
} from "./games/BoardPuzzleGames";

export default function GameArenaClient({ product }: { product: Product }) {
  const [mode, setMode] = useState<"ai" | "2p-local" | "online">("ai");
  const [lives, setLives] = useState<number>(3);
  const [vipUnlocked, setVipUnlocked] = useState<boolean>(false);
  const [isMissionOpen, setIsMissionOpen] = useState<boolean>(false);
  const [missionReason, setMissionReason] = useState<string>(
    product.proUnlockMission?.reward || "Nhận +5 Mạng Chơi & Mở Khóa Vật Phẩm VIP"
  );
  const [showPwaGuide, setShowPwaGuide] = useState<boolean>(false);

  // Online Room State (4-digit code + BroadcastChannel & WebRTC sync)
  const [roomCode, setRoomCode] = useState<string>("8868");
  const [joinInput, setJoinInput] = useState<string>("");
  const [isHost, setIsHost] = useState<boolean>(true);
  const [roomStatus, setRoomStatus] = useState<string>("Đang chờ bạn bè nhập mã phòng...");
  const [copiedRoom, setCopiedRoom] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [lastP2PMessage, setLastP2PMessage] = useState<Record<string, unknown> | null>(null);

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const rand = Math.floor(1000 + Math.random() * 9000).toString();
    setRoomCode(rand);

    if (typeof window !== "undefined") {
      const unlocked =
        localStorage.getItem(`zb_unlocked_${product.slug}`) === "true" ||
        localStorage.getItem("zb_unlocked_all") === "true";
      if (unlocked) {
        setVipUnlocked(true);
        setLives(5);
      }

      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get("room");
      if (roomParam) {
        setRoomCode(roomParam);
        setIsHost(false);
        setMode("online");
        setRoomStatus(`Đã kết nối vào phòng #${roomParam}!`);
      }
    }
  }, [product.slug]);

  // Setup local / same-network room channel
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const ch = new BroadcastChannel(`zb_room_${product.slug}_${roomCode}`);
    channelRef.current = ch;

    ch.onmessage = (ev) => {
      if (ev.data && typeof ev.data === "object") {
        if (ev.data.type === "PEER_JOINED") {
          setRoomStatus("✅ Người chơi 2 đã vào phòng! Bắt đầu thi đấu!");
        }
        setLastP2PMessage(ev.data);
      }
    };

    if (!isHost) {
      ch.postMessage({ type: "PEER_JOINED", timestamp: Date.now() });
    }

    return () => {
      ch.close();
    };
  }, [product.slug, roomCode, isHost]);

  const sendP2P = useCallback((data: Record<string, unknown>) => {
    if (channelRef.current) {
      channelRef.current.postMessage(data);
    }
  }, []);

  const handleJoinRoom = () => {
    const clean = joinInput.trim();
    if (clean.length < 3) return;
    setRoomCode(clean);
    setIsHost(false);
    setRoomStatus(`Đã vào phòng #${clean}! Sẵn sàng đối kháng!`);
    setJoinInput("");
  };

  const handleCopyInvite = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/choi-game/${product.slug}?room=${roomCode}`;
    navigator.clipboard.writeText(url);
    setCopiedRoom(true);
    setTimeout(() => setCopiedRoom(false), 2000);
  };

  const handleConsumeLife = useCallback(() => {
    setLives((prev) => Math.max(0, prev - 1));
  }, []);

  const handleRequestVip = useCallback((reason: string) => {
    setMissionReason(reason);
    setIsMissionOpen(true);
  }, []);

  const renderSelectedGame = () => {
    const props = {
      mode,
      vipUnlocked,
      lives,
      onConsumeLife: handleConsumeLife,
      onRequestVip: handleRequestVip,
      sendP2P,
      lastP2PMessage,
      isHost,
    };

    switch (product.slug) {
      case "game-tic-tac-toe-pro":
        return <CaroGame {...props} />;
      case "game-battleship-duel":
        return <BattleshipGame {...props} />;
      case "game-rock-paper-scissors":
        return <RPSGame {...props} />;
      case "game-quiz-duel":
        return <QuizDuelGame {...props} />;
      case "game-bluetooth-party-pack":
        return <PartyPackGame {...props} />;
      case "game-pong-bluetooth":
        return <PongGame {...props} />;
      case "game-coop-escape":
        return <MazeEscapeGame {...props} />;
      case "game-tower-defense-duo":
        return <TowerDefenseGame {...props} />;
      case "game-bomber-grid":
        return <BomberGridGame {...props} />;
      case "game-asteroid-coop":
        return <AsteroidGame {...props} />;
      case "game-ludo-lite":
        return <LudoGame {...props} />;
      case "game-block-puzzle":
        return <BlockPuzzleGame {...props} />;
      case "game-animal-connect":
        return <AnimalConnectGame {...props} />;
      case "game-backgammon":
        return <FoxHoundsGame {...props} />;
      case "game-memory-match":
        return <MemoryMatchGame {...props} />;
      default:
        return <CaroGame {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#061320] text-white flex flex-col justify-between">
      {/* Top Arcade Bar */}
      <header className="sticky top-0 z-30 bg-[#081b2e]/95 backdrop-blur-md border-b border-amber-400/20 px-3 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              href="/#san-pham"
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Kệ Game</span>
            </Link>
            <h1 className="text-xs sm:text-base font-black text-amber-300 truncate">
              {product.name}
            </h1>
          </div>

          {/* Right Status: Lives + VIP + PWA */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              onClick={() => handleRequestVip("Hồi sinh +5 Mạng Chơi & Mở Khóa Vật Phẩm VIP")}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-400/40 flex items-center gap-1 cursor-pointer"
              title="Bấm để nhận thêm mạng"
            >
              <Heart size={13} className="text-rose-400 fill-rose-400" />
              <span className="text-xs font-black text-rose-200">{lives}</span>
            </div>

            <button
              onClick={() => handleRequestVip("Nhận +5 Mạng & Mở Khóa Toàn Bộ Tính Năng VIP")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer transition-all ${
                vipUnlocked
                  ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300"
                  : "bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow"
              }`}
            >
              <Gift size={13} />
              <span>{vipUnlocked ? "VIP ĐÃ MỞ" : "+Mạng / VIP"}</span>
            </button>

            <button
              onClick={() => setShowPwaGuide(true)}
              className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold items-center gap-1 cursor-pointer"
            >
              <Download size={13} />
              <span>Lưu PWA</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 space-y-4">
        {/* Top Sponsor Banner */}
        <AdBanner
          variant="modal"
          sponsorName="Shopee Gaming"
          customTitle="Săn Deal Tay Cầm Chơi Game & Tai Nghe Bluetooth Giảm 50%"
          customCta="Nhận Ưu Đãi"
        />

        {/* 3-Mode Selector Bar */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10">
          <button
            onClick={() => setMode("ai")}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mode === "ai"
                ? "bg-amber-400 text-neutral-950 font-black shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Bot size={15} />
            <span>Đấu Máy / Solo</span>
          </button>

          <button
            onClick={() => setMode("2p-local")}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mode === "2p-local"
                ? "bg-emerald-400 text-neutral-950 font-black shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Smartphone size={15} />
            <span>2 Người 1 Máy</span>
          </button>

          <button
            onClick={() => setMode("online")}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mode === "online"
                ? "bg-cyan-400 text-neutral-950 font-black shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Radio size={15} />
            <span>Phòng Online</span>
          </button>
        </div>

        {/* Online Room Control Panel (when mode === "online") */}
        {mode === "online" && (
          <div className="p-3.5 rounded-2xl bg-cyan-950/50 border border-cyan-400/40 space-y-2.5 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-cyan-200">Mã Phòng Của Bạn:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-cyan-400 text-neutral-950 font-mono font-black text-sm">
                  #{roomCode}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyInvite}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedRoom ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedRoom ? "Đã chép link" : "Chép Link Mời"}</span>
                </button>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 text-neutral-950 text-xs font-black flex items-center gap-1 cursor-pointer"
                >
                  <QrCode size={13} />
                  <span>Mã QR</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={joinInput}
                onChange={(e) => setJoinInput(e.target.value)}
                placeholder="Nhập mã phòng 4 số của bạn bè..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white"
              />
              <button
                onClick={handleJoinRoom}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-neutral-950 font-black text-xs cursor-pointer"
              >
                Vào Phòng
              </button>
            </div>

            <p className="text-[11px] text-cyan-300 font-mono">{roomStatus}</p>
          </div>
        )}

        {/* Out of Lives Overlay Banner */}
        {lives === 0 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950 to-amber-950 border-2 border-amber-400 text-center space-y-2.5 shadow-2xl animate-fadeIn">
            <h3 className="text-sm sm:text-base font-black text-amber-300">
              ❤️ Bạn Đã Hết Lượt Mạng Chơi!
            </h3>
            <p className="text-xs text-neutral-200">
              Thực hiện nhiệm vụ ghé thăm nhà tài trợ 5 giây để nhận ngay <b>+5 Mạng Hồi Sinh</b> &amp; mở khóa <b>Đặc Quyền VIP</b>!
            </p>
            <button
              onClick={() => handleRequestVip("Hồi sinh +5 Mạng Chơi & Mở Khóa Đặc Quyền VIP")}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs sm:text-sm shadow-lg cursor-pointer"
            >
              🎁 Làm Nhiệm Vụ Nhận +5 Mạng Ngay
            </button>
          </div>
        )}

        {/* Interactive Game Stage */}
        <div className="p-3 sm:p-5 rounded-2xl bg-[#0a1e32] border border-white/10 shadow-2xl">
          {renderSelectedGame()}
        </div>

        {/* Bottom Sponsor Banner */}
        <AdBanner
          variant="leaderboard"
          tag="NHÀ TÀI TRỢ"
          sponsorName="Zeebee Affiliate Hub"
          customTitle="Mở Khóa Toàn Bộ Vật Phẩm VIP & Nhận Thêm 5 Lượt Hồi Sinh"
          customSubtitle="Chỉ 5 giây xem deal đối tác Shopee / Lazada để kích hoạt đặc quyền trong game"
          customCta="Xem Deal Mở Khóa"
        />
      </main>

      {/* QR Code Invite Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-400/40 rounded-2xl p-6 max-w-xs w-full text-center space-y-4 relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
            <h3 className="text-sm font-black text-cyan-300 uppercase">
              Quét Mã QR Vào Phòng #{roomCode}
            </h3>
            <div className="p-4 bg-white rounded-xl inline-block mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? `${window.location.origin}/choi-game/${product.slug}?room=${roomCode}`
                    : `https://app.zeebee.vn/choi-game/${product.slug}?room=${roomCode}`
                )}`}
                alt="Room QR Code"
                className="w-40 h-40"
              />
            </div>
            <p className="text-xs text-slate-300">
              Bạn bè dùng camera điện thoại quét mã này để vào thẳng phòng thi đấu cùng bạn!
            </p>
          </div>
        </div>
      )}

      {/* PWA Offline Install Guide Modal */}
      {showPwaGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-400/40 rounded-2xl p-6 max-w-sm w-full space-y-4 relative">
            <button
              onClick={() => setShowPwaGuide(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
            <h3 className="text-base font-black text-amber-300">
              📲 Cách Lưu Game Ra Màn Hình Chính (Chơi Offline)
            </h3>
            <div className="space-y-2.5 text-xs text-slate-200 leading-relaxed">
              <p className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                🍎 <b>Trên iPhone / iPad (Safari):</b> Bấm nút <b>Chia sẻ (Share)</b> ở thanh dưới cùng $\rightarrow$ Chọn <b>&ldquo;Thêm vào MH chính&rdquo; (Add to Home Screen)</b>.
              </p>
              <p className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                🤖 <b>Trên Android (Chrome):</b> Bấm biểu tượng <b>3 chấm (⋮)</b> góc trên bên phải $\rightarrow$ Chọn <b>&ldquo;Cài đặt ứng dụng&rdquo;</b> hoặc <b>&ldquo;Thêm vào màn hình chính&rdquo;</b>.
              </p>
            </div>
            <button
              onClick={() => setShowPwaGuide(false)}
              className="w-full py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-black text-xs cursor-pointer"
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      )}

      {/* Affiliate Mission Offerwall Modal */}
      <AffiliateMissionModal
        isOpen={isMissionOpen}
        onClose={() => setIsMissionOpen(false)}
        product={product}
        targetFeature={missionReason}
        onMissionCompleted={() => {
          setVipUnlocked(true);
          setLives((l) => l + 5);
        }}
      />
    </div>
  );
}
