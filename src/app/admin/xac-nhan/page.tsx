import type { Metadata } from "next";
import Link from "next/link";
import { getOrderByCode } from "@/lib/db";
import { getProduct, formatVnd } from "@/lib/catalog";
import { generateLicenseKey } from "@/lib/license";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import AdminApprovalClient from "./AdminApprovalClient";

export const metadata: Metadata = {
  title: "Xác Nhận & Xuất Key Bản Quyền | Admin app.zeebee.vn",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function AdminApprovalPage({
  searchParams,
}: {
  searchParams: Promise<{ ma?: string; secret?: string }>;
}) {
  const { ma, secret } = await searchParams;
  const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "zeebee_admin_2026_approve";

  const isSecretValid = secret === ADMIN_SECRET;
  const order = ma ? getOrderByCode(ma) : null;
  const product = order?.productSlug ? getProduct(order.productSlug) : null;
  const proposedKey = order?.licenseKey || (order?.deviceCode ? generateLicenseKey(order.deviceCode) : "");

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {!isSecretValid ? (
          <div className="zb-card p-8 text-center space-y-4 border-red-500/40">
            <h1 className="text-xl font-bold text-red-400">Từ Chối Truy Cập</h1>
            <p className="text-sm text-[var(--zb-muted)]">
              Mã bảo mật Admin không chính xác hoặc đã hết hạn. Vui lòng bấm vào liên kết trong tin nhắn Telegram của Bot.
            </p>
          </div>
        ) : !order ? (
          <div className="zb-card p-8 text-center space-y-4">
            <h1 className="text-xl font-bold text-amber-400">Không Tìm Thấy Đơn Hàng</h1>
            <p className="text-sm text-[var(--zb-muted)]">
              Mã đơn hàng <code>{ma}</code> không tồn tại trong hệ thống.
            </p>
          </div>
        ) : (
          <AdminApprovalClient
            order={order}
            productName={product?.name || order.details.productName || "Ứng dụng Zeebee"}
            proposedKey={proposedKey}
            secret={secret || ""}
          />
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
