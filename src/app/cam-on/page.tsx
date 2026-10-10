import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Đã nhận yêu cầu | app.zeebee.vn", robots: { index: false } };
export const dynamic = "force-dynamic";

// Hành trình khách DỪNG ở đây: nói rõ bước tiếp theo (Seller liên hệ khi nào) để khách yên tâm rời trang.
export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ ma?: string; loai?: string }> }) {
  const { ma, loai } = await searchParams;
  const vnHour = Number(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour: "numeric", hour12: false })
  );
  const inWorkingHours = vnHour >= 8 && vnHour < 21;

  const what = loai === "build" ? "yêu cầu build" : loai === "cho" ? "đăng ký" : "đơn hàng";
  const next =
    loai === "cho"
      ? "Zeebee sẽ nhắn Zalo cho bạn ngay khi sản phẩm ra mắt, kèm ưu đãi cho người đăng ký sớm."
      : inWorkingHours
        ? `Seller sẽ gọi hoặc nhắn Zalo cho bạn trong khoảng 15 phút để ${loai === "build" ? "hỏi thêm và báo giá" : "xác nhận và bàn giao"}.`
        : `Hiện đã ngoài giờ làm việc (8h–21h). Seller sẽ gọi hoặc nhắn Zalo cho bạn vào sáng mai để ${loai === "build" ? "hỏi thêm và báo giá" : "xác nhận và bàn giao"}.`;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <div className="zb-card p-6 sm:p-8 space-y-4 text-center">
          <CheckCircle2 size={48} className="mx-auto" style={{ color: "var(--zb-gold)" }} />
          <h1 className="text-2xl font-bold">Cảm ơn bạn! Zee Bee đã nhận {what}.</h1>
          {ma && (
            <p className="text-sm" style={{ color: "var(--zb-muted)" }}>
              Mã của bạn: <strong className="font-mono" style={{ color: "var(--zb-white)" }}>{ma}</strong>
            </p>
          )}
          <p>{next}</p>
          <p className="text-sm" style={{ color: "var(--zb-muted)" }}>
            Bạn chưa cần thanh toán. Có thể đóng trang này.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="https://zalo.me/0976094453"
              target="_blank"
              rel="noopener noreferrer"
              className="zb-btn-primary px-5 py-3 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Cần gấp? Nhắn Zalo
            </a>
            <Link href="/" className="px-5 py-3 rounded-lg border" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              Xem sản phẩm khác
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
