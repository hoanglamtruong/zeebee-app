import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByCode } from "@/lib/db";
import { getProduct, formatVnd } from "@/lib/catalog";
import { PRIMARY_BANK, getVietQrUrl, getTransferSyntax } from "@/lib/payment-config";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import OrderStatusClient from "./OrderStatusClient";

export const metadata: Metadata = {
  title: "Thông Tin Đơn Hàng & Kích Hoạt Key | app.zeebee.vn",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const order = getOrderByCode(code);
  if (!order) notFound();

  const product = order.productSlug ? getProduct(order.productSlug) : null;
  const productName = product?.name || order.details.productName || "Ứng dụng Zeebee";
  const amount = order.amount || product?.price || 0;
  const syntax = getTransferSyntax(order.code);
  const qrUrl = getVietQrUrl(amount, order.code);
  const isPaid = order.status === "paid" || order.status === "completed";

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <OrderStatusClient
          orderCode={order.code}
          kind={order.kind}
          productName={productName}
          productSlug={order.productSlug || ""}
          deviceCode={order.deviceCode || ""}
          amount={amount}
          initialStatus={order.status}
          initialKey={isPaid ? (order.licenseKey || "") : ""}
          bank={PRIMARY_BANK}
          qrUrl={qrUrl}
          transferSyntax={syntax}
          customerName={order.name}
          customerPhone={order.phone}
        />
      </div>
      <SiteFooter />
    </main>
  );
}
