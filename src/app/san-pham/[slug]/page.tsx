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
  HelpCircle,
} from "lucide-react";
import { PRODUCTS, getProduct, formatVnd, type Product } from "@/lib/catalog";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import OrderForm from "@/components/OrderForm";

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
        title: `${product.name} — Tải về dùng trọn đời | app.zeebee.vn`,
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

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Link
          href="/#san-pham"
          className="inline-flex items-center gap-1.5 text-sm mb-6 hover:text-[var(--zb-gold)] transition-colors"
          style={{ color: "var(--zb-muted)" }}
        >
          <ArrowLeft size={16} /> Quay lại danh mục sản phẩm
        </Link>

        <div className="grid md:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Main Info */}
          <div className="space-y-6">
            {/* Visual Mockup Card Container */}
            <div className="zb-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-[#12406a] to-[#082238] border border-[rgba(234,189,23,0.3)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--zb-gold)] opacity-5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[rgba(234,189,23,0.15)] text-[var(--zb-gold)] border border-[rgba(234,189,23,0.3)]">
                    <Icon size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.08)] text-[var(--zb-off-white)]">
                      {product.format}
                    </span>
                  </div>
                </div>

                {soon ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    <Sparkles size={13} /> Sắp ra mắt · Ưu đãi 50%
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <Check size={13} /> Sẵn sàng tải ngay
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-base text-[var(--zb-off-white)] opacity-90 leading-relaxed">
                {product.tagline}
              </p>

              {product.mockupIdea && (
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-start gap-2 text-xs text-[var(--zb-muted)] italic">
                  <span className="font-semibold not-italic text-[var(--zb-gold)] shrink-0">
                    Mockup thiết kế:
                  </span>
                  <span>{product.mockupIdea}</span>
                </div>
              )}
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
                <p className="text-[11px] text-[var(--zb-muted)]">Chạy độc lập, không sợ mất mạng</p>
              </div>
              <div className="zb-card p-4 text-center space-y-1">
                <ShieldCheck size={22} className="mx-auto text-emerald-400" />
                <h4 className="text-xs font-bold">Bảo Mật Cục Bộ</h4>
                <p className="text-[11px] text-[var(--zb-muted)]">Dữ liệu lưu 100% trên máy của bạn</p>
              </div>
              <div className="zb-card p-4 text-center space-y-1">
                <Download size={22} className="mx-auto text-[var(--zb-orange)]" />
                <h4 className="text-xs font-bold">Mua 1 Lần Dùng Mãi</h4>
                <p className="text-[11px] text-[var(--zb-muted)]">Không bao giờ thu phí duy trì</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Checkout Form */}
          <aside className="space-y-4 md:sticky md:top-20">
            <div className="zb-card p-5 space-y-3 bg-[#0d3452]">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-[var(--zb-muted)]">
                  {soon ? "Giá niêm yết khi ra mắt:" : "Giá bán sở hữu trọn đời:"}
                </span>
                <span className="text-2xl font-black text-[var(--zb-gold)]">
                  {formatVnd(product.price)}
                </span>
              </div>

              {soon && (
                <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-200">
                  <span>Giá ưu đãi người đăng ký sớm (-50%):</span>
                  <strong className="text-sm font-bold text-[var(--zb-gold-light)]">
                    {formatVnd(Math.round(product.price * 0.5))}
                  </strong>
                </div>
              )}

              <div className="text-xs pt-1 space-y-1 text-[var(--zb-muted)]">
                <p className="flex items-center gap-1.5">
                  <Download size={14} className="text-[var(--zb-gold)]" />
                  <span><strong>Hình thức bàn giao:</strong> {product.delivery}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Bảo hành cập nhật lỗi kỹ thuật trọn đời</span>
                </p>
              </div>
            </div>

            <OrderForm
              productSlug={product.slug}
              comingSoon={soon}
              priceLabel={formatVnd(product.price)}
            />

            <div className="text-center">
              <a
                href="https://zalo.me/0976094453"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--zb-gold)] hover:underline"
              >
                <HelpCircle size={14} /> Cần tư vấn thêm trước khi đặt? Chat Zalo ngay
              </a>
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
