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
      if (!res.ok) throw new Error(data.error || "Kh?ng th? t?o ??n mua key.");

      // Chuy?n h??ng t?i trang thanh to?n & nh?n key
      router.push(`/don-hang/${encodeURIComponent(data.code)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "?? c? l?i x?y ra.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Ch?n ?ng d?ng */}
      <div>
        <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
          1. Ch?n ?ng D?ng C?n M? Kh?a B?n Quy?n <span className="text-red-400">*</span>
        </label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          required
          className="zb-input bg-[#0a243a] text-white"
        >
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} ? {formatVnd(p.price)}
            </option>
          ))}
        </select>
        {selectedProduct && (
          <div className="mt-2 p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-[var(--zb-muted)]">Gi? s? h?u v?nh vi?n:</span>
            <span className="font-bold text-[var(--zb-gold)] text-sm">
              {formatVnd(selectedProduct.price)} (tr? 1 l?n)
            </span>
          </div>
        )}
      </div>

      {/* Nh?p m? thi?t b? */}
      <div>
        <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
          2. M? Thi?t B? C?a B?n (Device Code) <span className="text-red-400">*</span>
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
          * Xem m? n?y trong m?c D?ng Th? c?a ?ng d?ng b?n ?? t?i v? tr?n m?y.
        </p>
      </div>

      {/* Th?ng tin kh?ch h?ng */}
      <div className="grid sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
            H? v? t?n c?a b?n <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            required
            className="zb-input"
            placeholder="VD: Tr?n V?n B?nh"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--zb-muted)] mb-1.5">
            S? ?i?n tho?i / Zalo <span className="text-red-400">*</span>
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
          Ghi ch? th?m (t?y ch?n)
        </label>
        <input
          name="note"
          className="zb-input text-xs"
          placeholder="VD: Xu?t key gi?p m?nh qua Zalo nh?"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* N?t thanh to?n */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[var(--zb-gold)] to-[var(--zb-orange)] text-[var(--zb-navy-dark)] shadow-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer"
      >
        {submitting ? (
          "?ang kh?i t?o m? ??n & m? QR..."
        ) : (
          <>
            <Key size={18} /> Ti?n H?nh Thanh To?n Nh?n Key Ngay <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="text-center pt-1 text-[11px] text-[var(--zb-muted)] flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>H? th?ng t?o m? VietQR chu?n x?c ? Nh?n Key tr?c ti?p tr?n ??n h?ng ngay khi chuy?n kho?n.</span>
      </div>
    </form>
  );
}
