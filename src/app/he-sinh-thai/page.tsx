import type { Metadata } from "next";
import Image from "next/image";
import { Flower2, AppWindow, Megaphone, Users, UserCircle2, ArrowRight } from "lucide-react";

// VÒNG 2: trang chủ zeebee.vn (middleware rewrite "/" theo host) — cổng giới thiệu hệ sinh thái.
// Về sau thêm đăng ký member chung (lịch sử mua, ưu đãi, tích điểm) — CEO: không gấp.

export const metadata: Metadata = {
  title: "Zeebee — Hệ sinh thái sản phẩm & dịch vụ",
  description: "Decor thủ công, app & game nhỏ, build theo yêu cầu, marketing online — tất cả trong hệ sinh thái Zeebee.",
};

const PRODUCTS = [
  {
    href: "https://decor.zeebee.vn",
    icon: Flower2,
    name: "Zeebee Decor",
    desc: "Đồ trang trí thủ công: gỗ tái chế, gốm, trang sức handmade, sen đá mini.",
    cta: "Mua đồ decor",
  },
  {
    href: "https://app.zeebee.vn",
    icon: AppWindow,
    name: "Zeebee App",
    desc: "Mini app & game dùng được ngay, và dịch vụ build web / tool / app theo yêu cầu.",
    cta: "Xem app & game",
  },
  {
    href: "https://ads.zeebee.vn",
    icon: Megaphone,
    name: "Zeebee Ads",
    desc: "Chạy quảng cáo, thiết kế content, ảnh, video quảng cáo theo yêu cầu.",
    cta: "Xem dịch vụ",
  },
  {
    href: "https://owner.zeebee.vn",
    icon: Users,
    name: "Zeebee Owner",
    desc: "Kênh liên kết marketing cho chủ cơ sở — kênh của bạn, doanh thu của bạn.",
    cta: "Tìm hiểu",
  },
];

export default function EcosystemPage() {
  return (
    <main className="min-h-screen">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
        <Image src="/zeebee_logo_horizontal_white.svg" alt="Zeebee" width={200} height={44} priority className="mx-auto" />
        <h1 className="mt-6 text-3xl md:text-4xl font-bold">Hệ sinh thái Zeebee</h1>
        <p className="mt-3 max-w-2xl mx-auto" style={{ color: "var(--zb-muted)" }}>
          Sản phẩm làm thủ công, phần mềm dùng được ngay và dịch vụ làm theo yêu cầu — do Zangxteam tạo và vận hành.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 grid sm:grid-cols-2 gap-4">
        {PRODUCTS.map(({ href, icon: Icon, name, desc, cta }) => (
          <a key={href} href={href} className="zb-card p-6 flex flex-col gap-3 hover:brightness-110">
            <Icon size={32} style={{ color: "var(--zb-gold)" }} />
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm flex-1" style={{ color: "var(--zb-muted)" }}>
              {desc}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: "var(--zb-gold)" }}>
              {cta} <ArrowRight size={16} />
            </span>
          </a>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <div className="zb-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-80">
          <UserCircle2 size={36} style={{ color: "var(--zb-gold)" }} className="shrink-0" />
          <div>
            <h2 className="font-semibold">Thành viên Zeebee — sắp ra mắt</h2>
            <p className="text-sm" style={{ color: "var(--zb-muted)" }}>
              Một tài khoản cho cả hệ sinh thái: xem lịch sử mua, nhận ưu đãi, tích điểm. Không bắt buộc — bạn vẫn mua
              hàng bình thường mà không cần đăng ký.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm py-8 px-6" style={{ color: "var(--zb-muted)" }}>
        © {new Date().getFullYear()} Zeebee · zeebee.vn · Zangxteam
      </footer>
    </main>
  );
}
