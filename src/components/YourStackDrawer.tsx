"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ChevronUp,
  X,
  Download,
  Sparkles,
  Gamepad2,
  Gift,
} from "lucide-react";
import { Product, getProductTheme } from "@/lib/catalog";
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

  return (
    <>
      {/* Sticky Bottom Floating Pill Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-none select-none">
        <div
          onClick={() => setIsOpenModal(true)}
          className={`pointer-events-auto cursor-pointer rounded-2xl bg-gradient-to-r from-[#0d263b] via-[#123654] to-[#0d263b] text-white border border-amber-400/50 shadow-2xl backdrop-blur-md p-3 sm:px-5 sm:py-3.5 transition-all duration-300 hover:scale-[1.02] hover:border-amber-300 ${
            count > 0 ? "ring-2 ring-amber-400/40" : "opacity-90"
          }`}
          style={{
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Left Tag: Tab Handle */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                <Gamepad2 size={16} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
                    YOUR VAULT · BỘ SƯU TẬP
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/30">
                    {count} GAME
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-300 hidden sm:block">
                  {count === 0 ? "Bấm dấu (+) trên các hộp game để gom vào bộ sưu tập" : "Sẵn sàng tải trọn bộ cài đặt"}
                </p>
              </div>
            </div>

            {/* Right Meta or Action */}
            {count === 0 ? (
              <span className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors">
                Xem Bộ Sưu Tập
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

                {/* Open Button */}
                <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1 shrink-0 shadow-md">
                  <span>Mở Vault</span>
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
                  <Gamepad2 size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif uppercase tracking-tight">
                    Bộ Sưu Tập Game Của Bạn ({count} Tựa Game)
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Kho game offline &amp; Bluetooth đối kháng — Tải về cài đặt chơi ngay
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
                  <div className="text-4xl">🎮</div>
                  <h4 className="text-sm font-bold text-neutral-300">
                    Bộ sưu tập game của bạn đang trống
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Hãy nhấp vào biểu tượng dấu cộng (+) trên các hộp game để chọn và tải trọn gói cùng lúc.
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
                            {p.devicePrefix} · {p.gameMode}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={p.downloadUrl || `/downloads/${p.slug}.apk`}
                          download
                          className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                          title={`Tải file cài đặt .APK cho ${p.name}`}
                        >
                          <Download size={13} />
                          <span>Tải APK</span>
                        </a>
                        <button
                          onClick={() => onRemoveFromStack(p.slug)}
                          className="p-1 rounded text-neutral-400 hover:text-red-400 transition-colors ml-1"
                          title="Bỏ khỏi bộ sưu tập"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Action */}
            {count > 0 && (
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => {
                      setIsOpenModal(false);
                      setIsMissionModalOpen(true);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Gift size={16} />
                    <span>Nhiệm Vụ Nhận Thêm Mạng &amp; Vật Phẩm</span>
                  </button>

                  <button
                    onClick={() => setIsOpenModal(false)}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Gamepad2 size={16} className="text-amber-300" />
                    <span>Chọn Thêm Game Trên Kệ</span>
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
        targetFeature="Gói quà tặng hồi sinh 10 mạng & mở khóa tất cả bàn cờ VIP"
      />
    </>
  );
}
