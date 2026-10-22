import type { Metadata } from "next";
import Link from "next/link";
import { Key, ShieldCheck, Zap, Download, HelpCircle, ArrowLeft } from "lucide-react";
import { PRODUCTS, formatVnd } from "@/lib/catalog";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import MuaKeyForm from "./MuaKeyForm";

export const metadata: Metadata = {
  title: "Mua Key M? Kh?a B?n Quy?n V?nh Vi?n | app.zeebee.vn",
  description: "Nh?p m? thi?t b? hi?n th? tr?n ?ng d?ng ?? t?i v? ?? mua key m? kh?a tr?n ??i 100% offline.",
};

export const dynamic = "force-dynamic";

export default async function MuaKeyPage({
  searchParams,
}: {
  searchParams: Promise<{ app?: string; code?: string }>;
}) {
  const { app, code } = await searchParams;
  const availableProducts = PRODUCTS.filter((p) => p.status === "available");

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/#san-pham"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--zb-muted)] hover:text-[var(--zb-gold)] transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Quay l?i danh m?c ?ng d?ng
        </Link>

        {/* Hero Banner */}
        <div className="zb-card p-6 sm:p-8 bg-gradient-to-br from-[#12406a] to-[#082238] border border-[rgba(234,189,23,0.3)] mb-8 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[rgba(234,189,23,0.15)] text-[var(--zb-gold)] flex items-center justify-center border border-[rgba(234,189,23,0.3)] shadow-md">
            <Key size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Mua Key M? Kh?a B?n Quy?n V?nh Vi?n
          </h1>
          <p className="text-sm leading-relaxed text-[var(--zb-off-white)] opacity-90 max-w-2xl">
            B?n ?? t?i v? tr?i nghi?m th? ?ng d?ng trong 7 ng?y? Nh?p <strong>M? Thi?t B? (Device Code)</strong> hi?n th? tr?n m?n h?nh ?ng d?ng c?a b?n ?? nh?n <strong>Key k?ch ho?t tr?n ??i 100% offline</strong>.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid md:grid-cols-[1fr_260px] gap-6 items-start">
          <div className="zb-card p-6 border border-[rgba(234,189,23,0.25)]">
            <MuaKeyForm
              products={availableProducts}
              initialSlug={app || ""}
              initialDeviceCode={code || ""}
            />
          </div>

          {/* Guide Sidebar */}
          <div className="space-y-4">
            <div className="zb-card p-5 space-y-3 text-xs bg-white/5 border border-white/10">
              <h3 className="font-bold text-white flex items-center gap-1.5 text-sm text-[var(--zb-gold)]">
                <HelpCircle size={16} /> L?y M? Thi?t B? ? ??u?
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-[var(--zb-off-white)]">
                <li>M? file ?ng d?ng (HTML/App) b?n ?? t?i v? tr?n m?y ho?c ?i?n tho?i.</li>
                <li>Xem huy hi?u g?c tr?n m?n h?nh: b?m v?o <strong>"D?ng th?: C?n X ng?y"</strong> ho?c b?ng th?ng b?o khi h?t h?n 7 ng?y.</li>
                <li>Sao ch?p d?y m? c? d?ng: <strong className="text-amber-300 font-mono">ZB-BT-XXXXX</strong> v? d?n v?o ? b?n tr?i.</li>
              </ol>
            </div>

            <div className="zb-card p-4 space-y-2 text-xs bg-emerald-950/20 border border-emerald-500/30">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck size={16} /> Cam K?t B?n Quy?n
              </div>
              <p className="text-[var(--zb-muted)] text-[11px] leading-relaxed">
                Key g?n li?n v?nh vi?n v?i thi?t b? c?a b?n. Ch?y ??c l?p 100% kh?ng c?n k?t n?i m?ng hay internet.
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
