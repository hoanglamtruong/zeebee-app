import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Coins,
  Sparkles,
  Hammer,
  PlayCircle,
  MessageSquareText,
  PhoneCall,
  PackageCheck,
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
    icon: PlayCircle,
    title: "1. Chọn Sản Phẩm",
    desc: "Khám phá danh mục công cụ kỹ thuật, bán hàng, game Bluetooth hoặc file Excel chuyên nghiệp.",
  },
  {
    icon: MessageSquareText,
    title: "2. Để Lại Tên & Số Zalo",
    desc: "Chỉ cần 2 thông tin cơ bản. Bạn hoàn toàn chưa cần thanh toán tại bước này.",
  },
  {
    icon: PhoneCall,
    title: "3. Seller Liên Hệ Xác Nhận",
    desc: "Chuyên viên liên hệ qua Zalo trong 15 phút, gửi bản dùng thử / demo trước khi bạn quyết định.",
  },
  {
    icon: PackageCheck,
    title: "4. Nhận File & Bắt Đầu Dùng",
    desc: "Nhận file bộ cài APK, file HTML hoặc file Excel bản quyền kèm tài liệu hướng dẫn chi tiết.",
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
          &ldquo;Mua 1 lần — Sở hữu vĩnh viễn — 100% Hoạt động Offline không cần mạng — Dữ liệu bảo mật tuyệt đối trên thiết bị của bạn. Không phí duy trì hàng tháng.&rdquo;
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

      {/* Grid Sản Phẩm Lọc Theo Danh Mục (17 sản phẩm) */}
      <ProductCatalogSection />

      {/* Section Bộ Sưu Tập Bundle / Combo (Giảm 35%) */}
      <section id="combo" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="zb-card p-6 sm:p-10 border border-[rgba(234,189,23,0.35)] relative overflow-hidden bg-gradient-to-br from-[#12406a] to-[#082339]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} /> Gói Tiết Kiệm Đặc Biệt
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Bộ Sưu Tập Bundle (Combo) — Giảm Đến 35%
              </h2>
              <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1 max-w-2xl">
                Sở hữu trọn bộ giải pháp chuyên ngành với mức giá ưu đãi nhất. Mua chung theo nhóm công cụ để tối ưu hiệu quả làm việc.
              </p>
            </div>
            <a
              href="https://zalo.me/0976094453"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--zb-gold)] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Tùy biến combo theo nhu cầu riêng? Nhắn Zalo</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className="p-6 rounded-2xl bg-[rgba(10,45,71,0.7)] border border-[rgba(234,189,23,0.25)] flex flex-col justify-between space-y-5 hover:border-[var(--zb-gold)] transition-all hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                      {bundle.badge}
                    </span>
                    <span className="text-xs text-[var(--zb-muted)] line-through">
                      {formatVnd(bundle.originalPrice)}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white leading-snug">{bundle.name}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{bundle.tagline}</p>

                  <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                    <span className="text-xs text-[var(--zb-muted)] block">Giá ưu đãi trọn gói:</span>
                    <div className="text-2xl font-black text-[var(--zb-gold)]">
                      {formatVnd(bundle.bundlePrice)}
                    </div>
                  </div>
                </div>

                <a
                  href={`https://zalo.me/0976094453?text=${encodeURIComponent(
                    `Xin chào Zeebee, tôi muốn đăng ký nhận tư vấn và đặt mua ${bundle.name} (giá ưu đãi ${formatVnd(
                      bundle.bundlePrice
                    )}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg text-center text-xs font-bold bg-[var(--zb-gold)] text-[var(--zb-navy-dark)] hover:bg-[var(--zb-gold-light)] transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={14} /> Nhận Combo Tiết Kiệm 35%
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quy Trình Đặt Hàng & Bàn Giao */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            Đơn Giản &amp; An Tâm
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Quy Trình Đặt Hàng &amp; Nhận Sản Phẩm
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Bạn luôn được duyệt thử tính năng trước khi quyết định thanh toán.
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

      {/* Hướng Dẫn & Cam Kết Bảo Hành (#huong-dan) */}
      <section id="huong-dan" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="zb-card p-6 sm:p-8 border border-[rgba(255,255,255,0.08)]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <HelpCircle size={20} className="text-[var(--zb-gold)]" /> Hướng Dẫn Kích Hoạt &amp; Cam Kết Bảo Hành
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-[var(--zb-muted)] leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Cài đặt &amp; Mở file
              </h3>
              <p>
                File HTML/Excel mở trực tiếp trên máy tính hoặc điện thoại mà không cần cài thêm phần mềm phức tạp. File APK Android chỉ cần chạm vào tệp tải về để cài đặt trong 10 giây.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Mã kích hoạt bản quyền
              </h3>
              <p>
                Mỗi khách hàng được cấp mã kích hoạt hoặc phiên bản file đã gắn bản quyền riêng tương ứng với số điện thoại đặt hàng, đảm bảo quyền sở hữu vĩnh viễn.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Hỗ trợ kỹ thuật 24/7
              </h3>
              <p>
                Đội ngũ kỹ thuật viên Zeebee hỗ trợ xử lý sự cố cài đặt qua Zalo hoặc UltraViewer/AnyDesk. Cam kết hoàn tiền 100% nếu sản phẩm không đúng như mô tả cam kết.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
