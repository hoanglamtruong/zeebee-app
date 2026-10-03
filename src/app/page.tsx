import Image from "next/image";
import { Code2, Puzzle, Layers } from "lucide-react";
import LeadForm from "@/components/LeadForm";

const SERVICE_GROUPS = [
  {
    icon: Code2,
    title: "Gói cấu hình cơ bản",
    desc:
      "Sản phẩm đã dựng sẵn (website/tool/app mẫu), tùy biến nhẹ về nội dung, màu sắc, logo — triển khai nhanh, chi phí tối ưu.",
  },
  {
    icon: Puzzle,
    title: "Module mở rộng",
    desc:
      "Thêm chức năng mới vào nền tảng/website đang vận hành — không build lại từ đầu, tích hợp gọn vào hệ thống hiện có.",
  },
  {
    icon: Layers,
    title: "Nền tảng tùy biến hoàn toàn",
    desc:
      "Thiết kế & lập trình riêng theo đúng quy trình nghiệp vụ của bạn — từ ý tưởng tới sản phẩm hoàn chỉnh, không giới hạn khuôn mẫu.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-6 flex flex-col items-center text-center gap-6">
        <Image
          src="/zeebee_logo_horizontal_white.svg"
          alt="Zee Bee Agency"
          width={220}
          height={48}
          priority
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Build <span style={{ color: "var(--zb-gold)" }}>Web</span> ·{" "}
            <span style={{ color: "var(--zb-gold)" }}>Tool</span> ·{" "}
            <span style={{ color: "var(--zb-gold)" }}>App</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto" style={{ color: "var(--zb-muted)" }}>
            Zee Bee Agency thiết kế & thi công website, tool, app theo đúng yêu cầu kinh
            doanh của bạn — từ sản phẩm dựng sẵn tới nền tảng tùy biến hoàn toàn.
          </p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICE_GROUPS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="zb-card p-6 flex flex-col gap-3">
              <Icon size={32} style={{ color: "var(--zb-gold)" }} />
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm" style={{ color: "var(--zb-muted)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="lien-he" className="max-w-md mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-center mb-4">Để lại yêu cầu tư vấn</h2>
        <LeadForm />
      </section>

      <footer
        className="text-center text-sm py-8 px-6"
        style={{ color: "var(--zb-muted)" }}
      >
        © {new Date().getFullYear()} Zee Bee Agency · app.zeebee.vn
      </footer>
    </main>
  );
}
