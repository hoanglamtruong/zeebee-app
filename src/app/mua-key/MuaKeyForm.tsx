"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Key, ShieldCheck, ArrowRight, AlertCircle, Sparkles, Tag, Check, X, Ticket } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatVnd } from "@/lib/catalog";

interface AppliedCoupon {
  code: string;
  label: string;
  discountAmount: number;
  finalPrice: number;
  originalPrice: number;
}

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

  // Quản lý mã giảm giá (KOL, KOC, CTV, Khách quen)
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  const selectedProduct = products.find((p) => p.slug === selectedSlug) || products[0];

  // Phân nhóm sản phẩm theo chuyên mục để hiển thị optgroup trực quan
  const groupedProducts = useMemo(() => {
    const groups: Record<string, { label: string; items: Product[] }> = {
      "pro-tools": { label: "🏗️ Công Cụ Kỹ Thuật & Xây Dựng", items: [] },
      "business": { label: "💼 Quản Lý Bán Hàng & Kinh Doanh", items: [] },
      "utility": { label: "🛠️ Tiện Ích Đời Sống & Quản Lý", items: [] },
      "games": { label: "🎮 Game Bluetooth Đấu 2 Máy", items: [] },
    };

    products.forEach((p) => {
      const cat = p.category || "utility";
      if (!groups[cat]) {
        groups[cat] = { label: "📦 Sản Phẩm Khác", items: [] };
      }
      groups[cat].items.push(p);
    });

    return Object.entries(groups).filter(([, g]) => g.items.length > 0);
  }, [products]);

  // Khi đổi sản phẩm: tự động tính lại số tiền nếu đang có coupon
  async function handleProductChange(newSlug: string) {
    setSelectedSlug(newSlug);
    const newProd = products.find((p) => p.slug === newSlug);
    if (!newProd) return;

    if (appliedCoupon) {
      try {
        const res = await fetch("/api/coupons/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: appliedCoupon.code,
            productSlug: newSlug,
            price: newProd.price,
          }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          setAppliedCoupon({
            code: data.code,
            label: data.label,
            discountAmount: data.discountAmount,
            finalPrice: data.finalPrice,
            originalPrice: data.originalPrice,
          });
        } else {
          setAppliedCoupon(null);
        }
      } catch {
        setAppliedCoupon(null);
      }
    }
  }

  // Áp dụng mã giảm giá
  async function handleApplyCoupon() {
    const code = couponCodeInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Vui lòng nhập mã giảm giá.");
      return;
    }
    if (!selectedProduct) {
      setCouponError("Vui lòng chọn sản phẩm trước.");
      return;
    }

    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          productSlug: selectedSlug,
          price: selectedProduct.price,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Mã giảm giá không hợp lệ.");
      }

      setAppliedCoupon({
        code: data.code,
        label: data.label,
        discountAmount: data.discountAmount,
        finalPrice: data.finalPrice,
        originalPrice: data.originalPrice,
      });
      setCouponCodeInput("");
    } catch (err) {
      setCouponError(err instanceof Error ? err.message : "Mã không hợp lệ.");
    } finally {
      setCouponLoading(false);
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponError("");
  }

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
          couponCode: appliedCoupon?.code || undefined,
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

  const finalPrice = appliedCoupon ? appliedCoupon.finalPrice : (selectedProduct?.price || 0);
  const isFree = finalPrice === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Chọn ứng dụng */}
      <div>
        <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
          1. Chọn Ứng Dụng Cần Mở Khóa Bản Quyền <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            value={selectedSlug}
            onChange={(e) => handleProductChange(e.target.value)}
            required
            className="zb-input bg-[#0a243a] text-white font-medium py-2.5 px-3 border border-white/20 rounded-xl w-full focus:border-[var(--zb-gold)] focus:ring-1 focus:ring-[var(--zb-gold)] transition"
            style={{ backgroundColor: "#0a243a", color: "#ffffff" }}
          >
            {groupedProducts.map(([groupKey, group]) => (
              <optgroup
                key={groupKey}
                label={group.label}
                className="bg-[#061928] text-amber-300 font-bold"
                style={{ backgroundColor: "#061928", color: "#eabd17" }}
              >
                {group.items.map((p) => (
                  <option
                    key={p.slug}
                    value={p.slug}
                    className="bg-[#0a243a] text-white py-2 font-normal"
                    style={{ backgroundColor: "#0a243a", color: "#ffffff" }}
                  >
                    {p.name} — {formatVnd(p.price)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Khối hiển thị chi tiết giá & giảm giá */}
        {selectedProduct && (
          <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[var(--zb-muted)]">
              <span>Giá niêm yết vĩnh viễn:</span>
              <span className={`font-semibold ${appliedCoupon ? "line-through opacity-70 text-slate-400" : "font-bold text-[var(--zb-gold)] text-sm"}`}>
                {formatVnd(selectedProduct.price)} (trả 1 lần)
              </span>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-emerald-400 font-medium pt-1 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <Tag size={13} /> {appliedCoupon.label}:
                </span>
                <span className="font-bold">
                  -{formatVnd(appliedCoupon.discountAmount)}
                </span>
              </div>
            )}

            {appliedCoupon && (
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-white font-bold">
                <span>Số tiền thanh toán thực tế:</span>
                <span className="text-base font-black text-[var(--zb-gold)]">
                  {isFree ? "0đ (Tài trợ KOL/KOC 100%)" : `${formatVnd(finalPrice)} (trả 1 lần)`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mục Nhập Mã Giảm Giá (KOL, KOC, CTV, Khách quen) */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 space-y-2">
        <label className="block text-xs font-bold text-[var(--zb-gold-light)] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Ticket size={14} /> Mã Giảm Giá / Voucher (KOL, KOC, CTV, Khách quen)
          </span>
          {appliedCoupon && (
            <span className="text-[11px] font-normal text-emerald-400 flex items-center gap-1">
              <Check size={12} /> Đã kích hoạt
            </span>
          )}
        </label>

        {!appliedCoupon ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApplyCoupon();
                  }
                }}
                placeholder="Nhập mã KOL / KOC / CTV / Khách quen..."
                className="zb-input font-mono uppercase text-xs tracking-wider placeholder:normal-case placeholder:tracking-normal"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={couponLoading || !couponCodeInput.trim()}
              className="px-4 py-2 rounded-lg bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] font-bold text-xs hover:bg-[var(--zb-gold-light)] transition disabled:opacity-50 cursor-pointer"
            >
              {couponLoading ? "Kiểm tra..." : "Áp Dụng"}
            </button>
          </div>
        ) : (
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Check size={12} />
              </div>
              <div>
                <strong className="font-mono text-emerald-300 font-bold">{appliedCoupon.code}</strong>
                <span className="text-[11px] text-emerald-200/90 ml-1.5">({appliedCoupon.label})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-0.5 underline cursor-pointer ml-2"
            >
              <X size={12} /> Hủy mã
            </button>
          </div>
        )}

        {couponError && (
          <p className="text-[11px] text-red-300 flex items-center gap-1">
            <AlertCircle size={12} /> {couponError}
          </p>
        )}

        <p className="text-[11px] text-[var(--zb-muted)] leading-relaxed">
          * Mã ưu đãi được Admin cấp riêng cho khách quen, đối tác KOL/KOC làm video review hoặc cộng tác viên Zeebee.
        </p>
      </div>

      {/* 2. Nhập mã thiết bị */}
      <div>
        <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
          2. Mã Thiết Bị Của Bạn (Device Code) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value.toUpperCase())}
            required
            placeholder={`VD: ZB-${selectedProduct?.devicePrefix || "BT"}-84920`}
            className="zb-input font-mono font-bold tracking-wider text-base uppercase text-amber-300 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-500"
          />
        </div>
        <p className="text-[11px] text-[var(--zb-muted)] mt-1">
          * Xem mã này trong mục Dùng Thử của ứng dụng bạn đã tải về trên máy hoặc điện thoại.
        </p>
      </div>

      {/* 3. Thông tin khách hàng */}
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

      {/* Nút thanh toán hoặc nhận key ngay */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[var(--zb-gold)] to-[var(--zb-orange)] text-[var(--zb-navy-dark)] shadow-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer"
      >
        {submitting ? (
          "Đang khởi tạo mã đơn & mã QR..."
        ) : isFree ? (
          <>
            <Key size={18} /> Nhận License Key Miễn Phí Ngay (Khách Mời KOL) <ArrowRight size={16} />
          </>
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
