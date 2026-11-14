"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ChevronUp,
  ChevronDown,
  X,
  Download,
  Sparkles,
  ArrowRight,
  Key,
  ShieldCheck,
  Check,
  Gift,
} from "lucide-react";
import { Product, getProductTheme, formatVnd } from "@/lib/catalog";
import AffiliateMissionModal from "./AffiliateMissionModal";

interface YourStackDrawerProps {
  stack: Product[];
  onRemoveFromStack: (slug: string) => void;
  onClearStack: () => void;
  onSelectProduct: (p: Product) => void;
}

export default function YourStackDrawer({
  stack,
  onRemoveFromStack,
  onClearStack,
  onSelectProduct,
}: YourStackDrawerProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);

  const count = stack.length;
  const originalTotalValue = stack.reduce((sum, p) => sum + (p.originalPrice || 59000), 0);

  return (
    <>
      {/* Sticky Bottom Floating Pill Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-none select-none">
        <div
          onClick={() => setIsOpenModal(true)}
          className={`pointer-events-auto cursor-pointer rounded-2xl bg-gradient-to-r from-[#0d263b] via-[#123654] to-[#0d263b] text-white border border-amber-400/50 shadow-2xl backdrop-blur-md p-3 sm:px-5 sm:py-3.5 transition-all duration-300 hover:scale-[1.02] hover:border-amber-300 ${
            count > 0 ? "ring-2 ring-emerald-400/40" : "opacity-90"
          }`}
          style={{
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Left Tag: Tab Handle */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                <Layers size={16} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
                    YOUR STACK · NGĂN KÉO
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                    {count} MÓN
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-300 hidden sm:block">
                  {count === 0 ? "Bấm dấu (+) trên các cuốn sách để nhặt vào ngăn kéo" : "100% Miễn phí tải về trọn bộ"}
                </p>
              </div>
            </div>

            {/* Right Meta or Action */}
            {count === 0 ? (
              <span className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors">
                Xem Ngăn Kéo
              </span>
            ) : (
              <div className="flex items-center gap-3">
                {/* Mini Stack Thumbnails */}
                <div className="flex items-center gap-1 overflow-hidden max-w-[100px] sm:max-w-[160px]">
                  {stack.slice(0, 4).map((p) => {
                    const theme = getProductTheme(p);
                    return (
                      <div
                        key={p.slug}
                        title={p.name}
                        className="w-5 h-7 rounded-sm shrink-0 border border-white/20 flex flex-col justify-between p-0.5"
                        style={{ backgroundColor: theme.spineColor }}
                      >
                        <span className="text-[7px] text-center leading-none">{theme.symbol}</span>
                      </div>
                    );
                  })}
                  {count > 4 && (
                    <span className="text-[10px] font-mono text-neutral-400 ml-1">
                      +{count - 4}
                    </span>
                  )}
                </div>

                {/* Free Price Label */}
                <div className="text-right">
                  <div className="text-xs sm:text-sm font-black font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    0đ · FREE
                  </div>
                  <div className="text-[9px] text-neutral-400 line-through">
                    Trị giá {formatVnd(originalTotalValue)}
                  </div>
                </div>

                {/* Open Button */}
                <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1 shrink-0 shadow-md">
                  <span>Mở Stack</span>
                  <ChevronUp size={13} />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Stack Modal When Clicked */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-[#0d2235] text-white rounded-2xl border border-amber-400/35 shadow-2xl p-6 sm:p-8 flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif uppercase tracking-tight">
                    Ngăn Kéo Của Bạn ({count} Ứng Dụng)
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Kho ứng dụng &amp; game offline 100% miễn phí — Tải về chạy ngay
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {count > 0 && (
                  <button
                    onClick={onClearStack}
                    className="text-xs text-neutral-400 hover:text-red-400 px-2.5 py-1 rounded-lg border border-white/10 hover:border-red-400/40 transition-colors"
                  >
                    Xóa Hết
                  </button>
                )}
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Stack Items List */}
            <div className="my-4 overflow-y-auto space-y-2 pr-1 flex-1">
              {count === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="text-4xl">📚</div>
                  <h4 className="text-sm font-bold text-neutral-300">
                    Ngăn kéo của bạn hiện đang trống
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Hãy nhấp vào biểu tượng dấu cộng (+) trên các cuốn sách trên kệ để gom nhiều ứng dụng và tải toàn bộ miễn phí cùng lúc.
                  </p>
                </div>
              ) : (
                stack.map((p) => {
                  const theme = getProductTheme(p);
                  return (
                    <div
                      key={p.slug}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div
                        onClick={() => {
                          setIsOpenModal(false);
                          onSelectProduct(p);
                        }}
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                      >
                        <div
                          className="w-7 h-10 rounded-sm shrink-0 border border-white/20 flex flex-col justify-between p-1"
                          style={{ backgroundColor: theme.spineColor }}
                        >
                          <span className="text-[9px] text-center">{theme.symbol}</span>
                        </div>
                        <div className="truncate">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate hover:text-amber-300">
                            {p.name}
                          </h4>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {p.devicePrefix} · {p.format}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-mono font-bold text-xs sm:text-sm text-emerald-400">
                            0đ (Free)
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveFromStack(p.slug)}
                          className="p-1 rounded text-neutral-400 hover:text-red-400 transition-colors"
                          title="Bỏ khỏi ngăn kéo"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Calculation & Action */}
            {count > 0 && (
              <div className="border-t border-white/10 pt-4 space-y-4">
                {/* 100% Free Notice */}
                <div className="bg-black/30 p-3.5 rounded-xl border border-emerald-500/20 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Tổng giá trị niêm yết ({count} món):</span>
                    <span className="font-mono text-neutral-400 line-through">{formatVnd(originalTotalValue)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Tài trợ bởi Đối tác &amp; Quảng cáo:</span>
                    <span className="font-mono">-100% (Miễn phí)</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-emerald-400 pt-1 border-t border-white/10">
                    <span>Tổng thanh toán tải về:</span>
                    <span className="font-mono">0đ · HOÀN TOÀN MIỄN PHÍ</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="/downloads/Zeebee_Master_Bundle_15in1_APK.zip"
                    download
                    className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Download size={16} />
                    <span>Tải Gói Nén Master .ZIP ({count} APK Miễn Phí)</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsOpenModal(false);
                      setIsMissionModalOpen(true);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-amber-400 text-neutral-950 hover:bg-amber-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Gift size={16} />
                    <span>Làm Nhiệm Vụ Nhận Key PRO Trọn Đời</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Affiliate Mission Modal for the Stack */}
      <AffiliateMissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        targetFeature="Mã Master Unlock kích hoạt vĩnh viễn tính năng PRO cho toàn bộ ứng dụng trong ngăn kéo"
      />
    </>
  );
}
