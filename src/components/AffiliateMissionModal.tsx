"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Gift,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Gamepad2,
  Key,
} from "lucide-react";
import { Product, AFFILIATE_MISSIONS, AffiliateMission } from "@/lib/catalog";

interface AffiliateMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  targetFeature?: string;
  onMissionCompleted?: (rewardKey: string) => void;
}

export default function AffiliateMissionModal({
  isOpen,
  onClose,
  product,
  targetFeature,
  onMissionCompleted,
}: AffiliateMissionModalProps) {
  const [selectedMission, setSelectedMission] = useState<AffiliateMission | null>(null);
  const [step, setStep] = useState<"list" | "verifying" | "success">("list");
  const [countdown, setCountdown] = useState(5);
  const [generatedKey, setGeneratedKey] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("list");
      setCountdown(5);
      setCopied(false);
      setSelectedMission(AFFILIATE_MISSIONS[0]);
    }
  }, [isOpen, product]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "verifying") {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      } else {
        const prefix = product?.devicePrefix || "GAME";
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        const newKey = `ZB-PASS-${prefix}-${randomCode}`;
        setGeneratedKey(newKey);
        setStep("success");

        if (typeof window !== "undefined") {
          const unlockedKey = product ? `zb_unlocked_${product.slug}` : "zb_unlocked_all";
          localStorage.setItem(unlockedKey, "true");
        }

        if (onMissionCompleted) {
          onMissionCompleted(newKey);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [step, countdown, product, onMissionCompleted]);

  if (!isOpen) return null;

  const handleStartMission = (mission: AffiliateMission) => {
    setSelectedMission(mission);
    window.open(mission.url, "_blank", "noopener,noreferrer");
    setCountdown(5);
    setStep("verifying");
  };

  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#0e273c] to-[#071624] border border-amber-400/40 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-amber-400/20 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
              <Gift size={18} />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-300 font-serif">
                Nhiệm Vụ Đối Tác: Nhận Thêm Mạng &amp; Qua Màn
              </h3>
              <p className="text-[11px] text-neutral-400">
                Ghé thăm nhà tài trợ 5 giây để nhận quà tặng trực tiếp vào game
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Target Reward Banner */}
          <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-start gap-3">
            <div className="text-xl shrink-0 mt-0.5">🎮</div>
            <div className="text-xs space-y-1">
              <p className="font-bold text-amber-200">
                Phần thưởng khi hoàn thành:{" "}
                <span className="text-white underline">
                  {targetFeature ||
                    product?.proUnlockMission?.reward ||
                    "Hồi sinh 5 mạng & Mở khóa màn chơi tiếp theo"}
                </span>
              </p>
              <p className="text-neutral-300 opacity-90 leading-relaxed">
                Tựa game: <strong>{product ? product.name : "Tất cả Game trong bộ sưu tập"}</strong>.
              </p>
            </div>
          </div>

          {/* STEP 1: Select and Click Mission */}
          {step === "list" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Chọn 1 nhiệm vụ bên dưới:
                </span>
                <span className="text-[10px] text-amber-300/80 font-mono">
                  Thời gian: ~5 giây
                </span>
              </div>

              <div className="space-y-2.5">
                {AFFILIATE_MISSIONS.map((m) => {
                  return (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-xl border bg-white/5 border-white/10 hover:border-amber-400/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            {m.badge}
                          </span>
                          <span className="text-xs font-semibold text-neutral-300">
                            Đối tác: <strong className="text-white">{m.partner}</strong>
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-1">
                        {m.title}
                      </h4>
                      <p className="text-xs text-neutral-300 mb-3 line-clamp-2 leading-relaxed">
                        {m.description}
                      </p>

                      <button
                        onClick={() => handleStartMission(m)}
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <span>Ghé Thăm Nhận Quà ({m.partner})</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Verifying & Countdown */}
          {step === "verifying" && selectedMission && (
            <div className="py-8 text-center space-y-5">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/20 animate-ping" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl font-black text-amber-300 font-mono shadow-lg">
                  {countdown}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">
                  Đang xác nhận tương tác với nhà tài trợ...
                </h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Trang đối tác <strong>{selectedMission.partner}</strong> đang mở trong tab mới.
                  Vui lòng chờ trong giây lát để hệ thống gửi quà vào game!
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-xs mx-auto bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-300 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                />
              </div>

              <p className="text-[11px] text-neutral-400 italic">
                Cảm ơn bạn đã ủng hộ các nhà tài trợ trên hệ sinh thái game Zeebee!
              </p>
            </div>
          )}

          {/* STEP 3: Success & Reveal Pass */}
          {step === "success" && (
            <div className="py-4 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 text-amber-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-400/20">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-white font-serif">
                  🎉 Nhận Quà Thành Công!
                </h4>
                <p className="text-xs text-amber-300 font-medium">
                  {targetFeature || "Bạn đã được cộng 5 lượt chơi và mở khóa màn chơi tiếp theo!"}
                </p>
              </div>

              {/* The Key Box */}
              <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-400/40 text-left space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1 font-bold text-amber-300">
                    <Key size={13} /> MÃ PASS MỞ KHÓA VÀO GAME:
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">OFFLINE</span>
                </div>

                <div className="flex items-center justify-between gap-2 bg-black/60 p-2.5 rounded-lg border border-white/10 font-mono text-sm sm:text-base font-black text-amber-300 tracking-wider">
                  <span className="select-all break-all">{generatedKey}</span>
                  <button
                    onClick={handleCopyKey}
                    className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
                    title="Sao chép mã"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  👉 Nhập mã này tại màn hình game hoặc chơi trực tiếp trên bản Web Demo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                {product?.downloadUrl && (
                  <a
                    href={product.downloadUrl}
                    download
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <span>Tải Game Cài Đặt Ngay</span>
                  </a>
                )}
                {product?.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Chơi Ngay Trên Web</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl font-bold text-xs bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-neutral-950/80 text-[11px] text-neutral-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <Gamepad2 size={14} className="text-amber-400" />
            Hệ sinh thái game kết nối Bluetooth P2P &amp; Offline
          </span>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">
            Tài trợ bởi các đối tác Gaming &amp; Công nghệ
          </span>
        </div>
      </div>
    </div>
  );
}
