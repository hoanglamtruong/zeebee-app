"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Key, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, HelpCircle, Gift, Gamepad2, Users, Radio } from "lucide-react";
import type { Product } from "@/lib/catalog";
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

  return (
    <div className="space-y-4">
      {/* Box Thông Tin Gameplay */}
      <div className="zb-card p-5 space-y-3 bg-[#0d3452] border border-amber-400/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">
            Chế độ chơi:
          </span>
          <span className="text-base font-black text-amber-300">
            {product.gameMode}
          </span>
        </div>

        <div className="text-xs space-y-1.5 text-neutral-300 pt-1 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Số lượng người:</span>
            <span className="text-cyan-300 font-bold">{product.playerCount}</span>
          </div>
          <p className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Radio size={14} /> Kết nối Bluetooth ngang hàng 2 máy (P2P)
          </p>
          <p className="flex items-center gap-1.5 text-neutral-400">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Chơi 100% Offline không tốn data mạng</span>
          </p>
        </div>
      </div>

      {/* Hành động 1: Tải về APK */}
      <div className="zb-card p-5 space-y-3 bg-gradient-to-br from-amber-950/30 to-orange-950/30 border border-amber-400/30 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wide">
          <Sparkles size={15} /> Bước 1: Tải cài đặt (File APK)
        </div>

        <button
          onClick={handleDownloadTrial}
          disabled={downloading}
          className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
        >
          {downloading ? (
            "Đang chuẩn bị file tải..."
          ) : (
            <>
              <Download size={18} /> Tải Cài Đặt Game .APK
            </>
          )}
        </button>

        <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
          <span>* File cài đặt .APK chuẩn Android (&lt;25KB)</span>
          {product.zipUrl && (
            <a
              href={product.zipUrl}
              download
              className="text-amber-300 hover:underline flex items-center gap-1 font-medium"
            >
              <Download size={12} /> Tải file nén .ZIP
            </a>
          )}
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-amber-400/20 border border-amber-400/40 text-xs text-amber-200 space-y-1.5 animate-fadeIn">
            <p className="font-bold flex items-center gap-1.5 text-amber-300">
              <CheckCircle2 size={15} /> Đã kích hoạt tải file cài đặt .APK!
            </p>
            <p className="text-[11px] leading-relaxed">
              Mở file .apk vừa tải về trên điện thoại Android để cài đặt ngay.
            </p>
          </div>
        )}
      </div>

      {/* Hành động 2: Nhận thêm mạng / Mở khóa màn */}
      <div className="zb-card p-5 space-y-3 bg-gradient-to-br from-[#12406a] to-[#0a273f] border border-amber-400/40 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wide">
          <Gift size={15} /> Bước 2: Hồi sinh &amp; Mở khóa màn chơi
        </div>
        <p className="text-xs text-neutral-300 opacity-90 leading-relaxed">
          Hết mạng hoặc gặp màn khó? Ghé thăm đối tác tài trợ 5 giây để nhận thêm 5 lượt và mở màn chơi tiếp theo:
        </p>

        <button
          onClick={() => setIsMissionOpen(true)}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Gift size={16} />
          <span>🎁 Nhiệm Vụ: Nhận Mạng &amp; Qua Màn</span>
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
          product.proUnlockMission?.reward || "Hồi sinh 5 mạng & Mở khóa qua màn khó"
        }
      />
    </div>
  );
}
