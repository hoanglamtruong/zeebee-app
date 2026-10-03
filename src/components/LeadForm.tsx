"use client";

import { useState } from "react";

const PACKAGE_OPTIONS = [
  "Gói cấu hình cơ bản",
  "Module mở rộng",
  "Nền tảng tùy biến hoàn toàn",
  "Chưa rõ — cần tư vấn",
];

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          packageInterest: data.get("packageInterest"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Gửi yêu cầu thất bại.");
      }

      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Gửi yêu cầu thất bại.");
    }
  }

  if (status === "done") {
    return (
      <div className="zb-card p-6 text-center">
        <p className="text-lg font-semibold" style={{ color: "var(--zb-gold)" }}>
          Đã nhận yêu cầu!
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--zb-muted)" }}>
          Zee Bee Agency sẽ liên hệ lại với bạn trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="zb-card p-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm mb-1" style={{ color: "var(--zb-muted)" }}>
          Họ tên *
        </label>
        <input id="name" name="name" required className="zb-input" placeholder="Nguyễn Văn A" />
      </div>
      <div>
        <label htmlFor="contact" className="block text-sm mb-1" style={{ color: "var(--zb-muted)" }}>
          Số điện thoại / Email *
        </label>
        <input id="contact" name="contact" required className="zb-input" placeholder="090xxxxxxx hoặc email" />
      </div>
      <div>
        <label htmlFor="packageInterest" className="block text-sm mb-1" style={{ color: "var(--zb-muted)" }}>
          Quan tâm gói nào? *
        </label>
        <select id="packageInterest" name="packageInterest" required className="zb-input">
          {PACKAGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm mb-1" style={{ color: "var(--zb-muted)" }}>
          Mô tả yêu cầu (tùy chọn)
        </label>
        <textarea id="message" name="message" rows={3} className="zb-input" placeholder="Bạn cần website/tool/app gì?" />
      </div>
      {status === "error" && (
        <p className="text-sm" style={{ color: "var(--zb-orange)" }}>
          {errorMsg}
        </p>
      )}
      <button type="submit" disabled={status === "submitting"} className="zb-btn-primary w-full py-2.5">
        {status === "submitting" ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
      </button>
    </form>
  );
}
