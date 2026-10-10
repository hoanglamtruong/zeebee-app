import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import CustomRequestForm from "@/components/CustomRequestForm";

export const metadata: Metadata = {
  title: "Build web / tool / app theo yêu cầu | app.zeebee.vn",
  description: "Mô tả nhu cầu — Zee Bee báo giá đúng phần việc. Không bán theo gói.",
};

export default function BuildPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-10">
        <h1 className="text-2xl md:text-3xl font-bold">Build theo yêu cầu</h1>
        <p className="mt-2 mb-6" style={{ color: "var(--zb-muted)" }}>
          Website, tool nội bộ, app điện thoại hay game — Zee Bee không bán theo gói. Bạn càng mô tả cụ thể, báo giá
          càng sát. Không chắc chỗ nào cứ để trống, Seller sẽ hỏi thêm khi gọi.
        </p>
        <CustomRequestForm />
      </section>
      <SiteFooter />
    </main>
  );
}
