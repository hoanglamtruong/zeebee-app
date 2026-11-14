import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Zap,
  Download,
  Sparkles,
  Gamepad2,
  Smartphone,
  FileSpreadsheet,
  Layers,
  Key,
} from "lucide-react";
import { PRODUCTS, getProduct, getProductTheme, formatVnd } from "@/lib/catalog";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import ProductPurchaseBox from "@/components/ProductPurchaseBox";
import GameCoverArt from "@/components/GameCoverArt";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product
    ? {
        title: `${product.name} — Game Android APK Offline | app.zeebee.vn`,
        description: product.tagline,
      }
    : {};
}

function getProductIcon(kind: string) {
  if (kind.includes("Game")) return Gamepad2;
  if (kind.includes("Excel")) return FileSpreadsheet;
  if (kind.includes("APK") || kind.includes("Android")) return Smartphone;
  return Layers;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const soon = product.status === "coming_soon";
  const Icon = getProductIcon(product.kind);
  const theme = getProductTheme(product);

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Link
          href="/#san-pham"
          className="inline-flex items-center gap-1.5 text-sm mb-6 hover:text-[var(--zb-gold)] transition-colors"
          style={{ color: "var(--zb-muted)" }}
        >
          <ArrowLeft size={16} /> Quay lại kho game
        </Link>

        <div className="grid md:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Main Info */}
          <div className="space-y-6">
            {/* Visual Game Box & Hero Info */}
            <div className="zb-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-[#12406a] to-[#082238] border border-[rgba(234,189,23,0.3)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--zb-gold)] opacity-5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* 3D Game Box Art */}
                <div
                  className="relative w-[150px] h-[225px] rounded-r-lg overflow-hidden shrink-0 border-t border-r border-b shadow-2xl transition-transform duration-300 hover:scale-105"
                  style={{
                    background: theme.coverGradient || theme.spineColor,
                    borderColor: "rgba(255,255,255,0.25)",
                    boxShadow: `
                      0 20px 25px -5px rgba(0, 0, 0, 0.7),
                      0 0 25px ${theme.glowColor || 'transparent'}
                    `,
                  }}
                >
                  <GameCoverArt product={product} />
                </div>

                {/* Right Info Details */}
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                      <Gamepad2 size={13} /> {product.gameMode}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.08)] text-[var(--zb-off-white)]">
                      {product.format} · {product.playerCount}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                    {product.name}
                  </h1>
                  <p className="text-sm sm:text-base text-[var(--zb-off-white)] opacity-90 leading-relaxed">
                    {product.tagline}
                  </p>

                  {product.mockupIdea && (
                    <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-start gap-2 text-xs text-[var(--zb-muted)] italic">
                      <span className="font-semibold not-italic text-[var(--zb-gold)] shrink-0">
                        Ý tưởng thiết kế:
                      </span>
                      <span>{product.mockupIdea}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="zb-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap size={18} className="text-[var(--zb-gold)]" /> Mô tả chi tiết tính năng
              </h2>
              <p className="text-sm leading-relaxed text-[var(--zb-off-white)]">
                {product.description}
              </p>

              <div className="pt-2">
                <h3 className="text-sm font-semibold mb-3 text-[var(--zb-gold)]">
                  Tính năng cốt lõi nổi bật:
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--zb-off-white)]">
                      <Check size={17} className="shrink-0 text-[var(--zb-gold)] mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Offline-First Commitments */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="zb-card p-4 text-center space-y-1">
                <Zap size={22} className="mx-auto text-[var(--zb-gold)]" />
                <h4 className="text-xs font-bold">100% Offline-First</h4>
                <p className="text-[11px] text-[var(--zb-muted)]">Chạy độc lập, không cần mạng</p>
              </div>
              <div className="zb-card p-4 text-center space-y-1">
                <ShieldCheck size={22} className="mx-auto text-emerald-400" />
                <h4 className="text-xs font-bold">Bảo Mật Cục Bộ</h4>
                <p className="text-[11px] text-[var(--zb-muted)]">Dữ liệu lưu 100% trên máy bạn</p>
              </div>
              <div className="zb-card p-4 text-center space-y-1">
                <Key size={22} className="mx-auto text-[var(--zb-orange)]" />
                <h4 className="text-xs font-bold">Mua Key Trọn Đời</h4>
                <p className="text-[11px] text-[var(--zb-muted)]">Không bao giờ thu phí duy trì</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Trial Download & Key Checkout */}
          <aside className="space-y-4 md:sticky md:top-20">
            <ProductPurchaseBox product={product} />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
