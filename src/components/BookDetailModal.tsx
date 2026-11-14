"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  X,
  Download,
  Play,
  Key,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Plus,
  Check,
  Gift,
  Gamepad2,
  Radio,
  Users,
} from "lucide-react";
import { Product, getProductTheme } from "@/lib/catalog";
import AdBanner from "@/components/AdBanner";
import GameCoverArt from "./GameCoverArt";
import AffiliateMissionModal from "@/components/AffiliateMissionModal";

interface BookDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isInStack: boolean;
  onToggleStack: (product: Product, e: React.MouseEvent) => void;
}

export default function BookDetailModal({
  product,
  onClose,
  isInStack,
  onToggleStack,
}: BookDetailModalProps) {
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const theme = getProductTheme(product);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
        {/* Double-page unboxed layout */}
        <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0f283f] via-[#0b1f32] to-[#071725] border border-amber-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
            title="Đóng (Esc)"
          >
            <X size={18} />
          </button>

          {/* Left Side: 3D Product Cover & Technical Specs */}
          <div className="w-full md:w-80 p-6 sm:p-8 bg-neutral-950/60 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-between gap-6 shrink-0">
            {/* 3D Game Box Display */}
            <div className="pt-2">
              <div
                className="relative w-[150px] sm:w-[170px] h-[225px] sm:h-[255px] rounded-r-lg overflow-hidden flex flex-col justify-between text-left border-t border-r border-b shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{
                  background: theme.coverGradient || theme.spineColor,
                  borderColor: "rgba(255,255,255,0.25)",
                  boxShadow: `
                    inset 5px 0 10px rgba(0, 0, 0, 0.5),
                    inset 9px 0 5px rgba(255, 255, 255, 0.1),
                    inset -3px 0 8px rgba(0, 0, 0, 0.35),
                    0 20px 25px -5px rgba(0, 0, 0, 0.7),
                    0 0 25px ${theme.glowColor || 'transparent'}
                  `,
                }}
              >
                <GameCoverArt product={product} />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="w-full space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-neutral-300">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <HardDrive size={13} /> Dung lượng:
                </span>
                <span className="font-mono font-bold text-amber-300">&lt; 25 KB (Siêu nhẹ)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-neutral-300">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Radio size={13} /> Kết nối:
                </span>
                <span className="font-mono text-neutral-200">Bluetooth P2P / Offline</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-neutral-300">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Users size={13} /> Chế độ:
                </span>
                <span className="font-bold text-cyan-300">{product.playerCount}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Information & Action CTAs */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-5">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[rgba(234,189,23,0.15)] text-[var(--zb-gold)] border border-[rgba(234,189,23,0.3)]">
                  {product.gameMode}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {product.playerCount}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-serif">
                {product.name}
              </h2>

              <p className="text-sm text-[var(--zb-gold-light)] font-medium italic">
                &ldquo;{product.tagline}&rdquo;
              </p>
            </div>

            {/* In-Modal Sponsored Placement */}
            <AdBanner
              variant="modal"
              customTitle="Đối Tác Game: Ưu Đãi Tay Cầm Bluetooth & Phụ Kiện Săn Sale"
              customSubtitle="Ghé thăm gian hàng đối tác để nhận quà tặng trong game"
            />

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Giới thiệu gameplay
              </h4>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed opacity-90">
                {product.description}
              </p>
            </div>

            {/* Core Feature Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Điểm nổi bật
              </h4>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {product.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                    <CheckCircle2 size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-neutral-200">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTAs Button Group */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              {/* Mission Unlock Button */}
              <button
                onClick={() => setIsMissionModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Gift size={16} />
                <span>
                  {product.proUnlockMission?.reward
                    ? `🎁 Nhiệm Vụ Đối Tác: ${product.proUnlockMission.reward}`
                    : "🎁 Nhiệm Vụ Đối Tác: Nhận Thêm Mạng & Mở Khóa Màn Kế Tiếp"}
                </span>
              </button>

                {/* Placeholder Notice when game is not ready / rebuilding */}
                {!product.downloadUrl && !product.demoUrl && (
                  <div className="w-full p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                      <Gamepad2 size={16} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-amber-300">
                        Sắp Ra Mắt (Placeholder) · Đang Trong Lộ Trình Build
                      </h4>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        Tựa game đang được hoàn thiện và đóng gói lại bản cài đặt APK độc lập. Bạn có thể thêm vào bộ sưu tập để theo dõi ngày phát hành.
                      </p>
                    </div>
                  </div>
                )}

              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Toggle Stack Button */}
                <button
                  onClick={(e) => onToggleStack(product, e)}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                    isInStack
                      ? "bg-amber-400/20 border-amber-400 text-amber-300"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  }`}
                >
                  {isInStack ? <Check size={15} /> : <Plus size={15} />}
                  <span>{isInStack ? "Đã trong bộ sưu tập (Bấm để bỏ)" : "Thêm vào bộ sưu tập game (Your Vault)"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Mission Modal */}
      <AffiliateMissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        product={product}
        targetFeature={
          product.proUnlockMission?.reward || "Hồi sinh 5 mạng & Mở khóa qua màn khó"
        }
      />
    </>
  );
}
