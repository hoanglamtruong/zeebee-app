"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Gamepad2,
  FileSpreadsheet,
  QrCode,
  Sparkles,
  CheckCircle2,
  Download,
  ArrowRight,
  HardHat,
  Briefcase,
  HeartHandshake,
  Layers,
} from "lucide-react";
import {
  PRODUCTS,
  CATEGORY_TABS,
  formatVnd,
  type Product,
  type ProductCategory,
} from "@/lib/catalog";

function getCardIcon(p: Product) {
  if (p.slug === "zqr-offline") return QrCode;
  if (p.kind.includes("Game")) return Gamepad2;
  if (p.kind.includes("Excel")) return FileSpreadsheet;
  if (p.category === "pro-tools") return HardHat;
  if (p.category === "business") return Briefcase;
  if (p.category === "utility") return HeartHandshake;
  return Smartphone;
}

export default function ProductCatalogSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProducts =
    activeTab === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          if (activeTab === "excel") return p.kind.includes("Excel");
          return p.category === activeTab;
        });

  return (
    <section id="san-pham" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            Kho Sản Phẩm Số Độc Lập
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Sản Phẩm Tải Về Dùng Trọn Đời (Offline-First)
          </h2>
          <p className="text-sm text-[var(--zb-muted)] mt-1 max-w-2xl">
            Sở hữu vĩnh viễn với 1 lần trả phí — 100% không phát sinh thuê bao tháng — Chạy độc lập trên máy của bạn.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--zb-muted)] shrink-0">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>4 Có sẵn</span>
          <span className="mx-1">·</span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>13 Sắp ra mắt (Ưu đãi 50%)</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.id === "all"
              ? PRODUCTS.length
              : tab.id === "excel"
                ? PRODUCTS.filter((p) => p.kind.includes("Excel")).length
                : PRODUCTS.filter((p) => p.category === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] shadow-lg shadow-[rgba(234,189,23,0.2)]"
                  : "bg-[rgba(255,255,255,0.05)] text-[var(--zb-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.08)]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-[#0a2d47]/20 text-[#0a2d47]" : "bg-white/10 text-[var(--zb-muted)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Product Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((p) => {
          const Icon = getCardIcon(p);
          const soon = p.status === "coming_soon";

          return (
            <Link
              key={p.slug}
              href={`/san-pham/${p.slug}`}
              className="zb-card p-5 sm:p-6 flex flex-col justify-between gap-4 group hover:border-[var(--zb-gold)] transition-all hover:-translate-y-1 relative overflow-hidden bg-gradient-to-b from-[#12406a] to-[#0b2b46]"
            >
              {/* Top Meta */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(234,189,23,0.12)] text-[var(--zb-gold)] flex items-center justify-center border border-[rgba(234,189,23,0.25)] group-hover:bg-[var(--zb-gold)] group-hover:text-[var(--zb-navy-dark)] transition-colors">
                    <Icon size={20} />
                  </div>
                  {soon ? (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                      <Sparkles size={11} /> Sắp ra mắt · Ưu đãi 50%
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 size={11} /> Sẵn sàng tải ngay
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-medium text-[var(--zb-gold)] opacity-90 block mb-0.5">
                    {p.format}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[var(--zb-gold-light)] transition-colors leading-snug">
                    {p.name}
                  </h3>
                </div>

                <p className="text-xs text-[var(--zb-muted)] line-clamp-2 leading-relaxed">
                  {p.tagline}
                </p>
              </div>

              {/* Bottom Meta & Price */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[var(--zb-muted)] block">
                    {soon ? "Giá niêm yết khi ra mắt:" : "Giá mua trả 1 lần:"}
                  </span>
                  <div className="text-lg font-black text-[var(--zb-gold)]">
                    {formatVnd(p.price)}
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                    soon
                      ? "bg-amber-400/15 text-amber-200 border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-[var(--zb-navy-dark)]"
                      : "bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] group-hover:bg-[var(--zb-gold-light)] shadow-sm"
                  }`}
                >
                  {soon ? (
                    <>
                      Ưu đãi 50% <ArrowRight size={13} />
                    </>
                  ) : (
                    <>
                      Tải ngay <Download size={13} />
                    </>
                  )}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
