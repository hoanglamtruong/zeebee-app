import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Đã nhận yêu cầu thành công | app.zeebee.vn",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ma?: string; loai?: string }>;
}) {
  const { ma, loai } = await searchParams;
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
    ? "yêu cầu may đo phần mềm"
    : isPreorder
      ? "đăng ký nhận mã ưu đãi 50%"
      : "đơn đặt mua sản phẩm tải về";

  const next = isPreorder
    ? "Bạn là một trong những khách hàng đầu tiên đăng ký! Đội ngũ Zeebee sẽ tự động nhắn Zalo gửi file cài đặt/công cụ kèm Mã Kích Hoạt giảm giá 50% ngay khi sản phẩm xuất xưởng."
    : inWorkingHours
      ? `Chuyên viên hỗ trợ sẽ liên hệ qua Zalo/gọi điện cho bạn trong khoảng 15 phút để ${
          isBuild ? "trao đổi chi tiết bài toán và gửi báo giá" : "xác nhận và gửi file bàn giao bản quyền"
        }.`
      : `Hiện đã ngoài khung giờ làm việc (8h–21h). Chuyên viên sẽ liên hệ qua Zalo cho bạn vào đầu giờ sáng mai để ${
          isBuild ? "trao đổi chi tiết và gửi báo giá" : "xác nhận và gửi file bàn giao bản quyền"
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
              Cảm Ơn Bạn! Zeebee Đã Nhận {what}.
            </h1>
            {ma && (
              <p className="text-xs text-[var(--zb-muted)]">
                Mã theo dõi yêu cầu của bạn:{" "}
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
              ? "Bạn hoàn toàn chưa phải trả bất kỳ khoản phí nào."
              : "Bạn chưa cần thanh toán ngay — xem và duyệt thử rồi mới quyết định chuyển khoản."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="https://zalo.me/0976094453"
              target="_blank"
              rel="noopener noreferrer"
              className="zb-btn-primary px-5 py-3 text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle size={16} /> Cần Hỗ Trợ Gấp? Nhắn Zalo
            </a>
            <Link
              href="/#san-pham"
              className="px-5 py-3 rounded-lg border text-xs sm:text-sm text-[var(--zb-off-white)] hover:bg-white/5 transition-all inline-flex items-center justify-center gap-1.5"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <span>Xem Thêm Sản Phẩm Khác</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
