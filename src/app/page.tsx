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
    desc: "Hoạt động độc lập ngay cả khi mất mạng. Không phụ thuộc máy chủ trung gian.",
    color: "var(--zb-gold)",
  },
  {
    icon: ShieldCheck,
    title: "Bảo Mật Cục Bộ Tuyệt Đối",
    desc: "Toàn bộ dữ liệu khách hàng, sổ sách lưu trực tiếp trên thiết bị của bạn.",
    color: "#34d399",
  },
  {
    icon: Coins,
    title: "Mua 1 Lần — Dùng Vĩnh Viễn",
    desc: "Trả phí duy nhất một lần. Tuyệt đối không bao giờ phát sinh phí duy trì hàng tháng.",
    color: "var(--zb-orange)",
  },
];

const STEPS = [
  {
    icon: Download,
    title: "1. Tải Về Dùng Thử 7 Ngày",
    desc: "Tải ứng dụng về máy hoặc điện thoại, trải nghiệm 100% full tính năng không giới hạn trong 7 ngày miễn phí.",
  },
  {
    icon: PlayCircle,
    title: "2. Lấy Mã Thiết Bị (Device Code)",
    desc: "Mở ứng dụng xem Mã thiết bị độc nhất của máy bạn (VD: ZB-BT-84920) hiển thị tại mục Dùng Thử.",
  },
  {
    icon: Coins,
    title: "3. Mua Key & Chuyển Khoản Chuẩn",
    desc: "Nhập mã thiết bị lên web, quét VietQR thanh toán đúng cú pháp để hệ thống đối soát tự động.",
  },
  {
    icon: Key,
    title: "4. Nhận Key & Mở Khóa Trọn Đời",
    desc: "Nhận License Key mở khóa vĩnh viễn trực tiếp trên đơn hàng ngay khi xác nhận. Chạy 100% offline!",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(234,189,23,0.12)] border border-[rgba(234,189,23,0.3)] text-xs font-bold text-[var(--zb-gold-light)] mb-5">
          <Sparkles size={14} /> Cửa Hàng Số Offline-First Mới 2026
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto uppercase">
          CÔNG CỤ SỐ TẢI VỀ DÙNG TRỌN ĐỜI &amp;{" "}
          <span style={{ color: "var(--zb-gold)" }}>DỊCH VỤ PHÁT TRIỂN PHẦN MỀM THEO YÊU CẦU</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg max-w-3xl mx-auto text-[var(--zb-off-white)] opacity-90 leading-relaxed font-normal">
          &ldquo;Dùng thử 7 ngày miễn phí — Mua 1 lần sở hữu vĩnh viễn — 100% Hoạt động Offline không cần mạng — Dữ liệu bảo mật tuyệt đối trên thiết bị của bạn. Không phí duy trì hàng tháng.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <a
            href="#san-pham"
            className="zb-btn-primary px-8 py-3.5 text-base shadow-lg hover:shadow-[rgba(234,189,23,0.3)] flex items-center gap-2"
          >
            <span>Khám Phá Kho Sản Phẩm</span>
            <ArrowRight size={18} />
          </a>
          <Link
            href="/mua-key"
            className="px-6 py-3.5 rounded-lg font-bold border text-sm sm:text-base flex items-center gap-2 bg-[rgba(234,189,23,0.1)] border-[rgba(234,189,23,0.4)] text-[var(--zb-gold)] hover:bg-[rgba(234,189,23,0.2)] transition-all"
          >
            <Key size={18} />
            <span>Mua Key Mở Khóa Bản Quyền</span>
          </Link>
          <Link
            href="/build"
            className="px-6 py-3.5 rounded-lg font-bold border text-sm sm:text-base flex items-center gap-2 hover:bg-[rgba(251,133,0,0.1)] transition-all"
            style={{ borderColor: "var(--zb-orange)", color: "var(--zb-orange)" }}
          >
            <Hammer size={18} />
            <span>Yêu Cầu Làm App / Tool Riêng</span>
          </Link>
        </div>

        {/* 3 Cam Kết Biểu Tượng (Trust Badges) */}
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

      {/* Bundle / Combo Tiết Kiệm (#combo) */}
      <section id="combo" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            Tiết Kiệm Lên Đến 35%
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Bộ Sưu Tập Bundle Chuyên Biệt
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Sở hữu trọn bộ công cụ cho từng ngành nghề với mức giá ưu đãi đặc biệt.
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
                  <span className="text-xs text-[var(--zb-muted)]">3–4 ứng dụng</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{b.name}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{b.tagline}</p>
                </div>

                <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  <div className="text-xs text-[var(--zb-muted)] line-through">
                    Giá gốc: {formatVnd(b.originalPrice)}
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
                  <span>Đăng Ký Sở Hữu Trọn Bộ</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Bước Quy Trình */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            Đơn Giản &amp; Minh Bạch
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Quy Trình Dùng Thử 7 Ngày &amp; Kích Hoạt Bản Quyền
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Trải nghiệm miễn phí không giới hạn trước khi quyết định mua bản quyền.
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

      {/* Section Giới Thiệu Dịch Vụ Build Theo Yêu Cầu */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="zb-card p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-gradient-to-r from-[#12406a] to-[#0a2d47] border border-[rgba(251,133,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(251,133,0,0.15)] text-[var(--zb-orange)] flex items-center justify-center shrink-0 border border-[rgba(251,133,0,0.3)]">
              <Hammer size={26} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Cần Một Ứng Dụng Hoặc Mini Tool Được Đo Ni Đóng Giày Riêng?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--zb-muted)] max-w-2xl leading-relaxed">
                Zeebee nhận may đo Mini App Android, Website quản trị nội bộ, tool tự động hóa theo đúng biểu mẫu và quy trình của bạn. Bàn giao 7 – 14 ngày, sở hữu 100% mã nguồn.
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
            Nhận Báo Giá May Đo Riêng →
          </Link>
        </div>
      </section>

      {/* Hướng Dẫn & Cam Kết Bản Quyền (#huong-dan) */}
      <section id="huong-dan" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="zb-card p-6 sm:p-8 border border-[rgba(255,255,255,0.08)]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <HelpCircle size={20} className="text-[var(--zb-gold)]" /> Hướng Dẫn Kích Hoạt &amp; Cam Kết Bản Quyền
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-[var(--zb-muted)] leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Dùng thử 7 ngày miễn phí
              </h3>
              <p>
                Tải file về máy mở trực tiếp trên điện thoại hoặc máy tính. Mọi tính năng hoạt động 100% offline không giới hạn trong 7 ngày.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Mã kích hoạt trọn đời
              </h3>
              <p>
                Mỗi thiết bị có một mã định danh riêng. Sau 7 ngày, bạn mua key mở khóa để sở hữu trọn đời không bao giờ phát sinh thuê bao.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Hỗ trợ kỹ thuật 24/7
              </h3>
              <p>
                Đội ngũ kỹ thuật viên Zeebee hỗ trợ xử lý sự cố cài đặt qua Zalo hoặc UltraViewer. Cam kết hoàn tiền 100% nếu sản phẩm không đúng như mô tả cam kết.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
