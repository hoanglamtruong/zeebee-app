"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Key, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, HelpCircle, Gift } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatVnd } from "@/lib/catalog";
import AdBanner from "./AdBanner";
import AffiliateMissionModal from "./AffiliateMissionModal";

export default function ProductPurchaseBox({ product }: { product: Product }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  async function handleDownloadTrial() {
    setDownloading(true);
    try {
      fetch("/api/trials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug }),
      }).catch(() => {});

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

  const isGame = product.category === "games";

  return (
    <div className="space-y-4">
      {/* Box Giá & Quyền lợi */}
      <div className="zb-card p-5 space-y-3 bg-[#0d3452] border border-emerald-500/30">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-[var(--zb-muted)]">
            Giá cài đặt &amp; sử dụng:
          </span>
          <span className="text-2xl font-black text-emerald-400">
            0đ · MIỄN PHÍ
          </span>
        </div>

        <div className="text-xs space-y-1.5 text-[var(--zb-off-white)] pt-1 border-t border-white/10">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Giá trị niêm yết:</span>
            <span className="line-through">{formatVnd(product.originalPrice || 59000)}</span>
          </div>
          <p className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <CheckCircle2 size={14} /> Hoạt động 100% offline vĩnh viễn không thu phí
          </p>
          <p className="flex items-center gap-1.5 text-[var(--zb-muted)]">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Dữ liệu lưu cục bộ trên máy · Không quảng cáo phiền toái</span>
          </p>
        </div>
      </div>

      {/* Hành động 1: Tải về APK Miễn Phí */}
      <div className="zb-card p-5 space-y-3 bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-500/30 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wide">
          <Sparkles size={15} /> Bước 1: Cài đặt và sử dụng (File APK)
        </div>

        <button
          onClick={handleDownloadTrial}
          disabled={downloading}
          className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
        >
          {downloading ? (
            "Đang chuẩn bị file tải..."
          ) : (
            <>
              <Download size={18} /> Cài Đặt APK Miễn Phí (0đ)
            </>
          )}
        </button>

        <div className="flex items-center justify-between text-[11px] text-[var(--zb-muted)] pt-1">
          <span>* File cài đặt .APK chuẩn Android (&lt;25KB)</span>
          {product.zipUrl && (
            <a
              href={product.zipUrl}
              download
              className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Download size={12} /> Tải file nén .ZIP
            </a>
          )}
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-200 space-y-1.5 animate-fadeIn">
            <p className="font-bold flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 size={15} /> Đã kích hoạt tải file cài đặt .APK!
            </p>
            <p className="text-[11px] leading-relaxed">
              Mở file .apk vừa tải về trên điện thoại Android để cài đặt ngay.
            </p>
          </div>
        )}
      </div>

      {/* Hành động 2: Mở khóa PRO hoặc Qua màn game bằng Nhiệm Vụ */}
      <div className="zb-card p-5 space-y-3 bg-gradient-to-br from-[#12406a] to-[#0a273f] border border-amber-400/40 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wide">
          <Gift size={15} /> Bước 2: {isGame ? "Hồi sinh & Qua màn game" : "Mở khóa tính năng PRO vĩnh viễn"}
        </div>
        <p className="text-xs text-[var(--zb-off-white)] opacity-90 leading-relaxed">
          {isGame
            ? "Hết mạng hoặc gặp màn khó? Làm nhiệm vụ đối tác 5 giây để nhận thêm 5 lượt và qua màn tức thì:"
            : "Cần xuất báo cáo PDF có logo hoặc sao lưu nâng cao? Nhấp 1 link tài trợ đối tác để nhận key PRO:"}
        </p>

        <button
          onClick={() => setIsMissionOpen(true)}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Gift size={16} />
          <span>
            {isGame
              ? "🎁 Làm Nhiệm Vụ: Qua Màn / Hồi Sinh Ngay"
              : "🎁 Làm Nhiệm Vụ: Nhận Mã PRO Key (0đ)"}
          </span>
        </button>
      </div>

      {/* Sponsored Ad Banner */}
      <AdBanner variant="modal" />

      {/* Affiliate Mission Modal */}
      <AffiliateMissionModal
        isOpen={isMissionOpen}
        onClose={() => setIsMissionOpen(false)}
        product={product}
        targetFeature={
          isGame
            ? "Hồi sinh 5 mạng & Mở khóa qua màn khó"
            : product.proUnlockMission?.reward || "Mở khóa toàn bộ tính năng PRO trọn đời"
        }
      />
    </div>
  );
}
