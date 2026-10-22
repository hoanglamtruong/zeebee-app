"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Key, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, HelpCircle } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatVnd } from "@/lib/catalog";
import OrderForm from "./OrderForm";

export default function ProductPurchaseBox({ product }: { product: Product }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const soon = product.status === "coming_soon";

  async function handleDownloadTrial() {
    setDownloading(true);
    try {
      // 1. Ghi nh?n h? th?ng SQLite ?m th?m (KH?NG g?i Telegram)
      fetch("/api/trials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug }),
      }).catch(() => {});

      // 2. K?ch ho?t t?i file tr?c ti?p v? thi?t b? kh?ch
      const downloadFileUrl = product.downloadUrl || product.demoUrl || `/downloads/${product.slug}.zip`;
      const link = document.createElement("a");
      link.href = downloadFileUrl;
      link.download = "";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  }

  if (soon) {
    return (
      <div className="space-y-4">
        <div className="zb-card p-5 space-y-3 bg-[#0d3452]">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-[var(--zb-muted)]">
              Gi? ni?m y?t khi ra m?t:
            </span>
            <span className="text-2xl font-black text-[var(--zb-gold)]">
              {formatVnd(product.price)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-200">
            <span>Gi? ?u ??i ??t tr??c (-50%):</span>
            <strong className="text-sm font-bold text-[var(--zb-gold-light)]">
              {formatVnd(Math.round(product.price * 0.5))}
            </strong>
          </div>
        </div>

        <OrderForm
          productSlug={product.slug}
          comingSoon={true}
          priceLabel={formatVnd(product.price)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Box Gi? & Quy?n l?i */}
      <div className="zb-card p-5 space-y-3 bg-[#0d3452] border border-[rgba(234,189,23,0.3)]">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-[var(--zb-muted)]">
            Gi? b?n quy?n v?nh vi?n:
          </span>
          <span className="text-2xl font-black text-[var(--zb-gold)]">
            {formatVnd(product.price)}
          </span>
        </div>

        <div className="text-xs space-y-1.5 text-[var(--zb-off-white)] pt-1 border-t border-white/10">
          <p className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <CheckCircle2 size={14} /> D?ng th? 7 ng?y mi?n ph? ??y ?? t?nh n?ng
          </p>
          <p className="flex items-center gap-1.5 text-[var(--zb-muted)]">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>M? kh?a tr?n ??i ? Kh?ng c?n internet</span>
          </p>
        </div>
      </div>

      {/* H?nh ??ng 1: T?i v? d?ng th? 7 ng?y */}
      <div className="zb-card p-5 space-y-3 bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-500/30 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wide">
          <Sparkles size={15} /> B??c 1: Tr?i nghi?m th?c t?
        </div>

        <button
          onClick={handleDownloadTrial}
          disabled={downloading}
          className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
        >
          {downloading ? (
            "?ang chu?n b? file t?i..."
          ) : (
            <>
              <Download size={18} /> T?i V? D?ng Th? 7 Ng?y (Mi?n Ph?)
            </>
          )}
        </button>

        <p className="text-[11px] text-[var(--zb-muted)] text-center">
          * File ch?y tr?c ti?p tr?n thi?t b? c?a b?n. Kh?ng c?n ??ng k? t?i kho?n.
        </p>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-200 space-y-1.5 animate-in fade-in">
            <p className="font-bold flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 size={15} /> ?? k?ch ho?t t?i xu?ng!
            </p>
            <p className="text-[11px] leading-relaxed">
              B?n c? <strong>7 ng?y tr?i nghi?m kh?ng gi?i h?n</strong>. Sau 7 ng?y, m? ?ng d?ng l?y <strong>M? Thi?t B?</strong> ?? mua key m? kh?a v?nh vi?n.
            </p>
          </div>
        )}
      </div>

      {/* H?nh ??ng 2: Mua Key M? Kh?a */}
      <div className="zb-card p-5 space-y-3 bg-gradient-to-br from-[#12406a] to-[#0a273f] border border-[rgba(234,189,23,0.3)] shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wide">
          <Key size={15} /> B??c 2: K?ch ho?t v?nh vi?n
        </div>
        <p className="text-xs text-[var(--zb-off-white)] opacity-90 leading-relaxed">
          ?? c? m? thi?t b? t? ?ng d?ng ?? t?i? Mua key b?n quy?n ?? m? kh?a tr?n ??i ngay l?p t?c:
        </p>

        <Link
          href={`/mua-key?app=${encodeURIComponent(product.slug)}`}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[var(--zb-gold)] to-[var(--zb-orange)] text-[var(--zb-navy-dark)] hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Key size={16} /> Mua Key M? Kh?a ? {formatVnd(product.price)} <ArrowRight size={15} />
        </Link>
      </div>

      <div className="text-center pt-1">
        <a
          href="https://zalo.me/0976094453"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--zb-gold)] hover:underline"
        >
          <HelpCircle size={14} /> C?n t? v?n c?i ??t ho?c k?ch ho?t? Chat Zalo ngay
        </a>
      </div>
    </div>
  );
}
