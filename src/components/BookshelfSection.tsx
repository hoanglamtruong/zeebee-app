"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Sparkles,
  Bookmark,
  Gamepad2,
  Gift,
  Swords,
  Users,
  Puzzle,
} from "lucide-react";
import { PRODUCTS, Product, CATEGORY_TABS } from "@/lib/catalog";
import BookCard from "./BookCard";
import BookDetailModal from "./BookDetailModal";
import YourStackDrawer from "./YourStackDrawer";
import AdBanner from "./AdBanner";
import AffiliateMissionModal from "./AffiliateMissionModal";

interface ShelfTier {
  id: string;
  title: string;
  category: "bluetooth-pvp" | "coop-arcade" | "puzzle-board";
  subtitle: string;
  icon: string;
  badge: string;
}

const SHELF_TIERS: ShelfTier[] = [
  {
    id: "bluetooth-pvp",
    category: "bluetooth-pvp",
    title: "Đối Kháng 2 Người: 1 Máy & Phòng Online (PvP)",
    subtitle: "Chơi chung 1 màn hình điện thoại hoặc tạo Phòng Online 4 số / Quét QR: Cờ Caro, Hải Chiến, Oẳn Tù Tì, Đố Vui & Party Pack",
    icon: "⚔️",
    badge: "5 Tựa Game",
  },
  {
    id: "coop-arcade",
    category: "coop-arcade",
    title: "Hợp Tác Chiến Thuật & Arcade Co-op",
    subtitle: "Cùng bạn bè hợp lực vượt ải 60FPS: Bóng Bàn Pong, Mê Cung Co-op, Thủ Thành, Đặt Bom & Bắn Thiên Thạch",
    icon: "🎮",
    badge: "5 Tựa Game",
  },
  {
    id: "puzzle-board",
    category: "puzzle-board",
    title: "Game Boardgame & Trí Tuệ Cổ Điển",
    subtitle: "Thư giãn đấu trí rèn luyện trí não (1-4 Người & AI): Cờ Cá Ngựa, Xếp Hình Gỗ, Nối Thú Onet, Cờ Tào Cáo & Lật Hình",
    icon: "🧩",
    badge: "5 Tựa Game",
  },
];

export default function BookshelfSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<Product | null>(null);
  const [stack, setStack] = useState<Product[]>([]);
  const [isOfferwallOpen, setIsOfferwallOpen] = useState(false);

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
        p.gameMode.toLowerCase().includes(q) ||
        (p.devicePrefix && p.devicePrefix.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="san-pham" className="relative py-12 scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading & Search Control Bar */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-xs font-mono font-bold text-amber-300">
            <Gamepad2 size={14} />
            <span>KHO GAME PWA ĐA NỀN TẢNG · CHƠI NGAY &amp; OFFLINE VAULT 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-serif uppercase">
            Tủ Trưng Bày Game Đối Kháng &amp; Boardgame
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto opacity-90 leading-relaxed font-sans">
            Mỗi tựa game mở lên chơi ngay lập tức trên Android, iPhone &amp; Máy tính — Đấu 2 người chung 1 máy, vào Phòng Online 4 số hoặc lưu PWA chơi Offline mọi lúc mọi nơi.
          </p>

          {/* Quick Mission Trigger Button */}
          <div className="pt-1">
            <button
              onClick={() => setIsOfferwallOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold hover:bg-amber-400/30 transition-all shadow cursor-pointer"
            >
              <Gift size={15} />
              <span>🎁 Bảng Nhiệm Vụ: Nhận Thêm Mạng Chơi &amp; Mở Khóa Màn Kế Tiếp</span>
            </button>
          </div>

          {/* Boutique Search & Filter Bar */}
          <div className="max-w-2xl mx-auto pt-2 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tựa game, thể loại, hoặc chế độ chơi trên kệ..."
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
                        ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The Bookshelf Presentation (Từng Tầng Kệ Hộp Game) */}
        <div className="space-y-14">
          {SHELF_TIERS.map((tier, index) => {
            const tierProducts = filteredProducts.filter(
              (p) => p.category === tier.category
            );

            if (tierProducts.length === 0) return null;

            return (
              <React.Fragment key={tier.id}>
                <div className="relative">
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
                          {tierProducts.length} GAME
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 hidden sm:block">
                        {tier.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Shelf Bay: The Games Standing Side-by-Side */}
                  <div className="relative px-2 sm:px-6">
                    {/* Standing Game Cartridges Grid */}
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
                          ZEEBEE GAME SHELF · {tier.id.toUpperCase()}
                        </div>
                        <div className="text-[9px] font-mono text-amber-300/70 tracking-widest hidden sm:block font-bold">
                          BLUETOOTH CLASSIC &amp; OFFLINE 2026
                        </div>
                      </div>

                      {/* Deep Shelf Under-Shadow */}
                      <div className="w-full h-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* In-Between Shelves Sponsored Placement */}
                {index === 0 && (
                  <AdBanner
                    variant="shelf"
                    tag="TÀI TRỢ GAMING"
                    sponsorName="Shopee Gaming Store"
                    customTitle="Săn Deal Tay Cầm Chơi Game & Phụ Kiện Điện Thoại Bluetooth Giảm Đến 50%"
                    customSubtitle="Nâng tầm trải nghiệm chiến game đối kháng 2 người mượt mà"
                    customCta="Khám Phá Phụ Kiện Game"
                    customUrl="https://shopee.vn"
                  />
                )}
              </React.Fragment>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-black/20 rounded-2xl border border-white/5">
              <div className="text-3xl">🎮</div>
              <h3 className="font-bold text-lg text-white">Không tìm thấy tựa game phù hợp</h3>
              <p className="text-xs text-neutral-400">
                Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc danh mục.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold"
              >
                Xem Toàn Bộ 15 Tựa Game
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

      {/* Standalone Offerwall Modal */}
      <AffiliateMissionModal
        isOpen={isOfferwallOpen}
        onClose={() => setIsOfferwallOpen(false)}
        targetFeature="Nhận 5 mạng hồi sinh & Mở khóa qua màn khó"
      />

      {/* Floating Sticky Bottom Drawer: "YOUR VAULT" */}
      <YourStackDrawer
        stack={stack}
        onRemoveFromStack={handleRemoveFromStack}
        onClearStack={handleClearStack}
        onSelectProduct={(p) => setSelectedBook(p)}
      />
    </section>
  );
}
