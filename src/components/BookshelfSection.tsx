"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Bookmark,
  Layers,
  HardHat,
  Briefcase,
  Gamepad2,
  Info,
} from "lucide-react";
import { PRODUCTS, Product, CATEGORY_TABS, formatVnd } from "@/lib/catalog";
import BookCard from "./BookCard";
import BookDetailModal from "./BookDetailModal";
import YourStackDrawer from "./YourStackDrawer";

interface ShelfTier {
  id: string;
  title: string;
  category: "pro-tools" | "business" | "games";
  subtitle: string;
  icon: string;
  badge: string;
}

const SHELF_TIERS: ShelfTier[] = [
  {
    id: "pro-tools",
    category: "pro-tools",
    title: "Kỹ Thuật & Xây Dựng",
    subtitle: "Công cụ tính toán công trường, bóc tách bê tông, in 3D, điện & hoàn thiện",
    icon: "📐",
    badge: "5 Ứng Dụng",
  },
  {
    id: "business",
    category: "business",
    title: "Quản Lý Bán Hàng & Dịch Vụ",
    subtitle: "Sổ kho mini, báo giá hóa đơn, định giá lợi nhuận, sổ đo tiệm may & thù lao",
    icon: "💼",
    badge: "5 Ứng Dụng",
  },
  {
    id: "games",
    category: "games",
    title: "Mini Game Đối Kháng Bluetooth & Cục Bộ",
    subtitle: "Cờ caro, đấu tàu chiến, oẳn tù tì, đố vui trí tuệ & party pack 2 người",
    icon: "🎮",
    badge: "5 Tựa Game",
  },
];

export default function BookshelfSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<Product | null>(null);
  const [stack, setStack] = useState<Product[]>([]);

  // Toggle in stack
  const handleToggleStack = (p: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setStack((prev) => {
      const exists = prev.some((item) => item.slug === p.slug);
      if (exists) {
        return prev.filter((item) => item.slug !== p.slug);
      } else {
        return [...prev, p];
      }
    });
  };

  const handleRemoveFromStack = (slug: string) => {
    setStack((prev) => prev.filter((p) => p.slug !== slug));
  };

  const handleClearStack = () => {
    setStack([]);
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.format.toLowerCase().includes(q) ||
        (p.devicePrefix && p.devicePrefix.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="san-pham" className="relative py-12 scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading & Search Control Bar (Leafbound Inspired) */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono font-bold text-amber-300">
            <Bookmark size={13} />
            <span>KỆ PHẦN MỀM CỤC BỘ · OFFLINE-FIRST VAULT 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-serif uppercase">
            Tủ Trưng Bày Ứng Dụng &amp; Game Android APK
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto opacity-90 leading-relaxed font-sans">
            Mỗi sản phẩm là một bản quyền vĩnh viễn độc lập — Tải về chạy trực tiếp 100% offline — Không phụ thuộc máy chủ, không thu phí thuê bao.
          </p>

          {/* Boutique Search & Filter Bar */}
          <div className="max-w-2xl mx-auto pt-4 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên ứng dụng, công cụ, hoặc game trên kệ..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#091b2c] border border-white/15 text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-white"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Quick Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto shrink-0 pb-1 sm:pb-0 no-scrollbar">
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] shadow-md shadow-amber-500/20"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {tab.label.replace("Tất cả Mini App APK", "Tất Cả Kệ").replace("Công cụ ", "").replace("Quản lý ", "")}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The Bookshelf Presentation (Từng Tầng Kệ Sách) */}
        <div className="space-y-16">
          {SHELF_TIERS.map((tier) => {
            const tierProducts = filteredProducts.filter(
              (p) => p.category === tier.category
            );

            if (tierProducts.length === 0) return null;

            return (
              <div key={tier.id} className="relative">
                {/* Elegant Centered Brass / Wood Plaque (Shelf Header) */}
                <div className="flex justify-center mb-6">
                  <div className="relative inline-flex flex-col items-center px-6 py-2 rounded-xl bg-gradient-to-b from-[#1a3854] to-[#0c2032] border border-amber-400/40 shadow-lg">
                    {/* Corner Brass Screws Simulation */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-300/40" />
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-300/40" />
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-300/40" />
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-300/40" />

                    <div className="flex items-center gap-2">
                      <span className="text-base">{tier.icon}</span>
                      <h3 className="text-sm sm:text-base font-black font-serif uppercase tracking-wider text-amber-300">
                        {tier.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                        {tierProducts.length} SP
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 hidden sm:block">
                      {tier.subtitle}
                    </span>
                  </div>
                </div>

                {/* Shelf Bay: The Books Standing Side-by-Side */}
                <div className="relative px-2 sm:px-6">
                  {/* Standing Books Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-3 sm:gap-x-4 md:gap-x-6 justify-items-center items-end pb-1">
                    {tierProducts.map((product) => {
                      const isInStack = stack.some((s) => s.slug === product.slug);
                      return (
                        <BookCard
                          key={product.slug}
                          product={product}
                          isInStack={isInStack}
                          onToggleStack={handleToggleStack}
                          onOpenQuickView={(p) => setSelectedBook(p)}
                        />
                      );
                    })}
                  </div>

                  {/* 3D Physical Wooden Shelf Plank */}
                  <div className="relative w-full mt-0">
                    {/* Top Surface of the Shelf Plank (Highlight & Surface Depth) */}
                    <div
                      className="w-full h-3 rounded-t-sm"
                      style={{
                        background:
                          "linear-gradient(to bottom, #7c4d29 0%, #523117 100%)",
                        boxShadow:
                          "inset 0 1px 1px rgba(255,255,255,0.35), 0 -2px 4px rgba(0,0,0,0.5)",
                      }}
                    />

                    {/* Front Beveled Lip of the Shelf (With Wood Grain & Brass Trim) */}
                    <div
                      className="w-full h-6 sm:h-7 rounded-b-sm flex items-center justify-between px-4 border-t border-amber-500/20"
                      style={{
                        background:
                          "linear-gradient(to bottom, #42250f 0%, #2a1608 100%)",
                        boxShadow:
                          "0 15px 25px -5px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.15)",
                      }}
                    >
                      <div className="text-[9px] font-mono text-amber-400/40 tracking-widest hidden sm:block">
                        ZEEBEE SHELF REF. {tier.id.toUpperCase()}
                      </div>
                      <div className="text-[9px] font-mono text-amber-400/40 tracking-widest hidden sm:block">
                        OFFLINE-FIRST 2026
                      </div>
                    </div>

                    {/* Deep Shelf Under-Shadow casting onto the wall behind */}
                    <div className="w-full h-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-black/20 rounded-2xl border border-white/5">
              <div className="text-3xl">🔍</div>
              <h3 className="font-bold text-lg text-white">Không tìm thấy ứng dụng phù hợp</h3>
              <p className="text-xs text-neutral-400">
                Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc danh mục.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] text-xs font-bold"
              >
                Xem Toàn Bộ 15 Ứng Dụng
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Book Detail / Unboxing Modal */}
      <BookDetailModal
        product={selectedBook}
        onClose={() => setSelectedBook(null)}
        isInStack={selectedBook ? stack.some((s) => s.slug === selectedBook.slug) : false}
        onToggleStack={handleToggleStack}
      />

      {/* Floating Sticky Bottom Drawer: "YOUR STACK" */}
      <YourStackDrawer
        stack={stack}
        onRemoveFromStack={handleRemoveFromStack}
        onClearStack={handleClearStack}
        onSelectProduct={(p) => setSelectedBook(p)}
      />
    </section>
  );
}
