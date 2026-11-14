"use client";

import React, { useEffect } from "react";
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
} from "lucide-react";
import { Product, getProductTheme, formatVnd } from "@/lib/catalog";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0d2235] text-white rounded-2xl border border-[rgba(234,189,23,0.3)] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Left Side: 3D Hardcover Book Showcase & Specs */}
        <div
          className="w-full md:w-[320px] p-6 sm:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-white/10 shrink-0 relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, #091927 0%, ${theme.spineColor}33 100%)`,
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: theme.accentColor }}
          />

          {/* 3D Book Display */}
          <div
            className="relative w-[150px] sm:w-[170px] h-[225px] sm:h-[255px] rounded-r-md overflow-hidden flex flex-col justify-between p-4 my-2 shadow-2xl border-t border-r border-b"
            style={{
              backgroundColor: theme.spineColor,
              borderColor: "rgba(255,255,255,0.2)",
              boxShadow: `
                inset 6px 0 10px rgba(0, 0, 0, 0.5),
                inset 10px 0 5px rgba(255, 255, 255, 0.1),
                0 20px 30px rgba(0,0,0,0.6)
              `,
            }}
          >
            <div className="flex items-center justify-between border-b pb-1" style={{ borderColor: `${theme.accentColor}33` }}>
              <span className="text-[10px] font-mono font-bold" style={{ color: theme.accentColor }}>
                {theme.serialTag}
              </span>
              <span>{theme.symbol}</span>
            </div>

            <div className="my-auto text-center space-y-2">
              <div
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border"
                style={{
                  borderColor: `${theme.accentColor}66`,
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <span className="text-xl">{theme.symbol}</span>
              </div>
              <h3 className="text-sm font-black font-serif leading-snug px-1" style={{ color: theme.textColor }}>
                {product.name.replace(/\([^)]*\)/g, "").trim()}
              </h3>
            </div>

            <div className="pt-1.5 border-t flex items-center justify-between" style={{ borderColor: `${theme.accentColor}33` }}>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/40" style={{ color: theme.accentColor }}>
                OFFLINE APK
              </span>
              <span className="text-[10px] font-mono opacity-80" style={{ color: theme.textColor }}>
                {product.devicePrefix}
              </span>
            </div>
          </div>

          {/* Quick Technical Specs Badge */}
          <div className="w-full mt-4 space-y-2 text-xs bg-black/30 p-3 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-1.5">
                <HardDrive size={13} className="text-amber-400" /> Dung lượng:
              </span>
              <span className="font-mono font-bold text-white">&lt; 25 KB</span>
            </div>
            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" /> Dữ liệu:
              </span>
              <span className="font-bold text-emerald-400">100% Cục bộ</span>
            </div>
            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Cpu size={13} className="text-cyan-400" /> Bản quyền:
              </span>
              <span className="font-bold text-cyan-300">Vĩnh viễn</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Information & Action CTAs */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Header & Price */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[rgba(234,189,23,0.15)] text-[var(--zb-gold)] border border-[rgba(234,189,23,0.3)]">
                {product.format}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Dùng thử 7 ngày miễn phí
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-serif">
              {product.name}
            </h2>

            <p className="text-sm text-[var(--zb-gold-light)] font-medium italic">
              &ldquo;{product.tagline}&rdquo;
            </p>

            <div className="flex items-baseline gap-3 pt-2">
              <div className="text-2xl sm:text-3xl font-black text-[var(--zb-gold)] font-mono">
                {formatVnd(product.price)}
              </div>
              <span className="text-xs text-neutral-400">
                (Trả 1 lần · Sở hữu vĩnh viễn · 0 phí duy trì)
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Mô tả chi tiết giải pháp
            </h4>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed opacity-90">
              {product.description}
            </p>
          </div>

          {/* Core Feature Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Tính năng nổi bật
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              {product.features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-200">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs Button Group */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* Direct APK Download */}
              {product.downloadUrl && (
                <a
                  href={product.downloadUrl}
                  download
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] hover:bg-[var(--zb-gold-light)] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[rgba(234,189,23,0.2)]"
                >
                  <Download size={17} />
                  <span>Tải File .APK Cài Ngay</span>
                </a>
              )}

              {/* Web Demo Runner */}
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all flex items-center justify-center gap-2"
                >
                  <Play size={16} className="text-amber-400" />
                  <span>Chạy Thử Web Demo</span>
                </a>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* Toggle Stack Button */}
              <button
                onClick={(e) => onToggleStack(product, e)}
                className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                  isInStack
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                }`}
              >
                {isInStack ? <Check size={15} /> : <Plus size={15} />}
                <span>{isInStack ? "Đã trong ngăn kéo (Bấm để bỏ)" : "Thêm vào ngăn kéo Combo (Giảm 20-40%)"}</span>
              </button>

              {/* Buy Key Link */}
              <Link
                href={`/mua-key?sp=${product.slug}`}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-400/15 border border-amber-400/40 text-amber-300 hover:bg-amber-400/25 transition-all flex items-center justify-center gap-1.5"
              >
                <Key size={14} />
                <span>Mua Key Mở Khóa Vĩnh Viễn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
