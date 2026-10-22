import { NextRequest, NextResponse } from "next/server";
import { createOrder, countRecentOrdersByPhone, markOrderTelegramSent } from "@/lib/db";
import { getProduct, formatVnd } from "@/lib/catalog";
import { sendTelegram, TelegramButton } from "@/lib/telegram";
import { generateLicenseKey } from "@/lib/license";
import { getTransferSyntax } from "@/lib/payment-config";

export const dynamic = "force-dynamic";

const PHONE_RE = /^(0|84)(3|5|7|8|9)\d{8}$/;
const CUSTOM_FIELDS: [string, string][] = [
  ["productType", "Lo?i s?n ph?m"],
  ["purpose", "M?c ??ch / d?ng cho ai"],
  ["features", "T?nh n?ng ch?nh"],
  ["reference", "M?u tham kh?o"],
  ["deadline", "Th?i h?n mong mu?n"],
  ["budget", "Ng?n s?ch d? ki?n"],
];

function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "D? li?u kh?ng h?p l?." }, { status: 400 });

  const kind =
    body.kind === "custom"
      ? "custom"
      : body.kind === "key_purchase"
        ? "key_purchase"
        : body.kind === "product"
          ? "product"
          : null;

  const name = str(body.name, 100);
  const phone = str(body.phone, 20).replace(/[\s.-]/g, "");

  if (!kind || !name || !phone) {
    return NextResponse.json({ error: "Vui l?ng nh?p h? t?n v? s? ?i?n tho?i." }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "S? ?i?n tho?i ch?a ??ng ??nh d?ng (VD: 0912345678)." }, { status: 400 });
  }
  if (countRecentOrdersByPhone(phone, 10) >= 4) {
    return NextResponse.json(
      { error: "B?n v?a g?i y?u c?u g?n ??y. Vui l?ng ch? trong gi?y l?t ho?c nh?n Zalo 0976094453." },
      { status: 429 }
    );
  }

  const adminSecret = process.env.ADMIN_SECRET_KEY || "zeebee_admin_2026_approve";
  let title: string;
  let lines: [string, string][];
  let productSlug: string | undefined;
  let deviceCode: string | undefined;
  let licenseKey: string | undefined;
  let amount = 0;
  let customButtons: TelegramButton[] | undefined;
  const details: Record<string, string> = {};

  if (kind === "key_purchase") {
    // Flow Mua Key m? kh?a sau 7 ng?y d?ng th?
    const product = getProduct(str(body.productSlug, 100));
    if (!product) return NextResponse.json({ error: "S?n ph?m kh?ng t?n t?i." }, { status: 400 });

    const rawDeviceCode = str(body.deviceCode, 60).toUpperCase();
    if (!rawDeviceCode || rawDeviceCode.length < 4) {
      return NextResponse.json(
        { error: "Vui l?ng nh?p M? thi?t b? (hi?n th? tr?n ?ng d?ng c?a b?n)." },
        { status: 400 }
      );
    }

    productSlug = product.slug;
    deviceCode = rawDeviceCode;
    licenseKey = generateLicenseKey(deviceCode);
    amount = product.price;

    details.productName = product.name;
    details.deviceCode = deviceCode;
    details.price = formatVnd(amount);
    details.format = product.format;
    details.note = str(body.note, 1000);

    const tempCode = `ZB-KEY-${Date.now().toString().slice(-6)}`;
    const transferSyntax = getTransferSyntax(tempCode);

    title = "?? <b>Y?U C?U MUA KEY M? KH?A B?N QUY?N TR?N ??I ? APP.ZEEBEE.VN</b>";
    lines = [
      ["S?n ph?m", product.name],
      ["M? thi?t b? (Device Code)", deviceCode],
      ["Gi? thanh to?n", formatVnd(amount)],
      ["C? ph?p CK y?u c?u", `ZB [M? ??N]`],
      ["Kh?ch h?ng", name],
      ["S?T / Zalo", phone],
      ["Ghi ch?", details.note || "(Kh?ng c?)"],
      ["Key m? kh?a d? ki?n", licenseKey],
    ];

    const order = createOrder({
      kind: "key_purchase",
      productSlug,
      deviceCode,
      licenseKey,
      amount,
      name,
      phone,
      details,
      status: "pending_payment",
    });

    // Update lines with exact real code
    lines[3] = ["C? ph?p CK y?u c?u", getTransferSyntax(order.code)];

    customButtons = [
      {
        text: "? X?c Nh?n Ti?n & Xu?t Key",
        url: `https://app.zeebee.vn/admin/xac-nhan?ma=${order.code}&secret=${adminSecret}`,
      },
    ];

    const sent = await sendTelegram(title, [["M? ??n h?ng", order.code], ...lines], phone, customButtons);
    markOrderTelegramSent(order.id, sent);

    return NextResponse.json({ ok: true, code: order.code, kind: "key_purchase" });
  } else if (kind === "product") {
    const product = getProduct(str(body.productSlug, 100));
    if (!product) return NextResponse.json({ error: "S?n ph?m kh?ng t?n t?i." }, { status: 400 });
    productSlug = product.slug;
    details.productName = product.name;
    details.format = product.format;
    details.kind = product.kind;

    if (product.status === "coming_soon") {
      details.price = `??ng k? ?u ??i 50% khi ra m?t (Gi? ni?m y?t: ${formatVnd(product.price)})`;
      title = "?? <b>KH?CH ??NG K? NH?N M? ?U ??I 50% (S?P RA M?T) ? APP.ZEEBEE.VN</b>";
    } else {
      details.price = `${formatVnd(product.price)} (tr? 1 l?n)`;
      title = "?? <b>??N ??T MUA S?N PH?M T?I V? ? APP.ZEEBEE.VN</b>";
    }

    details.note = str(body.note, 1000);
    lines = [
      ["S?n ph?m", product.name],
      ["??nh d?ng", product.format],
      ["Tr?ng th?i", product.status === "coming_soon" ? "S?P RA M?T (?u ??i 50%)" : "C? S?N (Giao file Zalo)"],
      ["Gi? ni?m y?t", details.price],
      ["Kh?ch h?ng", name],
      ["S?T / Zalo", phone],
      ["Ghi ch?", details.note || "(Kh?ng c?)"],
    ];

    const order = createOrder({ kind: "product", productSlug, name, phone, details });
    const sent = await sendTelegram(title, [["M? ??n", order.code], ...lines], phone);
    markOrderTelegramSent(order.id, sent);

    return NextResponse.json({ ok: true, code: order.code });
  } else {
    for (const [key] of CUSTOM_FIELDS) details[key] = str(body[key]);
    if (!details.productType || !details.purpose) {
      return NextResponse.json({ error: "Vui l?ng ch?n lo?i s?n ph?m v? m? t? m?c ??ch." }, { status: 400 });
    }
    title = "??? <b>Y?U C?U BUILD PH?N M?M / MINI TOOL THEO Y?U C?U ? APP.ZEEBEE.VN</b>";
    lines = [
      ["Kh?ch h?ng", name],
      ["S?T / Zalo", phone],
      ...CUSTOM_FIELDS.map(([key, label]) => [label, details[key] || "(Ch?a ?i?n)"] as [string, string]),
    ];

    const order = createOrder({ kind: "custom", name, phone, details });
    const sent = await sendTelegram(title, [["M? ??n", order.code], ...lines], phone);
    markOrderTelegramSent(order.id, sent);

    return NextResponse.json({ ok: true, code: order.code });
  }
}
