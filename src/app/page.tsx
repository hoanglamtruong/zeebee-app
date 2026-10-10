import Link from "next/link";
import { Gamepad2, AppWindow, PlayCircle, Hammer, MessageSquareText, PhoneCall, PackageCheck } from "lucide-react";
import { PRODUCTS, formatVnd } from "@/lib/catalog";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

// VÒNG 2 (11/10/2026): app.zeebee.vn = cửa hàng sản phẩm số ĐÓNG GÓI (giá cố định, dùng thử trước)
// + dịch vụ BUILD THEO YÊU CẦU (custom, báo giá theo yêu cầu cụ thể). Thay trang giới thiệu 3 gói cũ.

const STEPS = [
  { icon: PlayCircle, title: "Dùng thử", desc: "Mở bản chạy thật ngay trên trình duyệt, không cần đăng ký." },
  { icon: MessageSquareText, title: "Để lại tên + SĐT", desc: "Chỉ 2 thông tin. Chưa cần thanh toán." },
  { icon: PhoneCall, title: "Seller liên hệ", desc: "Gọi hoặc nhắn Zalo trong 15 phút để xác nhận." },
  { icon: PackageCheck, title: "Nhận sản phẩm", desc: "Bàn giao tài khoản / link cài đặt, hướng dẫn dùng." },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          App &amp; game nhỏ, <span style={{ color: "var(--zb-gold)" }}>dùng được ngay</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto" style={{ color: "var(--zb-muted)" }}>
          Mini app và game chạy trên điện thoại lẫn máy tính, cài lên màn hình như app thật. Dùng thử miễn phí trước khi
          mua. Cần thứ riêng cho bạn? Zee Bee build theo yêu cầu.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#san-pham" className="zb-btn-primary px-6 py-3">
            Xem sản phẩm
          </a>
          <Link
            href="/build"
            className="px-6 py-3 rounded-lg font-bold border"
            style={{ borderColor: "var(--zb-gold)", color: "var(--zb-gold)" }}
          >
            Build theo yêu cầu
          </Link>
        </div>
      </section>

      <section id="san-pham" className="max-w-5xl mx-auto px-4 sm:px-6 py-6 scroll-mt-4">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm số</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((p) => {
            const Icon = p.kind === "Game" ? Gamepad2 : AppWindow;
            const soon = p.status === "coming_soon";
            return (
              <Link key={p.slug} href={`/san-pham/${p.slug}`} className="zb-card p-5 flex flex-col gap-3 hover:brightness-110">
                <div className="flex items-center justify-between">
                  <Icon size={28} style={{ color: "var(--zb-gold)" }} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "var(--zb-muted)" }}>
                    {soon ? "Sắp ra mắt" : p.kind}
                  </span>
                </div>
                <h3 className="font-semibold leading-snug">{p.name}</h3>
                <p className="text-sm flex-1" style={{ color: "var(--zb-muted)" }}>
                  {p.tagline}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold" style={{ color: "var(--zb-gold)" }}>
                    {soon ? "Đăng ký chờ" : formatVnd(p.price)}
                  </span>
                  <span className="text-xs" style={{ color: "var(--zb-muted)" }}>
                    {p.demoUrl ? "Có bản dùng thử →" : "Xem chi tiết →"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-semibold mb-4">Mua thế nào?</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="zb-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: "var(--zb-gold)", color: "var(--zb-navy-dark)" }}>
                  {i + 1}
                </span>
                <Icon size={18} style={{ color: "var(--zb-gold)" }} />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm" style={{ color: "var(--zb-muted)" }}>
                {desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="zb-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Hammer size={40} style={{ color: "var(--zb-gold)" }} className="shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Cần website, tool hay app riêng?</h2>
            <p className="text-sm mt-1" style={{ color: "var(--zb-muted)" }}>
              Không bán theo gói — bạn mô tả nhu cầu, Zee Bee báo giá đúng phần việc. Gửi yêu cầu mất khoảng 2 phút.
            </p>
          </div>
          <Link href="/build" className="zb-btn-primary px-5 py-3 shrink-0">
            Gửi yêu cầu build
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
