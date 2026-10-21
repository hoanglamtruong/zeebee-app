import type { Metadata } from "next";
import {
  Hammer,
  Clock,
  Code2,
  ServerOff,
  Sparkles,
  Smartphone,
  Bot,
  Building2,
  Globe,
  Tag,
  CheckCircle2,
  ExternalLink,
  Layers,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import CustomRequestForm from "@/components/CustomRequestForm";
import { CASE_STUDIES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Dịch vụ Build Phần Mềm & Mini Tool Theo Yêu Cầu | app.zeebee.vn",
  description:
    "Phát triển Mini App Android, Website, Tool tự động hóa và Phần mềm nội bộ may đo theo đúng bài toán thực tế. Bàn giao 7–14 ngày, sở hữu 100% mã nguồn.",
};

const COMMITMENTS = [
  {
    icon: CheckCircle2,
    title: "Đúng nhu cầu thực tế",
    desc: "Tập trung giải quyết đúng nút thắt quy trình của bạn, không code tính năng thừa thãi làm tăng chi phí và rối mắt.",
  },
  {
    icon: Clock,
    title: "Tốc độ thần tốc",
    desc: "Bàn giao bản thử nghiệm MVP chạy được ngay sau 7 – 14 ngày, lặp vòng cải tiến nhanh theo phản hồi thực tế.",
  },
  {
    icon: Code2,
    title: "Bàn giao trọn gói mã nguồn",
    desc: "Bàn giao 100% Source code, tài liệu hướng dẫn kỹ thuật chi tiết hoặc hỗ trợ đóng gói phát hành lên Google Play / App Store.",
  },
  {
    icon: ServerOff,
    title: "Offline hoặc Online tùy chọn",
    desc: "Khách hàng tự chọn mô hình chạy cục bộ nội bộ (bảo mật dữ liệu tuyệt đối) hoặc chạy trên nền tảng Web Cloud.",
  },
];

const BUILD_SERVICES = [
  {
    icon: Smartphone,
    title: "1. May đo Mini App Android / iOS",
    desc: "Ứng dụng tính toán kỹ thuật, sổ đo may mặc, sổ thợ thầu, form kiểm tra công trình bỏ túi theo quy trình riêng của doanh nghiệp.",
  },
  {
    icon: Bot,
    title: "2. Bộ Công Cụ Tự Động Hóa (Automation & Mini Tools)",
    desc: "Tool cào dữ liệu thị trường, script đồng bộ đơn hàng sàn TMĐT, tool tự động sinh hợp đồng, ảnh và báo cáo định kỳ.",
  },
  {
    icon: Building2,
    title: "3. Phần Mềm Quản Trị Nội Bộ (Mini-ERP / CRM)",
    desc: "Hệ thống quản lý kho, nhân sự, tiến độ công việc và dòng tiền tinh gọn dành riêng cho hộ kinh doanh & công ty từ 5–20 người.",
  },
  {
    icon: Globe,
    title: "4. Website & Landing Page Chuyên Nghiệp",
    desc: "Tối ưu tốc độ tải trang dưới 1 giây, chuẩn SEO Google, giao diện độc bản sang trọng, tích hợp cổng thanh toán VietQR tự động.",
  },
  {
    icon: Tag,
    title: "5. Gắn Logo Thương Hiệu Riêng (White-label Mini Apps)",
    desc: "Biến các app có sẵn trong kho Zstore thành phiên bản mang tên, logo và màu sắc riêng của bạn với chi phí chỉ từ 2.000.000đ.",
  },
];

const PRICING_TIERS = [
  {
    name: "Gói Mini Tool / Script Tự Động",
    price: "2.000.000đ – 5.000.000đ",
    time: "Bàn giao: 3 – 5 ngày",
    desc: "Phù hợp tự động hóa 1 tác vụ đơn lẻ, cào dữ liệu, xử lý file Excel, script đồng bộ.",
    features: [
      "Giải quyết 1 bài toán chuyên biệt",
      "Chạy trực tiếp trên máy hoặc web",
      "Bàn giao source code & hướng dẫn",
      "Bảo hành lỗi kỹ thuật 3 tháng",
    ],
  },
  {
    name: "Gói Ứng Dụng Độc Lập (Stand-alone App)",
    price: "5.000.000đ – 15.000.000đ",
    time: "Bàn giao: 1 – 2 tuần",
    badge: "Phổ biến nhất",
    desc: "Mini App Android / iOS hoặc Web App hoàn chỉnh cho thợ thầu, cửa hàng, quản lý đơn.",
    features: [
      "Giao diện chuẩn UI/UX trực quan",
      "Lựa chọn Offline hoặc Cloud",
      "Tích hợp xuất file PDF / Excel / VietQR",
      "Bàn giao source code & đóng gói APK",
      "Bảo hành kỹ thuật 6 tháng",
    ],
  },
  {
    name: "Gói Hệ Thống Quản Lý Toàn Diện",
    price: "15.000.000đ – 35.000.000đ",
    time: "Bàn giao: 2 – 4 tuần",
    desc: "Hệ thống quản trị nội bộ mini (Mini ERP/CRM), quản lý đa phòng ban, phân quyền nhân sự.",
    features: [
      "Quản lý kho, đơn, nợ, nhân sự tổng thể",
      "Phân quyền nhiều cấp nhân viên",
      "Dashboard báo cáo số liệu thời gian thực",
      "Bàn giao đầy đủ hạ tầng & mã nguồn",
      "Bảo hành & đồng hành kỹ thuật 12 tháng",
    ],
  },
];

export default function BuildPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-12 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[rgba(251,133,0,0.15)] text-[var(--zb-orange)] border border-[rgba(251,133,0,0.3)] uppercase tracking-wider mb-4">
          <Hammer size={14} /> Dịch vụ May Đo Phần Mềm
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight max-w-4xl mx-auto">
          Phát Triển Phần Mềm, Mini Tool &amp; App{" "}
          <span style={{ color: "var(--zb-gold)" }}>Theo Đúng Bài Toán Của Bạn</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto text-[var(--zb-muted)] leading-relaxed">
          Không code tính năng thừa thãi — Bàn giao nhanh 7 – 14 ngày — Sở hữu 100% mã nguồn bản quyền. Bạn mô tả nhu cầu, Zeebee báo giá sát thực tế.
        </p>
      </section>

      {/* 4 Cam Kết */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMITMENTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="zb-card p-5 space-y-2 border border-[rgba(234,189,23,0.15)]">
              <Icon size={24} className="text-[var(--zb-gold)]" />
              <h3 className="font-bold text-sm text-white">{title}</h3>
              <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Hạng Mục Nhận Build Chính */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="zb-card p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Sparkles size={22} className="text-[var(--zb-gold)]" /> Các Hạng Mục Nhận Build Trọng Tâm
            </h2>
            <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
              Zeebee linh hoạt đáp ứng từ các công cụ nhỏ bỏ túi đến hệ thống quản trị chuyên sâu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {BUILD_SERVICES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-start gap-3.5 hover:border-[rgba(234,189,23,0.3)] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(234,189,23,0.1)] text-[var(--zb-gold)] flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-white">{title}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biểu Phí Tham Khảo */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">Biểu Phí Dự Toán Tham Khảo</h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Minh bạch chi phí — Không phát sinh phụ phí ẩn — Cam kết bàn giao đúng hạn.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`zb-card p-6 flex flex-col justify-between space-y-4 relative ${
                tier.badge ? "border-[var(--zb-gold)] shadow-xl" : "border-[rgba(255,255,255,0.1)]"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[var(--zb-gold)] text-[var(--zb-navy-dark)]">
                  {tier.badge}
                </span>
              )}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-white">{tier.name}</h3>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[var(--zb-gold)]">
                    {tier.price}
                  </div>
                  <span className="text-xs text-[var(--zb-orange)] font-semibold">{tier.time}</span>
                </div>
                <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{tier.desc}</p>
                <ul className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[var(--zb-off-white)]">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#form-yeu-cau"
                className="w-full py-2.5 rounded-lg text-center text-xs font-bold border border-[var(--zb-gold)] text-[var(--zb-gold)] hover:bg-[var(--zb-gold)] hover:text-[var(--zb-navy-dark)] transition-all"
              >
                Nhận báo giá chi tiết
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies / Năng Lực Công Nghệ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14">
        <div className="zb-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layers size={20} className="text-[var(--zb-gold)]" /> Năng Lực Công Nghệ &amp; Mẫu Giải Pháp Đã Triển Khai
              </h2>
              <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
                Các hệ thống phần mềm chuyên sâu do đội ngũ Zeebee thiết kế và vận hành.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CASE_STUDIES.map((c) => (
              <div
                key={c.slug}
                className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[rgba(234,189,23,0.1)] text-[var(--zb-gold)]">
                    {c.type}
                  </span>
                  <h3 className="font-bold text-sm text-white">{c.name}</h3>
                  <p className="text-xs text-[var(--zb-muted)] leading-relaxed">{c.tagline}</p>
                </div>
                {c.demoUrl && (
                  <div className="pt-2">
                    <a
                      href={c.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--zb-gold)] hover:underline"
                    >
                      Trải nghiệm thực tế <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Thu Yêu Cầu */}
      <section id="form-yeu-cau" className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Gửi Yêu Cầu May Đo Phần Mềm</h2>
          <p className="text-xs sm:text-sm text-[var(--zb-muted)] mt-1">
            Chỉ mất khoảng 2 phút điền thông tin. Chuyên viên kỹ thuật sẽ phân tích bài toán và gửi báo giá chi tiết qua Zalo.
          </p>
        </div>
        <CustomRequestForm />
      </section>

      <SiteFooter />
    </main>
  );
}
