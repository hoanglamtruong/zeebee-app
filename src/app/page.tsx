import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Coins,
  Sparkles,
  Hammer,
  PlayCircle,
  Download,
  Key,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import ProductCatalogSection from "@/components/ProductCatalogSection";
import { BUNDLES, formatVnd } from "@/lib/catalog";

const TRUST_BADGES = [
  {
    icon: Zap,
    title: "100% Offline-First",
    desc: "Ho?t ??ng ??c l?p ngay c? khi m?t m?ng. Kh?ng ph? thu?c m?y ch? trung gian.",
    color: "var(--zb-gold)",
  },
  {
    icon: ShieldCheck,
    title: "B?o M?t C?c B? Tuy?t ??i",
    desc: "To?n b? d? li?u kh?ch h?ng, s? s?ch l?u tr?c ti?p tr?n thi?t b? c?a b?n.",
    color: "#34d399",
  },
  {
    icon: Coins,
    title: "Mua 1 L?n ? D?ng V?nh Vi?n",
    desc: "Tr? ph? duy nh?t m?t l?n. Tuy?t ??i kh?ng bao gi? ph?t sinh ph? duy tr? h?ng th?ng.",
    color: "var(--zb-orange)",
  },
];

const STEPS = [
  {
    icon: Download,
    title: "1. T?i V? D?ng Th? 7 Ng?y",
    desc: "T?i ?ng d?ng v? m?y ho?c ?i?n tho?i, tr?i nghi?m 100% full t?nh n?ng kh?ng gi?i h?n trong 7 ng?y mi?n ph?.",
  },
  {
    icon: PlayCircle,
    title: "2. L?y M? Thi?t B? (Device Code)",
    desc: "M? ?ng d?ng xem M? thi?t b? ??c nh?t c?a m?y b?n (VD: ZB-BT-84920) hi?n th? t?i m?c D?ng Th?.",
  },
  {
    icon: Coins,
    title: "3. Mua Key & Chuy?n Kho?n Chu?n",
    desc: "Nh?p m? thi?t b? l?n web, qu?t VietQR thanh to?n ??ng c? ph?p ?? h? th?ng ??i so?t t? ??ng.",
  },
  {
    icon: Key,
    title: "4. Nh?n Key & M? Kh?a Tr?n ??i",
    desc: "Nh?n License Key m? kh?a v?nh vi?n tr?c ti?p tr?n ??n h?ng ngay khi x?c nh?n. Ch?y 100% offline!",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(234,189,23,0.12)] border border-[rgba(234,189,23,0.3)] text-xs font-bold text-[var(--zb-gold-light)] mb-5">
          <Sparkles size={14} /> C?a H?ng S? Offline-First M?i 2026
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto uppercase">
          C?NG C? S? T?I V? D?NG TR?N ??I &amp;{" "}
          <span style={{ color: "var(--zb-gold)" }}>D?CH V? PH?T TRI?N PH?N M?M THEO Y?U C?U</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg max-w-3xl mx-auto text-[var(--zb-off-white)] opacity-90 leading-relaxed font-normal">
          &ldquo;D?ng th? 7 ng?y mi?n ph? ? Mua 1 l?n s? h?u v?nh vi?n ? 100% Ho?t ??ng Offline kh?ng c?n m?ng ? D? li?u b?o m?t tuy?t ??i tr?n thi?t b? c?a b?n. Kh?ng ph? duy tr? h?ng th?ng.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <a
            href="#san-pham"
            className="zb-btn-primary px-8 py-3.5 text-base shadow-lg hover:shadow-[rgba(234,189,23,0.3)] flex items-center gap-2"
          >
            <span>Kh?m Ph? Kho S?n Ph?m</span>
            <ArrowRight size={18} />
          </a>
          <Link
            href="/mua-key"
            className="px-6 py-3.5 rounded-lg font-bold border text-sm sm:text-base flex items-center gap-2 bg-[rgba(234,189,23,0.1)] border-[rgba(234,189,23,0.4)] text-[var(--zb-gold)] hover:bg-[rgba(234,189,23,0.2)] transition-all"
          >
            <Key size={18} />
            <span>Mua Key M? Kh?a B?n Quy?n</span>
          </Link>
          <Link
            href="/build"
            className="px-6 py-3.5 rounded-lg font-bold border text-sm sm:text-base flex items-center gap-2 hover:bg-[rgba(251,133,0,0.1)] transition-all"
            style={{ borderColor: "var(--zb-orange)", color: "var(--zb-orange)" }}
          >
            <Hammer size={18} />
            <span>Y?u C?u L?m App / Tool Ri?ng</span>
          </Link>
        </div>

        {/* 3 Cam K?t Bi?u T??ng (Trust Badges) */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
          {TRUST_BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="zb-card p-5 border border-[rgba(234,189,23,0.15)] flex items-start gap-3.5 hover:border-[rgba(234,189,23,0.3)] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: b.color }}
                >
                  <Icon size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-white">{b.title}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Catalog Section (#san-pham) */}
      <ProductCatalogSection />

      {/* Bundle / Combo Ti?t Ki?m (#combo) */}
      <section id="combo" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            Ti?t Ki?m L?n ??n 35%
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            B? S?u T?p Bundle Chuy?n Bi?t
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            S? h?u tr?n b? c?ng c? cho t?ng ng?nh ngh? v?i m?c gi? ?u ??i ??c bi?t.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BUNDLES.map((b) => (
            <div
              key={b.id}
              className="zb-card p-6 flex flex-col justify-between border border-[rgba(234,189,23,0.25)] relative overflow-hidden bg-gradient-to-b from-[#133e63] to-[#0a273f] hover:border-[var(--zb-gold)] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    {b.badge}
                  </span>
                  <span className="text-xs text-[var(--zb-muted)]">3?4 ?ng d?ng</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{b.name}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{b.tagline}</p>
                </div>

                <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  <div className="text-xs text-[var(--zb-muted)] line-through">
                    Gi? g?c: {formatVnd(b.originalPrice)}
                  </div>
                  <div className="text-2xl font-black text-[var(--zb-gold)] mt-0.5">
                    {formatVnd(b.bundlePrice)}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[rgba(255,255,255,0.08)]">
                <Link
                  href={`/build?bundle=${b.id}`}
                  className="zb-btn-primary w-full py-2.5 text-xs font-bold justify-center shadow-md flex items-center gap-1.5"
                >
                  <span>??ng K? S? H?u Tr?n B?</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 B??c Quy Tr?nh */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            ??n Gi?n &amp; Minh B?ch
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Quy Tr?nh D?ng Th? 7 Ng?y &amp; K?ch Ho?t B?n Quy?n
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Tr?i nghi?m mi?n ph? kh?ng gi?i h?n tr??c khi quy?t ??nh mua b?n quy?n.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="zb-card p-5 space-y-2.5 border border-[rgba(255,255,255,0.08)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(234,189,23,0.12)] text-[var(--zb-gold)] flex items-center justify-center">
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-sm text-white">{title}</h3>
              <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Section Gi?i Thi?u D?ch V? Build Theo Y?u C?u */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="zb-card p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-gradient-to-r from-[#12406a] to-[#0a2d47] border border-[rgba(251,133,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(251,133,0,0.15)] text-[var(--zb-orange)] flex items-center justify-center shrink-0 border border-[rgba(251,133,0,0.3)]">
              <Hammer size={26} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                C?n M?t ?ng D?ng Ho?c Mini Tool ???c ?o Ni ??ng Gi?y Ri?ng?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--zb-muted)] max-w-2xl leading-relaxed">
                Zeebee nh?n may ?o Mini App Android, Website qu?n tr? n?i b?, tool t? ??ng h?a theo ??ng bi?u m?u v? quy tr?nh c?a b?n. B?n giao 7 ? 14 ng?y, s? h?u 100% m? ngu?n.
              </p>
            </div>
          </div>
          <Link
            href="/build"
            className="px-6 py-3 rounded-xl font-bold text-sm text-white shrink-0 shadow-lg transition-all"
            style={{
              backgroundColor: "var(--zb-orange)",
              boxShadow: "0 4px 15px rgba(251, 133, 0, 0.4)",
            }}
          >
            Nh?n B?o Gi? May ?o Ri?ng ?
          </Link>
        </div>
      </section>

      {/* H??ng D?n & Cam K?t B?o H?nh (#huong-dan) */}
      <section id="huong-dan" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="zb-card p-6 sm:p-8 border border-[rgba(255,255,255,0.08)]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <HelpCircle size={20} className="text-[var(--zb-gold)]" /> H??ng D?n K?ch Ho?t &amp; Cam K?t B?n Quy?n
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-[var(--zb-muted)] leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> D?ng th? 7 ng?y mi?n ph?
              </h3>
              <p>
                T?i file v? m?y m? tr?c ti?p tr?n ?i?n tho?i ho?c m?y t?nh. M?i t?nh n?ng ho?t ??ng 100% offline kh?ng gi?i h?n trong 7 ng?y.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> M? k?ch ho?t tr?n ??i
              </h3>
              <p>
                M?i thi?t b? c? m?t m? ??nh danh ri?ng. Sau 7 ng?y, b?n mua key m? kh?a ?? s? h?u tr?n ??i kh?ng bao gi? ph?t sinh thu? bao.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> H? tr? k? thu?t 24/7
              </h3>
              <p>
                ??i ng? k? thu?t vi?n Zeebee h? tr? x? l? s? c? c?i ??t qua Zalo ho?c UltraViewer. Cam k?t ho?n ti?n 100% n?u s?n ph?m kh?ng ??ng nh? m? t? cam k?t.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
