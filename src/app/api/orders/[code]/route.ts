import { NextRequest, NextResponse } from "next/server";
import { getOrderByCode } from "@/lib/db";
import { getProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  if (!code) {
    return NextResponse.json({ error: "Thi?u m? ??n h?ng." }, { status: 400 });
  }

  const order = getOrderByCode(code);
  if (!order) {
    return NextResponse.json({ error: "Kh?ng t?m th?y ??n h?ng." }, { status: 404 });
  }

  const product = order.productSlug ? getProduct(order.productSlug) : null;
  const isPaid = order.status === "paid" || order.status === "completed";

  return NextResponse.json({
    ok: true,
    order: {
      code: order.code,
      kind: order.kind,
      productSlug: order.productSlug,
      productName: product?.name || order.details.productName || "?ng d?ng Zeebee",
      format: product?.format || order.details.format || "Offline App",
      deviceCode: order.deviceCode,
      amount: order.amount,
      status: order.status,
      // Ch? g?i Key khi ?? x?c nh?n thanh to?n th?nh c?ng
      licenseKey: isPaid ? order.licenseKey : null,
      paidAt: order.paidAt,
      createdAt: order.createdAt,
    },
  });
}
