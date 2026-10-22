"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Key, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatVnd } from "@/lib/catalog";

export default function MuaKeyForm({
  products,
  initialSlug,
  initialDeviceCode,
}: {
  products: Product[];
  initialSlug: string;
  initialDeviceCode: string;
}) {
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialSlug || (products[0] ? products[0].slug : "")
  );
  const [deviceCode, setDeviceCode] = useState<string>(initialDeviceCode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedProduct = products.find((p) => p.slug === selectedSlug) || products[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const note = form.get("note")?.toString().trim();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "key_purchase",
          productSlug: selectedSlug,
          deviceCode: deviceCode.trim().toUpperCase(),
          name,
          phone,
          note,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không thể tạo đơn mua key.");

      // Chuyển hướng tới trang thanh toán & nhận key
      router.push(`/don-hang/${encodeURIComponent(data.code)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Chọn ứng dụng */}
      <div>
        <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
          1. Chọn Ứng Dụng Cần Mở Khóa Bản Quyền <span className="text-red-400">*</span>
        </label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          required
          className="zb-input bg-[#0a243a] text-white"
        >
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} — {formatVnd(p.price)}
            </option>
          ))}
        </select>
        {selectedProduct && (
          <div className="mt-2 p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-[var(--zb-muted)]">Giá sở hữu vĩnh viễn:</span>
            <span className="font-bold text-[var(--zb-gold)] text-sm">
              {formatVnd(selectedProduct.price)} (trả 1 lần)
            </span>
          </div>
        )}
      </div>

      {/* Nhập mã thiết bị */}
      <div>
        <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
          2. Mã Thiết Bị Của Bạn (Device Code) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value.toUpperCase())}
            required
            placeholder="VD: ZB-BT-84920"
            className="zb-input font-mono font-bold tracking-wider text-base uppercase text-amber-300 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-500"
          />
        </div>
        <p className="text-[11px] text-[var(--zb-muted)] mt-1">
          * Xem mã này trong mục Dùng Thử của ứng dụng bạn đã tải về trên máy.
        </p>
      </div>

      {/* Thông tin khách hàng */}
      <div className="grid sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
            Họ và tên của bạn <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            required
            className="zb-input"
            placeholder="VD: Trần Văn Bình"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
            Số điện thoại / Zalo <span className="text-red-400">*</span>
          </label>
          <input
            name="phone"
            required
            inputMode="tel"
            className="zb-input"
            placeholder="VD: 0987654321"
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
          Ghi chú thêm (tùy chọn)
        </label>
        <input
          name="note"
          className="zb-input text-xs"
          placeholder="VD: Xuất key giúp mình qua Zalo nhé"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Nút thanh toán */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[var(--zb-gold)] to-[var(--zb-orange)] text-[var(--zb-navy-dark)] shadow-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer"
      >
        {submitting ? (
          "Đang khởi tạo mã đơn & mã QR..."
        ) : (
          <>
            <Key size={18} /> Tiến Hành Thanh Toán Nhận Key Ngay <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="text-center pt-1 text-[11px] text-[var(--zb-muted)] flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>Hệ thống tạo mã VietQR chuẩn xác — Nhận Key trực tiếp trên đơn hàng ngay khi chuyển khoản.</span>
      </div>
    </form>
  );
}
