"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Key,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  QrCode,
  Download,
} from "lucide-react";
import type { BankAccount } from "@/lib/payment-config";
import { formatVnd } from "@/lib/catalog";

export default function OrderStatusClient({
  orderCode,
  kind,
  productName,
  productSlug,
  deviceCode,
  amount,
  initialStatus,
  initialKey,
  bank,
  qrUrl,
  transferSyntax,
  customerName,
  customerPhone,
}: {
  orderCode: string;
  kind: string;
  productName: string;
  productSlug: string;
  deviceCode: string;
  amount: number;
  initialStatus: string;
  initialKey: string;
  bank: BankAccount;
  qrUrl: string;
  transferSyntax: string;
  customerName: string;
  customerPhone: string;
}) {
  const [status, setStatus] = useState<string>(initialStatus);
  const [licenseKey, setLicenseKey] = useState<string>(initialKey);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isPaid = status === "paid" || status === "completed";

  // Polling check tr?ng th?i ??n h?ng khi ?ang ch? thanh to?n
  useEffect(() => {
    if (isPaid) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(orderCode)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.ok && data.order) {
          if (data.order.status === "paid" || data.order.status === "completed") {
            setStatus("paid");
            if (data.order.licenseKey) {
              setLicenseKey(data.order.licenseKey);
            }
          }
        }
      } catch (e) {
        // Ignore polling error
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [orderCode, isPaid]);

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Status */}
      <div
        className={`zb-card p-6 border transition-all ${
          isPaid
            ? "border-emerald-500/50 bg-gradient-to-r from-emerald-950/40 to-teal-950/40 shadow-xl shadow-emerald-900/20"
            : "border-amber-500/40 bg-gradient-to-r from-amber-950/30 to-orange-950/30 shadow-xl"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${
                isPaid
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30"
                  : "bg-amber-400 text-slate-950 animate-pulse"
              }`}
            >
              {isPaid ? <CheckCircle2 size={26} /> : <Clock size={24} />}
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--zb-gold)]">
                {isPaid ? "?? X?c Nh?n Thanh To?n" : "?ang Ch? Chuy?n Kho?n"}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {isPaid
                  ? "Thanh To?n Th?nh C?ng ? Nh?n Key B?n Quy?n"
                  : "Chuy?n Kho?n Theo C? Ph?p ?? Nh?n Key"}
              </h1>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[var(--zb-muted)] block">M? ??n h?ng</span>
            <span className="font-mono text-sm sm:text-base font-bold text-white bg-white/10 px-2.5 py-1 rounded">
              {orderCode}
            </span>
          </div>
        </div>
      </div>

      {/* SUCCESS: LICENSE KEY DELIVERY BOX */}
      {isPaid && (
        <div className="zb-card p-6 sm:p-8 bg-gradient-to-br from-[#133d2a] to-[#0a2318] border-2 border-emerald-400/60 shadow-2xl space-y-5 animate-in fade-in duration-500">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck size={16} /> B?N QUY?N V?NH VI?N 100% OFFLINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Key M? Kh?a C?a B?n ?? S?n S?ng!
            </h2>
            <p className="text-xs sm:text-sm text-[var(--zb-off-white)] opacity-90 max-w-lg mx-auto">
              S? d?ng m? d??i ??y ?? k?ch ho?t ?ng d?ng tr?n thi?t b?{" "}
              <strong className="text-amber-300 font-mono">{deviceCode}</strong>.
            </p>
          </div>

          {/* Key Display Big Box */}
          <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-black/60 border border-amber-400/50 shadow-inner text-center space-y-3">
            <span className="text-xs font-semibold text-[var(--zb-gold-light)] block tracking-wider uppercase">
              M? k?ch ho?t b?n quy?n (License Key)
            </span>
            <div className="font-mono text-xl sm:text-3xl font-black text-[var(--zb-gold)] tracking-widest select-all py-1 break-all">
              {licenseKey || "?ang l?y key..."}
            </div>
            <div>
              <button
                type="button"
                onClick={() => copyToClipboard(licenseKey, "license")}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[var(--zb-gold)] to-[var(--zb-orange)] text-slate-950 hover:brightness-110 shadow-lg inline-flex items-center gap-2 transition"
              >
                {copiedField === "license" ? (
                  <>
                    <Check size={16} className="text-black" /> ?? sao ch?p Key!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Sao ch?p License Key
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3 Steps Guide */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm space-y-2.5 max-w-xl mx-auto">
            <h3 className="font-bold text-[var(--zb-gold)] text-xs uppercase tracking-wide">
              3 B??c M? Kh?a ??n Gi?n:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-[var(--zb-off-white)] text-xs">
              <li>M? ?ng d?ng <strong>{productName}</strong> tr?n m?y ho?c ?i?n tho?i c?a b?n.</li>
              <li>T?i khung th?ng b?o b?n quy?n / d?ng th?, d?n m? <strong>License Key</strong> v?a nh?n v?o ? k?ch ho?t.</li>
              <li>B?m n?t <strong>"K?ch ho?t b?n quy?n tr?n ??i"</strong> ? M?i t?nh n?ng s? ???c m? v?nh vi?n kh?ng c?n m?ng!</li>
            </ol>
          </div>
        </div>
      )}

      {/* PENDING PAYMENT: INSTRUCTIONS & VIETQR */}
      {!isPaid && (
        <div className="grid md:grid-cols-[1fr_340px] gap-6 items-start">
          {/* C? ph?p chuy?n kho?n & Ng?n h?ng */}
          <div className="zb-card p-6 space-y-5 border border-white/10">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
                B??c 1 ? Thanh To?n
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Th?ng Tin Chuy?n Kho?n Ch?nh X?c
              </h2>
              <p className="text-xs text-[var(--zb-muted)]">
                Vui l?ng nh?p ??ng n?i dung chuy?n kho?n ?? admin ??i so?t v? xu?t key cho b?n nhanh nh?t.
              </p>
            </div>

            {/* Syntax Box - HIGHLIGHT */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 border-2 border-amber-400/50 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span>N?I DUNG CHUY?N KHO?N B?T BU?C (C? PH?P):</span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                  R?T QUAN TR?NG
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 bg-black/40 p-3 rounded-xl border border-white/10">
                <span className="font-mono text-lg sm:text-xl font-black text-[var(--zb-gold)] select-all tracking-wide">
                  {transferSyntax}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(transferSyntax, "syntax")}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  {copiedField === "syntax" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedField === "syntax" ? "?? ch?p" : "Sao ch?p"}</span>
                </button>
              </div>
              <p className="text-[11px] text-[var(--zb-muted)]">
                * C? ph?p: <strong>{transferSyntax}</strong> (Ch? chuy?n ??ng n?i dung n?y, kh?ng th?m ch? kh?c).
              </p>
            </div>

            {/* Bank Info Table */}
            <div className="space-y-2.5 text-xs bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[var(--zb-muted)]">Ng?n h?ng:</span>
                <strong className="text-white font-bold">{bank.bankName}</strong>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[var(--zb-muted)]">S? t?i kho?n:</span>
                <div className="flex items-center gap-2">
                  <strong className="font-mono text-sm font-black text-white bg-white/10 px-2 py-0.5 rounded">
                    {bank.accountNumber}
                  </strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(bank.accountNumber, "stk")}
                    className="p-1 rounded hover:bg-white/10 text-[var(--zb-gold)]"
                    title="Sao ch?p s? t?i kho?n"
                  >
                    {copiedField === "stk" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[var(--zb-muted)]">Ch? t?i kho?n:</span>
                <strong className="text-white font-bold">{bank.accountName}</strong>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[var(--zb-muted)]">S? ti?n thanh to?n:</span>
                <div className="flex items-center gap-2">
                  <strong className="text-base font-black text-[var(--zb-gold)]">
                    {formatVnd(amount)}
                  </strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(amount.toString(), "amount")}
                    className="p-1 rounded hover:bg-white/10 text-[var(--zb-gold)]"
                    title="Sao ch?p s? ti?n"
                  >
                    {copiedField === "amount" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Auto refresh note */}
            <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2.5">
              <Clock size={16} className="shrink-0 text-cyan-400 mt-0.5" />
              <span>
                Sau khi chuy?n kho?n, <strong>vui l?ng gi? nguy?n trang n?y</strong>. H? th?ng t? ??ng ki?m tra m?i 4 gi?y v? hi?n th? License Key ngay khi nh?n ???c thanh to?n.
              </span>
            </div>
          </div>

          {/* VietQR Box */}
          <div className="zb-card p-5 space-y-3.5 border border-white/10 text-center bg-[#0a273f]">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[var(--zb-gold)]">
              <QrCode size={16} /> Qu?t M? VietQR Nhanh
            </div>

            <div className="p-3 bg-white rounded-2xl shadow-lg inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt="M? VietQR thanh to?n"
                className="w-56 h-56 mx-auto object-contain rounded-lg"
              />
            </div>

            <p className="text-[11px] text-[var(--zb-off-white)]">
              M? App Ng?n h?ng b?t k? &gt; Qu?t m? ?? t? ??ng ?i?n <strong>s? ti?n</strong> v? <strong>n?i dung chuy?n kho?n</strong> ch?nh x?c.
            </p>
          </div>
        </div>
      )}

      {/* Order Summary & Support Links */}
      <div className="zb-card p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-[var(--zb-muted)]">
            ?ng d?ng: <strong className="text-white">{productName}</strong> ? M? thi?t b?: <strong className="text-amber-300 font-mono">{deviceCode}</strong>
          </p>
          <p className="text-[var(--zb-muted)]">
            Ng??i nh?n: <strong className="text-white">{customerName}</strong> ({customerPhone})
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href="https://zalo.me/0976094453"
            target="_blank"
            rel="noopener noreferrer"
            className="zb-btn-primary px-4 py-2 text-xs inline-flex items-center gap-1.5 shadow"
          >
            <MessageCircle size={14} /> H? Tr? Zalo G?p (24/7)
          </a>
          <Link
            href="/#san-pham"
            className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-white text-xs transition inline-flex items-center gap-1"
          >
            <span>Kho S?n Ph?m</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
