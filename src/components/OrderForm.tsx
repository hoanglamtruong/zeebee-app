"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Form gọn: chỉ họ tên + SĐT/Zalo (+ ghi chú tùy chọn). Seller sẽ tự gọi hỏi phần còn lại.
export default function OrderForm({
  productSlug,
  comingSoon,
  priceLabel,
}: {
  productSlug: string;
  comingSoon: boolean;
  priceLabel: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "product",
          productSlug,
          name: data.get("name"),
          phone: data.get("phone"),
          note: data.get("note"),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Gửi thất bại, vui lòng thử lại.");
      router.push(`/cam-on?ma=${encodeURIComponent(body.code)}${comingSoon ? "&loai=cho" : ""}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gửi thất bại, vui lòng thử lại.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="zb-card p-5 space-y-3">
      <input name="name" required className="zb-input" placeholder="Họ tên *" autoComplete="name" />
      <input
        name="phone"
        required
        inputMode="tel"
        className="zb-input"
        placeholder="Số điện thoại / Zalo *"
        autoComplete="tel"
      />
      <textarea name="note" rows={2} className="zb-input" placeholder="Ghi chú (tùy chọn)" />
      {error && (
        <p className="text-sm" style={{ color: "var(--zb-orange)" }}>
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting} className="zb-btn-primary w-full py-3">
        {submitting ? "Đang gửi..." : comingSoon ? "Báo tôi khi ra mắt" : `Đặt mua — ${priceLabel}`}
      </button>
      <p className="text-xs text-center" style={{ color: "var(--zb-muted)" }}>
        {comingSoon
          ? "Zeebee sẽ nhắn Zalo cho bạn khi sản phẩm ra mắt."
          : "Bạn chưa cần thanh toán — Seller sẽ gọi hoặc nhắn Zalo để xác nhận và bàn giao."}
      </p>
    </form>
  );
}
