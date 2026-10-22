import Image from "next/image";
import Link from "next/link";
import { Sparkles, Hammer, ShieldCheck, HelpCircle, Key } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a2d47]/90 border-b border-[rgba(234,189,23,0.15)] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="V? trang ch? app.zeebee.vn">
          <Image src="/zeebee_logo_horizontal_white.svg" alt="Zee Bee" width={140} height={31} priority />
          <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(234,189,23,0.15)] text-[var(--zb-gold)] border border-[rgba(234,189,23,0.3)]">
            C?a h?ng s? 2026
          </span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-4 text-sm font-medium">
          <Link
            href="/#san-pham"
            className="hidden md:inline-flex items-center gap-1.5 hover:text-[var(--zb-gold)] transition-colors"
            style={{ color: "var(--zb-muted)" }}
          >
            S?n ph?m T?i v?
          </Link>
          <Link
            href="/mua-key"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 transition-all shadow-sm"
          >
            <Key size={14} className="text-[var(--zb-gold)]" />
            <span>Mua Key M? Kh?a</span>
          </Link>
          <Link
            href="/#combo"
            className="hidden lg:inline-flex items-center gap-1.5 hover:text-[var(--zb-gold)] transition-colors"
            style={{ color: "var(--zb-muted)" }}
          >
            <Sparkles size={14} className="text-[var(--zb-gold)]" /> Combo gi?m 35%
          </Link>
          <Link
            href="/build"
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-[var(--zb-gold)] transition-colors"
            style={{ color: "var(--zb-muted)" }}
          >
            <Hammer size={14} /> D?ch v? Build
          </Link>
          <Link
            href="/build"
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm text-white shadow-md transition-all flex items-center gap-1.5 shrink-0"
            style={{
              backgroundColor: "var(--zb-orange)",
              boxShadow: "0 4px 14px rgba(251, 133, 0, 0.35)",
            }}
          >
            <Hammer size={15} />
            <span className="hidden sm:inline">Y?u c?u l?m App/Tool</span>
            <span className="sm:hidden">L?m App</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#071f31] text-sm py-10 px-6 space-y-4 text-center" style={{ color: "var(--zb-muted)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-[var(--zb-gold)]" />
          <span>D?ng th? 7 ng?y mi?n ph? ? B?n quy?n m? kh?a v?nh vi?n ? 100% Offline</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/#san-pham" className="hover:underline">Kho s?n ph?m</Link>
          <Link href="/mua-key" className="hover:underline text-[var(--zb-gold)]">Mua Key B?n Quy?n</Link>
          <Link href="/build" className="hover:underline">B?o gi? l?m ph?n m?m</Link>
          <a href="https://zalo.me/0976094453" target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--zb-gold)]">
            H? tr? Zalo: 0976.094.453
          </a>
        </div>
      </div>
      <p className="pt-4 border-t border-[rgba(255,255,255,0.05)] text-xs">
        ? {new Date().getFullYear()} Zee Bee ? app.zeebee.vn ? C?a h?ng s? Offline-First &amp; Gia c?ng ph?n m?m may ?o thu?c{" "}
        <a href="https://zeebee.vn" className="underline text-white hover:text-[var(--zb-gold)]">
          h? sinh th?i Zeebee
        </a>
      </p>
    </footer>
  );
}
