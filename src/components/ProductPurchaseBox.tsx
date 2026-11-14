"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Key, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, HelpCircle, Gift, Gamepad2, Users, Radio, Clock } from "lucide-react";
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

      {/* Trạng thái game: Placeholder / Đang build lại */}
      <div className="zb-card p-5 space-y-3 bg-gradient-to-br from-amber-950/30 to-neutral-900 border border-amber-400/30 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wide">
          <Sparkles size={15} /> Trạng Thái Game (Placeholder)
        </div>

        <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-neutral-300 space-y-2">
          <p className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
            <Clock size={16} /> Sắp Ra Mắt — Đang Trong Lộ Trình Build Lại
          </p>
          <p className="text-[11px] leading-relaxed">
            Phiên bản game đang được hoàn thiện và đóng gói lại bản cài đặt APK hoàn chỉnh. Quý khách vui lòng quay lại sau hoặc tham gia bảng nhiệm vụ bên dưới để nhận thông báo và vật phẩm khi ra mắt!
          </p>
        </div>

        <button
          disabled
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-neutral-800 text-neutral-400 border border-neutral-700 flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
        >
          <Gamepad2 size={18} /> Đang Build Lại Bản APK...
        </button>
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
