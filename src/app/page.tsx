import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Gamepad2,
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
  Radio,
  Swords,
  Users,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import BookshelfSection from "@/components/BookshelfSection";
import AdBanner from "@/components/AdBanner";

const TRUST_BADGES = [
  {
    icon: Zap,
    title: "Chơi Ngay Không Cần Cài APK",
    desc: "Mở lên chơi ngay lập tức trên cả iPhone (iOS), Android và Máy tính. Lưu ra màn hình chính (PWA) chỉ với 1 chạm.",
    color: "var(--zb-gold)",
  },
  {
    icon: Swords,
    title: "Đấu 2 Người: 1 Máy hoặc Online",
    desc: "Chơi chung trên 1 màn hình điện thoại hoặc tạo phòng Online 4 số / Quét QR so tài từ xa trong 2 giây.",
    color: "#34d399",
  },
  {
    icon: Radio,
    title: "Hỗ Trợ Offline & AI Thông Minh",
    desc: "Tự động lưu bộ nhớ đệm PWA để giải trí mọi lúc ngay cả khi mất mạng hoặc trên máy bay.",
    color: "var(--zb-orange)",
  },
];

const STEPS = [
  {
    icon: Gamepad2,
    title: "1. Chọn Game & Mở Ngay",
    desc: "Bấm vào tựa game bất kỳ trên kệ để khởi chạy tức thì trên trình duyệt mà không cần tải file cài đặt phức tạp.",
  },
  {
    icon: Users,
    title: "2. Chọn Chế Độ Đấu",
    desc: "Chơi 2 người chung 1 màn hình, tạo Mã Phòng 4 Số để bạn bè vào đấu Online, hoặc đấu với AI thông minh.",
  },
  {
    icon: Download,
    title: "3. Lưu Ra Màn Hình Chính (PWA)",
    desc: "Chọn 'Thêm vào màn hình chính' trên Safari/Chrome để có biểu tượng game full màn hình chạy cả khi Offline.",
  },
  {
    icon: Gift,
    title: "4. Làm Nhiệm Vụ Nhận Mạng & VIP",
    desc: "Ghé thăm gian hàng đối tác 5 giây để nhận thêm +3 mạng hồi sinh, gợi ý nước đi và mở khóa vật phẩm VIP.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Top Sponsored Ad Banner */}
      <AdBanner
        variant="leaderboard"
        tag="TÀI TRỢ GAMING"
        sponsorName="Shopee Gaming Store"
        customTitle="Săn Deal Tay Cầm Chơi Game & Phụ Kiện Điện Thoại Giảm Đến 50%"
        customSubtitle="Trải nghiệm chiến game đối kháng 2 người mượt mà trên mọi thiết bị"
        customCta="Xem Phụ Kiện Game"
        className="pt-4"
      />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-xs font-bold text-amber-300 mb-5">
          <Gamepad2 size={14} /> Kho Game PWA Đa Nền Tảng (Android · iPhone · Web) 2026
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto uppercase">
          KHO GAME ĐỐI KHÁNG 2 NGƯỜI, CO-OP &amp;{" "}
          <span style={{ color: "var(--zb-gold)" }}>DỊCH VỤ PHÁT TRIỂN GAME THEO YÊU CẦU</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg max-w-3xl mx-auto text-[var(--zb-off-white)] opacity-90 leading-relaxed font-normal">
          &ldquo;Bấm là chơi ngay trong 1 giây trên cả Android &amp; iOS — Đấu 2 người chung 1 máy hoặc tạo phòng Online 4 số — Hỗ trợ lưu PWA chơi Offline không cần mạng — Nhận thêm mạng &amp; vật phẩm VIP qua nhiệm vụ đối tác.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <a
            href="#san-pham"
            className="zb-btn-primary px-8 py-3.5 text-base shadow-lg hover:shadow-[rgba(234,189,23,0.3)] flex items-center gap-2"
          >
            <span>Khám Phá Kho Game Trên Kệ</span>
            <ArrowRight size={18} />
          </a>
          <a
            href="#san-pham"
            className="px-6 py-3.5 rounded-lg font-bold border text-sm sm:text-base flex items-center gap-2 bg-[rgba(234,189,23,0.1)] border-[rgba(234,189,23,0.4)] text-[var(--zb-gold)] hover:bg-[rgba(234,189,23,0.2)] transition-all"
          >
            <Gift size={18} />
            <span>Nhiệm Vụ Nhận Thêm Mạng Chơi</span>
          </a>
          <Link
            href="/build"
            className="px-6 py-3.5 rounded-lg font-bold border text-sm sm:text-base flex items-center gap-2 hover:bg-[rgba(251,133,0,0.1)] transition-all"
            style={{ borderColor: "var(--zb-orange)", color: "var(--zb-orange)" }}
          >
            <Hammer size={18} />
            <span>Đặt Hàng Làm Game Riêng</span>
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



      {/* 4 Bước Quy Trình */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[var(--zb-gold)] uppercase tracking-wider">
            Đơn Giản &amp; Tiện Lợi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Cách Thức Chơi Game Cùng Bạn Bè
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Không cần tài khoản, không cần máy chủ, kết nối trực tiếp trong chớp mắt.
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

      {/* Section Dịch Vụ Build Game Theo Yêu Cầu */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="zb-card p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-gradient-to-r from-[#12406a] to-[#0a2d47] border border-[rgba(251,133,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(251,133,0,0.15)] text-[var(--zb-orange)] flex items-center justify-center shrink-0 border border-[rgba(251,133,0,0.3)]">
              <Gamepad2 size={26} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Cần Một Tựa Game Độc Quyền Cho Sự Kiện Hoặc Doanh Nghiệp?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--zb-muted)] max-w-2xl leading-relaxed">
                Zeebee nhận phát triển mini game Bluetooth, game tương tác gian hàng sự kiện, game thương hiệu (Brand Game) chạy offline trên máy tính bảng và Android. Bàn giao nhanh 7 – 14 ngày.
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
            Nhận Báo Giá Làm Game →
          </Link>
        </div>
      </section>

      {/* Hướng Dẫn & Cam Kết (#huong-dan) */}
      <section id="huong-dan" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="zb-card p-6 sm:p-8 border border-[rgba(255,255,255,0.08)]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <HelpCircle size={20} className="text-[var(--zb-gold)]" /> Hướng Dẫn Kết Nối &amp; Trải Nghiệm
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-[var(--zb-muted)] leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Kết nối Bluetooth P2P
              </h3>
              <p>
                Bật Bluetooth trên 2 máy Android, một máy chọn Tạo phòng (Host), máy kia chọn Tham gia (Join) để bắt đầu ván đấu ngay lập tức.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Nhiệm vụ nhận vật phẩm
              </h3>
              <p>
                Khi hết lượt chơi hoặc muốn qua màn khó, thực hiện 1 nhiệm vụ đối tác 5 giây để nhận thêm mạng và mở bàn cờ mới.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> Hỗ trợ kỹ thuật
              </h3>
              <p>
                Đội ngũ kỹ thuật viên Zeebee hỗ trợ giải đáp thắc mắc về cài đặt và kết nối Bluetooth qua Zalo 0976.094.453.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
