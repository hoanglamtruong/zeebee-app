"use client";

import React from "react";
import Link from "next/link";
import { Plus, Check, Download, Play, Eye } from "lucide-react";
import { Product, getProductTheme, formatVnd } from "@/lib/catalog";

interface BookCardProps {
  product: Product;
  isInStack: boolean;
  onToggleStack: (product: Product, e: React.MouseEvent) => void;
  onOpenQuickView: (product: Product) => void;
}

export default function BookCard({
  product,
  isInStack,
  onToggleStack,
  onOpenQuickView,
}: BookCardProps) {
  const theme = getProductTheme(product);

  return (
    <div className="group relative flex flex-col items-center">
      {/* 3D Standing Book / Software Box */}
      <div
        onClick={() => onOpenQuickView(product)}
        className="relative w-[140px] sm:w-[160px] md:w-[170px] h-[210px] sm:h-[240px] md:h-[255px] cursor-pointer rounded-r-md transition-all duration-300 ease-out transform group-hover:-translate-y-2.5 group-hover:rotate-[-1.5deg] select-none"
        style={{
          perspective: "1000px",
          filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.45))",
        }}
      >
        {/* Book Container with 3D Spine and Cover Texture */}
        <div
          className="relative w-full h-full rounded-r-md overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 text-left border-t border-r border-b"
          style={{
            backgroundColor: theme.spineColor,
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow: `
              inset 4px 0 8px rgba(0, 0, 0, 0.45),
              inset 8px 0 4px rgba(255, 255, 255, 0.08),
              inset -2px 0 6px rgba(0, 0, 0, 0.3)
            `,
          }}
        >
          {/* Subtle Vintage Texture / Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                theme.pattern === "grid"
                  ? "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)"
                  : theme.pattern === "stripes"
                  ? "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)"
                  : theme.pattern === "diamonds"
                  ? "repeating-linear-gradient(135deg, transparent, transparent 12px, rgba(255,255,255,0.1) 12px, rgba(255,255,255,0.1) 24px)"
                  : "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent 60%)",
              backgroundSize: theme.pattern === "grid" ? "12px 12px" : "auto",
            }}
          />

          {/* Book Spine Edge Crease Shadow (Left Edge) */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />

          {/* Top Foil Header & Serial Tag */}
          <div className="relative z-10 flex items-center justify-between border-b pb-1.5" style={{ borderColor: `${theme.accentColor}33` }}>
            <span
              className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-bold"
              style={{ color: theme.accentColor }}
            >
              {theme.serialTag}
            </span>
            <span className="text-xs">{theme.symbol}</span>
          </div>

          {/* Book Title & Cover Emblem */}
          <div className="relative z-10 my-auto text-center space-y-2">
            {/* Elegant Circular / Diamond Emblem */}
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 mx-auto rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
              style={{
                borderColor: `${theme.accentColor}66`,
                backgroundColor: "rgba(0,0,0,0.25)",
                boxShadow: `0 0 12px ${theme.accentColor}22`,
              }}
            >
              <span className="text-base sm:text-lg">{theme.symbol}</span>
            </div>

            {/* Title */}
            <h3
              className="text-xs sm:text-sm font-black leading-snug tracking-tight px-1 line-clamp-3 font-serif"
              style={{ color: theme.textColor }}
            >
              {product.name.replace(/\([^)]*\)/g, "").trim()}
            </h3>
          </div>

          {/* Bottom Foil Stamp & Category */}
          <div className="relative z-10 pt-1.5 border-t flex items-center justify-between" style={{ borderColor: `${theme.accentColor}33` }}>
            <span
              className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                color: theme.accentColor,
              }}
            >
              100% FREE APK
            </span>
            <span className="text-[9px] font-mono opacity-70" style={{ color: theme.textColor }}>
              {product.devicePrefix}
            </span>
          </div>

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
            <span className="px-2.5 py-1 rounded-full bg-white/90 text-neutral-900 text-[10px] font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <Eye size={12} /> Xem chi tiết
            </span>
          </div>
        </div>

        {/* The Iconic Floating Round Action Button (+) exactly like Leafbound */}
        <button
          onClick={(e) => onToggleStack(product, e)}
          title={isInStack ? "Đã có trong ngăn kéo (Bấm để bỏ)" : "Thêm vào ngăn kéo tải trọn bộ (Your Stack)"}
          className={`absolute -bottom-2 -right-2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer ${
            isInStack
              ? "bg-emerald-500 text-white scale-105 ring-2 ring-emerald-300"
              : "bg-white text-neutral-900 hover:scale-115 hover:bg-amber-300 shadow-md"
          }`}
        >
          {isInStack ? <Check size={16} strokeWidth={3} /> : <Plus size={18} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Book Foot Drop Shadow on Wood Plank */}
      <div
        className="w-[125px] sm:w-[145px] h-3 rounded-[100%] bg-black/60 blur-[3px] mt-1 transition-all duration-300 group-hover:scale-90 group-hover:opacity-40"
      />

      {/* Price Engraving Stamped on the Shelf Rim */}
      <div className="mt-1 text-center select-none flex flex-col items-center gap-0.5">
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-emerald-400 group-hover:text-emerald-300 transition-colors flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          MIỄN PHÍ 0đ
        </span>
        <span className="text-[9px] text-amber-300/80 font-mono hidden sm:inline">
          {product.category === "games" ? "⭐ Qua màn tài trợ" : "⭐ Mở PRO qua NV"}
        </span>
      </div>
    </div>
  );
}
