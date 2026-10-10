"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Mẫu thu yêu cầu cho dịch vụ CUSTOM: không có gói giá — hỏi đủ thông tin để Seller báo giá
// được ngay trong lần gọi đầu tiên (chìa khóa của mô hình custom là lấy yêu cầu cụ thể).
const PRODUCT_TYPES = ["Website", "Tool / phần mềm nội bộ", "App điện thoại", "Game", "Chưa rõ — cần tư vấn"];
const DEADLINES = ["Trong 2 tuần", "Trong 1 tháng", "1–3 tháng", "Chưa gấp"];
const BUDGETS = ["Dưới 5 triệu", "5–15 triệu", "15–50 triệu", "Trên 50 triệu", "Chưa xác định"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm mb-1" style={{ color: "var(--zb-muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export default function CustomRequestForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "custom", ...data }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Gửi thất bại, vui lòng thử lại.");
      router.push(`/cam-on?ma=${encodeURIComponent(body.code)}&loai=build`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gửi thất bại, vui lòng thử lại.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="zb-card p-5 sm:p-6 space-y-4">
      <Field label="Bạn cần làm gì? *">
        <select name="productType" required className="zb-input" defaultValue="">
          <option value="" disabled>
            Chọn loại sản phẩm
          </option>
          {PRODUCT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Dùng để làm gì, cho ai? *">
        <textarea
          name="purpose"
          required
          rows={3}
          className="zb-input"
          placeholder="VD: web bán hàng cho tiệm bánh, khách đặt bánh online và nhận qua Zalo"
        />
      </Field>
      <Field label="Những tính năng bắt buộc phải có">
        <textarea
          name="features"
          rows={3}
          className="zb-input"
          placeholder="VD: danh mục sản phẩm, giỏ hàng, đặt lịch giao, trang quản lý đơn"
        />
      </Field>
      <Field label="Mẫu tham khảo (link web/app bạn thích)">
        <input name="reference" className="zb-input" placeholder="https://..." />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Cần xong trong">
          <select name="deadline" className="zb-input" defaultValue="Chưa gấp">
            {DEADLINES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Ngân sách dự kiến">
          <select name="budget" className="zb-input" defaultValue="Chưa xác định">
            {BUDGETS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Họ tên *">
          <input name="name" required className="zb-input" autoComplete="name" />
        </Field>
        <Field label="Số điện thoại / Zalo *">
          <input name="phone" required inputMode="tel" className="zb-input" autoComplete="tel" />
        </Field>
      </div>
      {error && (
        <p className="text-sm" style={{ color: "var(--zb-orange)" }}>
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting} className="zb-btn-primary w-full py-3">
        {submitting ? "Đang gửi..." : "Gửi yêu cầu — nhận báo giá"}
      </button>
      <p className="text-xs text-center" style={{ color: "var(--zb-muted)" }}>
        Miễn phí. Seller sẽ gọi hoặc nhắn Zalo để hỏi thêm và báo giá cụ thể.
      </p>
    </form>
  );
}
