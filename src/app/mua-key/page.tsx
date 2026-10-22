import type { Metadata } from "next";
import Link from "next/link";
import { Key, ShieldCheck, Zap, Download, HelpCircle, ArrowLeft } from "lucide-react";
import { PRODUCTS, formatVnd } from "@/lib/catalog";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import MuaKeyForm from "./MuaKeyForm";

export const metadata: Metadata = {
  title: "Mua Key Mở Khóa Bản Quyền Vĩnh Viễn | app.zeebee.vn",
  description: "Nhập mã thiết bị hiển thị trên ứng dụng đã tải về để mua key mở khóa trọn đời 100% offline.",
};

export const dynamic = "force-dynamic";

export default async function MuaKeyPage({
  searchParams,
}: {
  searchParams: Promise<{ app?: string; code?: string }>;
}) {
  const { app, code } = await searchParams;
  const availableProducts = PRODUCTS.filter((p) => p.status === "available");

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/#san-pham"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--zb-muted)] hover:text-[var(--zb-gold)] transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Quay lại danh mục ứng dụng
        </Link>

        {/* Hero Banner */}
        <div className="zb-card p-6 sm:p-8 bg-gradient-to-br from-[#12406a] to-[#082238] border border-[rgba(234,189,23,0.3)] mb-8 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[rgba(234,189,23,0.15)] text-[var(--zb-gold)] flex items-center justify-center border border-[rgba(234,189,23,0.3)] shadow-md">
            <Key size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Mua Key Mở Khóa Bản Quyền Vĩnh Viễn
          </h1>
          <p className="text-sm leading-relaxed text-[var(--zb-off-white)] opacity-90 max-w-2xl">
            Bạn đã tải và trải nghiệm thử ứng dụng trong 7 ngày? Nhập <strong>Mã Thiết Bị (Device Code)</strong> hiển thị trên màn hình ứng dụng của bạn để nhận <strong>Key kích hoạt trọn đời 100% offline</strong>.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid md:grid-cols-[1fr_260px] gap-6 items-start">
          <div className="zb-card p-6 border border-[rgba(234,189,23,0.25)]">
            <MuaKeyForm
              products={availableProducts}
              initialSlug={app || ""}
              initialDeviceCode={code || ""}
            />
          </div>

          {/* Guide Sidebar */}
          <div className="space-y-4">
            <div className="zb-card p-5 space-y-3 text-xs bg-white/5 border border-white/10">
              <h3 className="font-bold text-white flex items-center gap-1.5 text-sm text-[var(--zb-gold)]">
                <HelpCircle size={16} /> Lấy Mã Thiết Bị ở đâu?
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-[var(--zb-off-white)]">
                <li>Mở file ứng dụng (HTML/App) bạn đã tải về trên máy hoặc điện thoại.</li>
                <li>Xem huy hiệu góc trên màn hình: bấm vào <strong>&ldquo;Dùng thử: Còn X ngày&rdquo;</strong> hoặc bảng thông báo khi hết hạn 7 ngày.</li>
                <li>Sao chép dãy mã có dạng: <strong className="text-amber-300 font-mono">ZB-BT-XXXXX</strong> và dán vào ô bên trái.</li>
              </ol>
            </div>

            <div className="zb-card p-4 space-y-2 text-xs bg-emerald-950/20 border border-emerald-500/30">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck size={16} /> Cam Kết Bản Quyền
              </div>
              <p className="text-[var(--zb-muted)] text-[11px] leading-relaxed">
                Key gắn liền vĩnh viễn với thiết bị của bạn. Chạy độc lập 100% không cần kết nối mạng hay internet.
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
