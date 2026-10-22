"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Key, Copy, Check, MessageCircle, AlertCircle, Tag } from "lucide-react";
import type { OrderRecord } from "@/lib/db";
import { formatVnd } from "@/lib/catalog";

export default function AdminApprovalClient({
  order,
  productName,
  proposedKey,
  secret,
}: {
  order: OrderRecord;
  productName: string;
  proposedKey: string;
  secret: string;
}) {
  const [status, setStatus] = useState<string>(order.status);
  const [key, setKey] = useState<string>(order.licenseKey || proposedKey);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const isPaid = status === "paid" || status === "completed";
  const couponCode = order.details?.couponCode;
  const couponLabel = order.details?.couponLabel;
  const discountAmount = order.details?.discountAmount;
  const originalPrice = order.details?.originalPrice;

  async function handleApprove() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/issue-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: order.code,
          secret,
          customKey: key,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi phê duyệt.");
      setStatus("paid");
      if (data.licenseKey) setKey(data.licenseKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi phê duyệt đơn.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="zb-card p-6 sm:p-8 space-y-6 border border-[rgba(234,189,23,0.3)] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            Admin Zeebee · Quản Lý Xuất Key
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Duyệt Đơn &amp; Xuất Key Bản Quyền
          </h1>
        </div>
        {isPaid ? (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <CheckCircle2 size={14} /> {order.amount === 0 ? "TÀI TRỢ KOL / MIỄN PHÍ" : "ĐÃ XUẤT KEY"}
          </span>
        ) : (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
            <ShieldCheck size={14} /> CHỜ XÁC NHẬN TIỀN
          </span>
        )}
      </div>

      {/* Thông tin đơn */}
      <div className="grid sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
          <span className="text-[var(--zb-muted)]">Mã đơn hàng:</span>
          <p className="font-mono font-bold text-sm text-white">{order.code}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
          <span className="text-[var(--zb-muted)]">Số tiền thanh toán:</span>
          <p className="font-bold text-sm text-[var(--zb-gold)]">
            {order.amount === 0 ? "0đ (Miễn phí KOL / KOC)" : formatVnd(order.amount || 0)}
          </p>
          {couponCode && (
            <p className="text-[11px] text-emerald-300 flex items-center gap-1 pt-0.5">
              <Tag size={12} /> Mã {couponCode}: {couponLabel} (-{discountAmount})
            </p>
          )}
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
          <span className="text-[var(--zb-muted)]">Khách hàng:</span>
          <p className="font-bold text-white text-sm">{order.name}</p>
          <p className="text-[var(--zb-muted)] font-mono">{order.phone}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
          <span className="text-[var(--zb-muted)]">Ứng dụng:</span>
          <p className="font-bold text-white text-sm">{productName}</p>
          <p className="text-[var(--zb-muted)]">Mã thiết bị: <strong className="text-amber-300 font-mono">{order.deviceCode || "Chưa có"}</strong></p>
        </div>
      </div>

      {/* Key Display & Input */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--zb-gold-light)] flex items-center gap-1.5">
            <Key size={14} /> License Key Cấp Cho Khách:
          </span>
          <button
            onClick={() => handleCopy(key)}
            className="text-[11px] px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 font-mono transition cursor-pointer"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? "Đã chép" : "Sao chép"}</span>
          </button>
        </div>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase())}
          className="w-full font-mono text-center text-lg sm:text-xl font-black py-2.5 px-3 rounded-lg bg-black/40 border border-amber-500/40 text-[var(--zb-gold)] tracking-wider"
          placeholder="ZBKEY-XXXX-XXXX-XXXX-XXXX"
        />
        <p className="text-[11px] text-[var(--zb-muted)] text-center">
          * Key này được mã hóa tự động khớp với Mã thiết bị <strong>{order.deviceCode}</strong> để khách kích hoạt 100% offline.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3 pt-2">
        {!isPaid ? (
          <button
            onClick={handleApprove}
            disabled={submitting}
            className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {submitting ? (
              "Đang kích hoạt..."
            ) : (
              <>
                <CheckCircle2 size={18} /> Xác Nhận Đã Nhận Tiền &amp; Xuất Key Ngay
              </>
            )}
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
            <p className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 size={16} /> Đơn hàng đã xuất key thành công!
            </p>
            <p className="text-xs text-[var(--zb-muted)]">
              Khách hàng hiện đã thấy mã Key trên màn hình đơn hàng và có thể kích hoạt app ngay lập tức.
            </p>
          </div>
        )}

        <div className="flex gap-2 justify-center pt-2">
          <a
            href={`https://zalo.me/${order.phone.replace(/[\s.-]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white flex items-center gap-1.5 transition"
          >
            <MessageCircle size={14} className="text-cyan-400" /> Nhắn Zalo Khách Hàng
          </a>
          <a
            href={`/don-hang/${order.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-[var(--zb-gold)] flex items-center gap-1.5 transition"
          >
            Xem Màn Hình Khách Hàng
          </a>
        </div>
      </div>
    </div>
  );
}
