"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Sparkles, Megaphone, ArrowRight } from "lucide-react";

export type BannerVariant = "leaderboard" | "shelf" | "modal" | "inline";

interface AdBannerProps {
  variant?: BannerVariant;
  customTitle?: string;
  customSubtitle?: string;
  customCta?: string;
  customUrl?: string;
  sponsorName?: string;
  tag?: string;
  className?: string;
}

const DEFAULT_ADS = {
  leaderboard: {
    tag: "TÀI TRỢ GAMING",
    sponsorName: "Shopee Gaming Store",
    title: "Săn Deal Tay Cầm Chơi Game & Phụ Kiện Điện Thoại Bluetooth Giảm Đến 50%",
    subtitle: "Trải nghiệm chiến game đối kháng 2 người mượt mà",
    cta: "Xem Khuyến Mãi Ngay",
    url: "https://shopee.vn",
  },
  shelf: {
    tag: "ĐỐI TÁC THIẾT BỊ",
    sponsorName: "Tai Nghe & Gaming Gear",
    title: "Tai Nghe Không Dây Độ Trễ Thấp & Bàn Phím Cơ Bluetooth",
    subtitle: "Kết nối ổn định, âm thanh vòm sống động cho game thủ",
    cta: "Khám Phá Phụ Kiện",
    url: "https://shopee.vn",
  },
  modal: {
    tag: "NHÀ TÀI TRỢ GAME",
    sponsorName: "Cộng Đồng Gamer Mobile",
    title: "Khám Phá Phụ Kiện Nút Bấm Chơi Game & Quạt Tản Nhiệt",
    subtitle: "Ghé thăm gian hàng đối tác để nhận quà tặng trong game",
    cta: "Ghé Thăm Gian Hàng",
    url: "https://shopee.vn",
  },
  inline: {
    tag: "LIÊN HỆ QUẢNG CÁO",
    sponsorName: "Zeebee AdNetwork",
    title: "Đặt Banner Quảng Cáo Thương Hiệu Của Bạn Trên App.zeebee.vn",
    subtitle: "Tiếp cận trực tiếp cộng đồng game thủ và người dùng trẻ toàn quốc",
    cta: "Liên Hệ Zalo 0976.094.453",
    url: "https://zalo.me/0976094453",
  },
};

export default function AdBanner({
  variant = "leaderboard",
  customTitle,
  customSubtitle,
  customCta,
  customUrl,
  sponsorName,
  tag,
  className = "",
}: AdBannerProps) {
  const ad = DEFAULT_ADS[variant];
  const finalTitle = customTitle || ad.title;
  const finalSubtitle = customSubtitle || ad.subtitle;
  const finalCta = customCta || ad.cta;
  const finalUrl = customUrl || ad.url;
  const finalSponsor = sponsorName || ad.sponsorName;
  const finalTag = tag || ad.tag;

  if (variant === "shelf") {
    return (
      <div className={`my-8 max-w-5xl mx-auto px-4 ${className}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d2a45] via-[#10385c] to-[#0d2a45] border border-amber-400/30 p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Subtle glowing accents */}
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-start sm:items-center gap-3.5 z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
              <Megaphone size={22} />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {finalTag}
                </span>
                <span className="text-xs text-neutral-400 font-medium">Tài trợ bởi: <strong className="text-neutral-200">{finalSponsor}</strong></span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                {finalTitle}
              </h4>
              <p className="text-xs text-neutral-300 line-clamp-1 opacity-90">
                {finalSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 z-10 shrink-0 w-full sm:w-auto justify-end">
            <a
              href={finalUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>{finalCta}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div className={`rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/25 p-3.5 text-left relative overflow-hidden ${className}`}>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
            {finalTag} · {finalSponsor}
          </span>
          <span className="text-[10px] text-neutral-400 italic">Quảng cáo đối tác</span>
        </div>
        <p className="text-xs font-bold text-white mb-1 leading-snug">{finalTitle}</p>
        <p className="text-[11px] text-neutral-300 mb-2.5 leading-relaxed opacity-90">{finalSubtitle}</p>
        <a
          href={finalUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 transition-all"
        >
          <span>{finalCta}</span>
          <ExternalLink size={12} />
        </a>
      </div>
    );
  }

  // Default Leaderboard / Top Banner
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <div className="relative rounded-xl bg-gradient-to-r from-neutral-900/90 via-[#0b2438]/90 to-neutral-900/90 border border-amber-400/20 p-3 sm:p-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex w-9 h-9 rounded-lg bg-amber-400/15 border border-amber-400/30 items-center justify-center text-amber-300 shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {finalTag}
              </span>
              <span className="text-[11px] text-neutral-400">{finalSponsor}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              {finalTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={finalUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-all flex items-center gap-1.5 shadow"
          >
            <span>{finalCta}</span>
            <ExternalLink size={12} />
          </a>
          <a
            href="https://zalo.me/0976094453"
            target="_blank"
            rel="noopener noreferrer"
            title="Liên hệ đặt banner tài trợ trên App.zeebee.vn"
            className="text-[10px] text-neutral-400 hover:text-amber-300 underline hidden md:inline ml-2"
          >
            Đặt banner?
          </a>
        </div>
      </div>
    </div>
  );
}
