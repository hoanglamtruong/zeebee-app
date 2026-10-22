import type { Metadata } from "next";
import Link from "next/link";
import { getOrderByCode } from "@/lib/db";
import { getProduct, formatVnd } from "@/lib/catalog";
import { generateLicenseKey } from "@/lib/license";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import AdminApprovalClient from "./AdminApprovalClient";

export const metadata: Metadata = {
  title: "X?c Nh?n & Xu?t Key B?n Quy?n | Admin app.zeebee.vn",
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
            <h1 className="text-xl font-bold text-red-400">T? Ch?i Truy C?p</h1>
            <p className="text-sm text-[var(--zb-muted)]">
              M? b?o m?t Admin kh?ng ch?nh x?c ho?c ?? h?t h?n. Vui l?ng b?m v?o li?n k?t trong tin nh?n Telegram c?a Bot.
            </p>
          </div>
        ) : !order ? (
          <div className="zb-card p-8 text-center space-y-4">
            <h1 className="text-xl font-bold text-amber-400">Kh?ng T?m Th?y ??n H?ng</h1>
            <p className="text-sm text-[var(--zb-muted)]">
              M? ??n h?ng <code>{ma}</code> kh?ng t?n t?i trong h? th?ng.
            </p>
          </div>
        ) : (
          <AdminApprovalClient
            order={order}
            productName={product?.name || order.details.productName || "?ng d?ng Zeebee"}
            proposedKey={proposedKey}
            secret={secret}
          />
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
