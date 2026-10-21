"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Download, CheckCircle2 } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="zb-card p-5 space-y-3.5 border border-[rgba(234,189,23,0.3)]">
      {comingSoon ? (
        <div className="p-3 rounded-lg bg-[rgba(245,209,87,0.12)] border border-[rgba(245,209,87,0.3)] space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--zb-gold-light)] uppercase tracking-wide">
            <Sparkles size={14} /> Ưu đãi đặt trước 50%
          </div>
          <p className="text-xs text-[var(--zb-off-white)]">
            Đăng ký để là <strong>1 trong 50 người đầu tiên</strong> nhận mã giảm 50% kèm file APK/công cụ qua Zalo khi sản phẩm xuất xưởng!
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <CheckCircle2 size={15} /> Sẵn sàng bàn giao file qua Zalo trong 15 phút
        </div>
      )}

      <div>
        <label className="block text-xs mb-1 font-medium text-[var(--zb-muted)]">
          Họ và tên của bạn <span className="text-red-400">*</span>
        </label>
        <input
          name="name"
          required
          className="zb-input"
          placeholder="VD: Nguyễn Văn An"
          autoComplete="name"
        />
      </div>

      <div>
        <label className="block text-xs mb-1 font-medium text-[var(--zb-muted)]">
          Số điện thoại / Zalo nhận file <span className="text-red-400">*</span>
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

      <div>
        <label className="block text-xs mb-1 font-medium text-[var(--zb-muted)]">
          Ghi chú thêm (tùy chọn)
        </label>
        <textarea
          name="note"
          rows={2}
          className="zb-input text-sm"
          placeholder={comingSoon ? "Bạn muốn góp ý tính năng nào cho sản phẩm này?" : "Lời nhắn cho người gửi file qua Zalo"}
        />
      </div>

      {error && (
        <p className="text-xs p-2 rounded bg-red-950/40 border border-red-500/40 text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          comingSoon
            ? "bg-[var(--zb-gold)] hover:bg-[var(--zb-gold-light)] text-[var(--zb-navy-dark)] shadow-md"
            : "zb-btn-primary shadow-lg"
        }`}
      >
        {submitting ? (
          "Đang gửi thông tin..."
        ) : comingSoon ? (
          <>
            <Sparkles size={16} /> Đăng ký nhận mã ưu đãi 50%
          </>
        ) : (
          <>
            <Download size={16} /> Đặt mua ngay — {priceLabel}
          </>
        )}
      </button>

      <p className="text-[11px] text-center" style={{ color: "var(--zb-muted)" }}>
        {comingSoon
          ? "Chưa cần thanh toán. Zeebee sẽ tự động nhắn Zalo kèm mã ưu đãi độc quyền khi ra mắt."
          : "Chưa cần thanh toán ngay — Seller gọi/Zalo trong 15 phút để bạn duyệt rồi mới thanh toán."}
      </p>
    </form>
  );
}
