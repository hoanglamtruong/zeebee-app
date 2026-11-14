"use client";

import React from "react";
import { Plus, Check, Eye } from "lucide-react";
import { Product, getProductTheme } from "@/lib/catalog";
import GameCoverArt from "./GameCoverArt";

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
      {/* 3D Standing Game Cartridge / Box */}
      <div
        onClick={() => onOpenQuickView(product)}
        className="relative w-[140px] sm:w-[160px] md:w-[170px] h-[210px] sm:h-[240px] md:h-[255px] cursor-pointer rounded-r-lg transition-all duration-300 ease-out transform group-hover:-translate-y-3 group-hover:scale-105 group-hover:rotate-[-1.5deg] select-none"
        style={{
          perspective: "1000px",
          filter: `drop-shadow(0 15px 18px rgba(0,0,0,0.5)) drop-shadow(0 0 0px ${theme.glowColor || 'rgba(234,189,23,0)'})`,
        }}
      >
        {/* Game Box Container with 3D Bevel & Custom Cover Art */}
        <div
          className="relative w-full h-full rounded-r-lg overflow-hidden flex flex-col justify-between text-left border-t border-r border-b transition-all duration-300"
          style={{
            background: theme.coverGradient || theme.spineColor,
            borderColor: "rgba(255,255,255,0.22)",
            boxShadow: `
              inset 4px 0 8px rgba(0, 0, 0, 0.45),
              inset 8px 0 4px rgba(255, 255, 255, 0.1),
              inset -2px 0 6px rgba(0, 0, 0, 0.35),
              0 0 20px ${theme.glowColor || 'transparent'}
            `,
          }}
        >
          {/* Custom Stylized Game Cover Illustration & Typography */}
          <GameCoverArt product={product} />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-30 backdrop-blur-[1px]">
            <span className="px-3 py-1.5 rounded-full bg-white/95 text-neutral-950 text-[10px] font-black tracking-wide flex items-center gap-1.5 shadow-xl">
              <Eye size={13} className="text-amber-500" /> Xem Chi Tiết
            </span>
          </div>
        </div>

        {/* The Iconic Floating Round Action Button (+) */}
        <button
          onClick={(e) => onToggleStack(product, e)}
          title={isInStack ? "Đã có trong bộ sưu tập (Bấm để bỏ)" : "Thêm vào bộ sưu tập (Your Vault)"}
          className={`absolute -bottom-2 -right-2 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer ${
            isInStack
              ? "bg-amber-400 text-neutral-950 scale-105 ring-2 ring-amber-300"
              : "bg-white text-neutral-900 hover:scale-115 hover:bg-amber-300 shadow-md"
          }`}
        >
          {isInStack ? <Check size={16} strokeWidth={3} /> : <Plus size={18} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Box Foot Drop Shadow on Wood Plank */}
      <div
        className="w-[125px] sm:w-[145px] h-3 rounded-[100%] bg-black/60 blur-[3px] mt-1 transition-all duration-300 group-hover:scale-90 group-hover:opacity-40"
      />

      {/* Game Mode Stamped on the Shelf Rim */}
      <div className="mt-1 text-center select-none flex flex-col items-center">
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-amber-300 group-hover:text-amber-200 transition-colors">
          {product.gameMode}
        </span>
        <span className="text-[9px] text-neutral-400 font-mono hidden sm:inline opacity-80">
          {product.playerCount}
        </span>
      </div>
    </div>
  );
}
