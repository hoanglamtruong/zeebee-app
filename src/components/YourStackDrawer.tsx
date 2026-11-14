"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Download,
  Key,
  Trash2,
  X,
  ChevronUp,
  CheckCircle2,
  PackageCheck,
  ArrowRight,
} from "lucide-react";
import { Product, getProductTheme, formatVnd } from "@/lib/catalog";

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

  const count = stack.length;
  const rawTotal = stack.reduce((sum, p) => sum + p.price, 0);

  // Discount rule based on stack size:
  // 1-2 items: 0%
  // 3-4 items: 20%
  // 5-9 items: 35%
  // 10-15 items: 40% (Master Bundle)
  let discountPercent = 0;
  if (count >= 10) discountPercent = 40;
  else if (count >= 5) discountPercent = 35;
  else if (count >= 3) discountPercent = 20;

  const finalTotal = Math.round(rawTotal * (1 - discountPercent / 100));
  const savings = rawTotal - finalTotal;

  return (
    <>
      {/* Floating Sticky Bottom Drawer Pill (Modeled after Leafbound's 'YOUR STACK') */}
      <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <div
          onClick={() => setIsOpenModal(true)}
          className="pointer-events-auto cursor-pointer flex flex-col items-center group transition-all duration-300 hover:-translate-y-1"
        >
          {/* Tab Pill Handle */}
          <div className="bg-[#12314d] text-amber-300 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-t-lg border-t border-x border-amber-400/30 flex items-center gap-1.5 shadow-sm">
            <Layers size={11} />
            <span>NGĂN KÉO CỦA BẠN · YOUR STACK</span>
            {count > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">
                {count}
              </span>
            )}
          </div>

          {/* Main Floating Pill Body */}
          <div className="bg-[#091b2c]/95 text-white backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-2xl border border-[rgba(234,189,23,0.35)] shadow-2xl flex items-center gap-3 sm:gap-5 min-w-[290px] sm:min-w-[420px] justify-between">
            {count === 0 ? (
              <>
                <div className="text-left">
                  <div className="text-xs font-medium text-neutral-300">
                    Ngăn kéo đang trống
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Chạm dấu <span className="font-bold text-amber-400">+</span> trên bất kỳ sản phẩm nào để tạo combo
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors">
                  Xem Hướng Dẫn
                </span>
              </>
            ) : (
              <>
                {/* Mini Stack Thumbnails */}
                <div className="flex items-center gap-1 overflow-hidden max-w-[130px] sm:max-w-[200px]">
                  {stack.slice(0, 5).map((p) => {
                    const theme = getProductTheme(p);
                    return (
                      <div
                        key={p.slug}
                        title={p.name}
                        className="w-5 h-8 rounded-sm shrink-0 border border-white/20 flex flex-col justify-between p-0.5"
                        style={{ backgroundColor: theme.spineColor }}
                      >
                        <span className="text-[7px] text-center leading-none">{theme.symbol}</span>
                      </div>
                    );
                  })}
                  {count > 5 && (
                    <span className="text-[10px] font-mono text-neutral-400 ml-1">
                      +{count - 5}
                    </span>
                  )}
                </div>

                {/* Price & Savings Meta */}
                <div className="text-right">
                  <div className="text-xs sm:text-sm font-black font-mono text-[var(--zb-gold)]">
                    {formatVnd(finalTotal)}
                  </div>
                  {discountPercent > 0 ? (
                    <div className="text-[9px] text-emerald-400 font-bold">
                      Giảm {discountPercent}% (-{formatVnd(savings)})
                    </div>
                  ) : (
                    <div className="text-[9px] text-neutral-400">
                      Chọn thêm {3 - count} món để giảm 20%
                    </div>
                  )}
                </div>

                {/* Open Button */}
                <span className="px-3 py-1.5 rounded-xl bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] font-bold text-xs flex items-center gap-1 shrink-0 shadow-md">
                  <span>Mở Ngăn Kéo</span>
                  <ChevronUp size={13} />
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Full Stack Modal When Clicked */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-[#0d2235] text-white rounded-2xl border border-[rgba(234,189,23,0.35)] shadow-2xl p-6 sm:p-8 flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <PackageCheck size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-serif">Ngăn Kéo Sản Phẩm (Your Stack)</h3>
                  <p className="text-xs text-neutral-400">
                    {count === 0
                      ? "Chưa chọn ứng dụng nào"
                      : `Đang có ${count} ứng dụng Android APK trong gói của bạn`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {count > 0 && (
                  <button
                    onClick={onClearStack}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Xóa toàn bộ ngăn kéo"
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">Xóa hết</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content: List of Selected Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-2.5">
              {count === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="text-3xl">📭</div>
                  <h4 className="font-bold text-base text-neutral-300">
                    Ngăn kéo của bạn hiện đang trống
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Hãy lướt qua các tầng kệ sách và chạm vào dấu <span className="text-amber-400 font-bold">+</span> trên sản phẩm bạn yêu thích để gom thành bộ tải về trọn gói.
                  </p>
                  <button
                    onClick={() => setIsOpenModal(false)}
                    className="mt-2 px-5 py-2 rounded-xl bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] font-bold text-xs"
                  >
                    Quay lại chọn sản phẩm
                  </button>
                </div>
              ) : (
                stack.map((p) => {
                  const theme = getProductTheme(p);
                  return (
                    <div
                      key={p.slug}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-10 rounded-sm shrink-0 flex items-center justify-center text-xs shadow-sm border border-white/20"
                          style={{ backgroundColor: theme.spineColor }}
                        >
                          {theme.symbol}
                        </div>
                        <div>
                          <h4
                            onClick={() => {
                              setIsOpenModal(false);
                              onSelectProduct(p);
                            }}
                            className="font-bold text-xs sm:text-sm hover:text-amber-300 cursor-pointer line-clamp-1"
                          >
                            {p.name}
                          </h4>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {p.devicePrefix} · {p.format}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-mono font-bold text-xs sm:text-sm text-amber-300">
                            {formatVnd(p.price)}
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
                {/* Discount Milestones Notice */}
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Tổng tiền niêm yết ({count} món):</span>
                    <span className="font-mono text-neutral-300">{formatVnd(rawTotal)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Ưu đãi Combo ({discountPercent}%):</span>
                      <span className="font-mono">-{formatVnd(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-[var(--zb-gold)] pt-1 border-t border-white/10">
                    <span>Tổng thanh toán gói:</span>
                    <span className="font-mono">{formatVnd(finalTotal)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="/downloads/Zeebee_Master_Bundle_15in1_APK.zip"
                    download
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Download size={16} className="text-amber-400" />
                    <span>Tải Gói Nén Master .ZIP ({count} APK)</span>
                  </a>

                  <Link
                    href={`/mua-key?combo=${stack.map((p) => p.slug).join(",")}`}
                    className="flex-1 px-4 py-3 rounded-xl bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] hover:bg-[var(--zb-gold-light)] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Key size={16} />
                    <span>Mua Key Kích Hoạt Combo</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
