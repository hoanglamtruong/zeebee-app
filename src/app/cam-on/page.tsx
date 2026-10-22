import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "?? nh?n y?u c?u th?nh c?ng | app.zeebee.vn",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ma?: string; loai?: string }>;
}) {
  const { ma, loai } = await searchParams;

  // N?u l? ??n mua key, chuy?n th?ng sang m?n h?nh ??n h?ng & thanh to?n VietQR
  if (ma && (ma.startsWith("ZB-KEY") || loai === "key")) {
    redirect(`/don-hang/${encodeURIComponent(ma)}`);
  }

  const vnHour = Number(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "numeric",
      hour12: false,
    })
  );
  const inWorkingHours = vnHour >= 8 && vnHour < 21;

  const isPreorder = loai === "cho";
  const isBuild = loai === "build";

  const what = isBuild
    ? "y?u c?u may ?o ph?n m?m"
    : isPreorder
      ? "??ng k? nh?n m? ?u ??i 50%"
      : "??n ??t mua s?n ph?m t?i v?";

  const next = isPreorder
    ? "B?n l? m?t trong nh?ng kh?ch h?ng ??u ti?n ??ng k?! ??i ng? Zeebee s? t? ??ng nh?n Zalo g?i file c?i ??t/c?ng c? k?m M? K?ch Ho?t gi?m gi? 50% ngay khi s?n ph?m xu?t x??ng."
    : inWorkingHours
      ? `Chuy?n vi?n h? tr? s? li?n h? qua Zalo/g?i ?i?n cho b?n trong kho?ng 15 ph?t ?? ${
          isBuild ? "trao ??i chi ti?t b?i to?n v? g?i b?o gi?" : "x?c nh?n v? g?i file b?n giao b?n quy?n"
        }.`
      : `Hi?n ?? ngo?i khung gi? l?m vi?c (8h?21h). Chuy?n vi?n s? li?n h? qua Zalo cho b?n v?o ??u gi? s?ng mai ?? ${
          isBuild ? "trao ??i chi ti?t v? g?i b?o gi?" : "x?c nh?n v? g?i file b?n giao b?n quy?n"
        }.`;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="max-w-xl mx-auto px-4 sm:px-6 py-14">
        <div className="zb-card p-6 sm:p-8 space-y-5 text-center border border-[rgba(234,189,23,0.3)] shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[rgba(234,189,23,0.15)] text-[var(--zb-gold)] flex items-center justify-center mx-auto border border-[rgba(234,189,23,0.3)]">
            {isPreorder ? <Sparkles size={32} /> : <CheckCircle2 size={36} />}
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              C?m ?n B?n! Zeebee ?? Nh?n {what}.
            </h1>
            {ma && (
              <p className="text-xs text-[var(--zb-muted)]">
                M? theo d?i y?u c?u c?a b?n:{" "}
                <strong className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">
                  {ma}
                </strong>
              </p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm leading-relaxed text-[var(--zb-off-white)]">
            {next}
          </div>

          <p className="text-xs text-[var(--zb-muted)]">
            {isPreorder
              ? "B?n ho?n to?n ch?a ph?i tr? b?t k? kho?n ph? n?o."
              : "B?n ch?a c?n thanh to?n ngay ? xem v? duy?t th? r?i m?i quy?t ??nh chuy?n kho?n."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="https://zalo.me/0976094453"
              target="_blank"
              rel="noopener noreferrer"
              className="zb-btn-primary px-5 py-3 text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle size={16} /> C?n H? Tr? G?p? Nh?n Zalo
            </a>
            <Link
              href="/#san-pham"
              className="px-5 py-3 rounded-lg border text-xs sm:text-sm text-[var(--zb-off-white)] hover:bg-white/5 transition-all inline-flex items-center justify-center gap-1.5"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <span>Xem Th?m S?n Ph?m Kh?c</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
