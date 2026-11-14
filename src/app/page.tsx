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
  Gift,
  ExternalLink,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import BookshelfSection from "@/components/BookshelfSection";
import AdBanner from "@/components/AdBanner";
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
    icon: Gift,
    title: "100% Miễn Phí Tải Về",
    desc: "Không thu phí người dùng. Doanh thu từ banner quảng cáo và nhiệm vụ tài trợ đối tác.",
    color: "var(--zb-orange)",
  },
];

const STEPS = [
  {
    icon: Download,
    title: "1. Tải APK & Dùng Miễn Phí (0đ)",
    desc: "Tải ứng dụng về máy hoặc điện thoại, cài đặt trong 5 giây và trải nghiệm đầy đủ tính năng cơ bản 100% miễn phí.",
  },
  {
    icon: ShieldCheck,
    title: "2. Hoạt Động 100% Offline",
    desc: "Dữ liệu lưu an toàn trên máy bạn, không gửi lên đám mây, không lo mất mạng và không cần tài khoản.",
  },
  {
    icon: ExternalLink,
    title: "3. Làm Nhiệm Vụ Đối Tác (5s)",
    desc: "Khi cần tính năng PRO (xuất PDF logo riêng) hoặc qua màn game khó, chỉ cần ghé thăm 1 liên kết tài trợ đối tác.",
  },
  {
    icon: Key,
    title: "4. Mở Khóa VIP & Qua Màn Tức Thì",
    desc: "Hệ thống tự động cấp License Key PRO hoặc duyệt qua màn game ngay tức thì mà bạn không tốn 1 xu!",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Top Sponsored Ad Banner */}
      <AdBanner variant="leaderboard" className="pt-4" />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-300 mb-5">
          <Sparkles size={14} /> Kho Công Cụ Số &amp; Mini Game 100% Miễn Phí 2026
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto uppercase">
          CÔNG CỤ SỐ TẢI VỀ MIỄN PHÍ 100% &amp;{" "}
          <span style={{ color: "var(--zb-gold)" }}>DỊCH VỤ PHÁT TRIỂN PHẦN MỀM THEO YÊU CẦU</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg max-w-3xl mx-auto text-[var(--zb-off-white)] opacity-90 leading-relaxed font-normal">
          &ldquo;Tải về dùng trọn đời — 100% Hoạt động Offline không cần mạng — Hoàn toàn miễn phí — Mở khóa thêm tính năng VIP hoặc qua màn game bằng nhiệm vụ tài trợ đối tác. Tuyệt đối không thu phí người dùng.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <a
            href="#san-pham"
            className="zb-btn-primary px-8 py-3.5 text-base shadow-lg hover:shadow-[rgba(234,189,23,0.3)] flex items-center gap-2"
          >
            <span>Khám Phá Kệ Sản Phẩm (0đ)</span>
            <ArrowRight size={18} />
          </a>
          <a
            href="#san-pham"
            className="px-6 py-3.5 rounded-lg font-bold border text-sm sm:text-base flex items-center gap-2 bg-[rgba(234,189,23,0.1)] border-[rgba(234,189,23,0.4)] text-[var(--zb-gold)] hover:bg-[rgba(234,189,23,0.2)] transition-all"
          >
            <Gift size={18} />
            <span>Nhiệm Vụ Mở Khóa PRO (Free)</span>
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

      {/* Bookshelf Section (#san-pham) */}
      <BookshelfSection />

      {/* Bundle / Combo Tiết Kiệm (#combo) */}
      <section id="combo" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Tài Trợ 100% · Không Thu Phí
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Bộ Sưu Tập Gói Combo Ứng Dụng Miễn Phí
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Tải trọn bộ công cụ và game đối kháng cho từng nhóm nhu cầu chỉ với 1 cú nhấp chuột.
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
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    100% FREE
                  </span>
                  <span className="text-xs text-[var(--zb-muted)]">3–5 ứng dụng</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{b.name}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{b.tagline}</p>
                </div>

                <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  <div className="text-xs text-[var(--zb-muted)] line-through">
                    Giá trị niêm yết: {formatVnd(b.originalPrice)}
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">
                    0đ · MIỄN PHÍ
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[rgba(255,255,255,0.08)]">
                <a
                  href="/downloads/Zeebee_Master_Bundle_15in1_APK.zip"
                  download
                  className="zb-btn-primary w-full py-2.5 text-xs font-bold justify-center shadow-md flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Tải Trọn Gói .ZIP (0đ)</span>
                </a>
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
            Quy Trình Sử Dụng &amp; Mở Khóa Tính Năng VIP
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Trải nghiệm miễn phí trọn đời — Mở khóa tính năng nâng cao qua nhiệm vụ đối tác.
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
            <HelpCircle size={20} className="text-[var(--zb-gold)]" /> Cam Kết Miễn Phí Trọn Đời &amp; Cơ Chế Mở Khóa Tài Trợ
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-[var(--zb-muted)] leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> 100% Miễn Phí Tải Về
              </h3>
              <p>
                Tải file về máy mở trực tiếp trên điện thoại hoặc máy tính. Mọi tính năng cốt lõi hoạt động 100% offline vĩnh viễn không thu phí.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Nhiệm vụ tài trợ linh hoạt
              </h3>
              <p>
                Mở khóa tính năng VIP hoặc nhận thêm mạng trong game bằng cách click ghé thăm nhà tài trợ 5 giây. Không cần chi tiền mặt.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Hỗ trợ kỹ thuật cộng đồng
              </h3>
              <p>
                Đội ngũ kỹ thuật viên Zeebee hỗ trợ xử lý sự cố cài đặt qua Zalo hoặc Telegram. Luôn sẵn sàng đồng hành cùng người dùng Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
