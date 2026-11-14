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
import { BUNDLES } from "@/lib/catalog";

const TRUST_BADGES = [
  {
    icon: Radio,
    title: "100% Offline & Bluetooth",
    desc: "Chơi mượt mà không cần internet hay 4G. Kết nối trực tiếp giữa hai máy.",
    color: "var(--zb-gold)",
  },
  {
    icon: Swords,
    title: "Đấu Ngang Hàng 2 Máy (P2P)",
    desc: "Kết nối trong 3 giây. Tự do so tài tại quán cafe, công viên hay trường học.",
    color: "#34d399",
  },
  {
    icon: Zap,
    title: "Dung Lượng Siêu Nhẹ (<25KB)",
    desc: "Cài đặt trong nháy mắt, không tốn bộ nhớ điện thoại, mở lên chơi ngay.",
    color: "var(--zb-orange)",
  },
];

const STEPS = [
  {
    icon: Download,
    title: "1. Tải Game APK Về Máy",
    desc: "Chọn tựa game yêu thích trên kệ, tải file APK cài đặt trong 3 giây trên điện thoại Android.",
  },
  {
    icon: Radio,
    title: "2. Bật Bluetooth & Kết Nối",
    desc: "Mở game trên cả hai máy, bật Bluetooth để hai thiết bị tự động nhận diện và ghép cặp.",
  },
  {
    icon: Gamepad2,
    title: "3. So Tài Cùng Bạn Bè",
    desc: "Thưởng thức các trận đấu cờ caro, hải chiến, oẳn tù tì hay vượt mê cung kịch tính.",
  },
  {
    icon: Gift,
    title: "4. Vượt Ải & Mở Khóa Quà Tặng",
    desc: "Ghé thăm nhà tài trợ 5 giây để hồi sinh thêm mạng chơi và mở khóa các bàn cờ, map mới.",
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
        customTitle="Săn Deal Tay Cầm Chơi Game & Phụ Kiện Điện Thoại Bluetooth Giảm Đến 50%"
        customSubtitle="Trải nghiệm chiến game đối kháng 2 người mượt mà"
        customCta="Xem Phụ Kiện Game"
        className="pt-4"
      />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-xs font-bold text-amber-300 mb-5">
          <Gamepad2 size={14} /> Kho Game Retro &amp; Bluetooth Đối Kháng Android 2026
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto uppercase">
          KHO GAME OFFLINE &amp; BLUETOOTH ĐỐI KHÁNG &amp;{" "}
          <span style={{ color: "var(--zb-gold)" }}>DỊCH VỤ PHÁT TRIỂN GAME THEO YÊU CẦU</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg max-w-3xl mx-auto text-[var(--zb-off-white)] opacity-90 leading-relaxed font-normal">
          &ldquo;Kết nối trực tiếp 2 máy qua Bluetooth — Trải nghiệm mượt mà không cần internet — Cài đặt siêu nhẹ (&lt;25KB) trên mọi điện thoại Android — Mở khóa thêm màn chơi và vật phẩm qua nhiệm vụ tài trợ.&rdquo;
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

      {/* Gói Game Chuyên Đề (#combo) */}
      <section id="combo" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Gói Tải Trọn Bộ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Bộ Sưu Tập Gói Game Chuyên Đề
          </h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Tải trọn bộ tựa game cho từng thể loại chỉ với 1 file nén ZIP cài đặt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BUNDLES.slice(1).map((b) => (
            <div
              key={b.id}
              className="zb-card p-6 flex flex-col justify-between border border-[rgba(234,189,23,0.25)] relative overflow-hidden bg-gradient-to-b from-[#133e63] to-[#0a273f] hover:border-[var(--zb-gold)] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {b.badge}
                  </span>
                  <span className="text-xs text-[var(--zb-muted)]">5 tựa game</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{b.name}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{b.tagline}</p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[rgba(255,255,255,0.08)]">
                <a
                  href="/downloads/Zeebee_Master_Bundle_15in1_APK.zip"
                  download
                  className="zb-btn-primary w-full py-2.5 text-xs font-bold justify-center shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Tải Gói Game .ZIP</span>
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
