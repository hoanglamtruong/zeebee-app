import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, Gamepad2, AppWindow, FileSpreadsheet, Palette } from "lucide-react";
import { PRODUCTS, MODEL_LABEL, getProduct, formatVnd } from "@/lib/catalog";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import OrderForm from "@/components/OrderForm";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: `${product.name} | app.zeebee.vn`, description: product.tagline } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const soon = product.status === "coming_soon";
  const Icon = { "Mini app": AppWindow, Game: Gamepad2, "File Excel": FileSpreadsheet, "Mẫu thiết kế": Palette }[product.kind];
  const isSub = product.model === "subscription";

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <Link href={isSub ? "/#thue-bao" : "/#san-pham"} className="inline-flex items-center gap-1 text-sm mb-4" style={{ color: "var(--zb-muted)" }}>
          <ArrowLeft size={16} /> Tất cả sản phẩm
        </Link>

        <div className="grid md:grid-cols-[1fr_360px] gap-6 items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Icon size={36} style={{ color: "var(--zb-gold)" }} />
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "var(--zb-muted)" }}>
                {MODEL_LABEL[product.model]} · {soon ? "Sắp ra mắt" : product.kind}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <p style={{ color: "var(--zb-muted)" }}>{product.description}</p>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={18} className="shrink-0" style={{ color: "var(--zb-gold)" }} /> {f}
                </li>
              ))}
            </ul>

            {product.demoUrl ? (
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold border"
                style={{ borderColor: "var(--zb-gold)", color: "var(--zb-gold)" }}
              >
                Dùng thử miễn phí <ExternalLink size={16} />
              </a>
            ) : (
              !soon && (
                <p className="text-sm" style={{ color: "var(--zb-muted)" }}>
                  Bản dùng thử online đang được chuẩn bị — đặt mua để Seller gửi video demo qua Zalo.
                </p>
              )
            )}
          </div>

          <aside className="space-y-3 md:sticky md:top-4">
            <div className="text-2xl font-bold" style={{ color: "var(--zb-gold)" }}>
              {formatVnd(product.price)}
              {isSub && <span className="text-base font-normal">/tháng</span>}
            </div>
            <p className="text-xs" style={{ color: "var(--zb-muted)" }}>
              {soon
                ? "Giá dự kiến khi ra mắt. Đăng ký để được báo đầu tiên kèm ưu đãi."
                : isSub
                  ? `Hoặc ${formatVnd(product.yearlyPrice ?? product.price * 10)}/năm. Seller tạo tài khoản và hướng dẫn sau khi xác nhận.`
                  : `Trả một lần, dùng trọn đời. Nhận: ${product.delivery}.`}
            </p>
            <OrderForm
              productSlug={product.slug}
              comingSoon={soon}
              plans={
                isSub && !soon
                  ? [
                      { id: "month", label: `Theo tháng — ${formatVnd(product.price)}` },
                      { id: "year", label: `Theo năm — ${formatVnd(product.yearlyPrice ?? product.price * 10)}` },
                    ]
                  : undefined
              }
              priceLabel={formatVnd(product.price)}
            />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
