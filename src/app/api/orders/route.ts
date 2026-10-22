import { NextRequest, NextResponse } from "next/server";
import { createOrder, countRecentOrdersByPhone, markOrderTelegramSent } from "@/lib/db";
import { getProduct, formatVnd } from "@/lib/catalog";
import { validateCoupon } from "@/lib/coupons";
import { sendTelegram, TelegramButton } from "@/lib/telegram";
import { generateLicenseKey } from "@/lib/license";
import { getTransferSyntax } from "@/lib/payment-config";

export const dynamic = "force-dynamic";

const PHONE_RE = /^(0|84)(3|5|7|8|9)\d{8}$/;
const CUSTOM_FIELDS: [string, string][] = [
  ["productType", "Loại sản phẩm"],
  ["purpose", "Mục đích / dùng cho ai"],
  ["features", "Tính năng chính"],
  ["reference", "Mẫu tham khảo"],
  ["deadline", "Thời hạn mong muốn"],
  ["budget", "Ngân sách dự kiến"],
];

function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });

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
    return NextResponse.json({ error: "Vui lòng nhập họ tên và số điện thoại." }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Số điện thoại chưa đúng định dạng (VD: 0912345678)." }, { status: 400 });
  }
  if (countRecentOrdersByPhone(phone, 10) >= 4) {
    return NextResponse.json(
      { error: "Bạn vừa gửi yêu cầu gần đây. Vui lòng chờ trong giây lát hoặc nhắn Zalo 0976094453." },
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
    // Flow Mua Key mở khóa sau 7 ngày dùng thử
    const product = getProduct(str(body.productSlug, 100));
    if (!product) return NextResponse.json({ error: "Sản phẩm không tồn tại." }, { status: 400 });

    const rawDeviceCode = str(body.deviceCode, 60).toUpperCase();
    if (!rawDeviceCode || rawDeviceCode.length < 4) {
      return NextResponse.json(
        { error: "Vui lòng nhập Mã thiết bị (hiển thị trên ứng dụng của bạn)." },
        { status: 400 }
      );
    }

    productSlug = product.slug;
    deviceCode = rawDeviceCode;
    licenseKey = generateLicenseKey(deviceCode);
    amount = product.price;

    // Xử lý mã giảm giá (KOL, KOC, CTV, Khách quen)
    const rawCoupon = str(body.couponCode, 50).toUpperCase();
    if (rawCoupon) {
      const couponResult = validateCoupon(rawCoupon, product.price);
      if (couponResult.valid) {
        amount = couponResult.finalPrice;
        details.couponCode = couponResult.code;
        details.couponLabel = couponResult.label || "";
        details.discountAmount = formatVnd(couponResult.discountAmount);
        details.originalPrice = formatVnd(couponResult.originalPrice);
      }
    }

    const isFreeKOL = amount === 0;

    details.productName = product.name;
    details.deviceCode = deviceCode;
    details.price = isFreeKOL ? "0đ (Miễn phí KOL)" : formatVnd(amount);
    details.format = product.format;
    details.note = str(body.note, 1000);

    const tempCode = `ZB-KEY-${Date.now().toString().slice(-6)}`;
    const transferSyntax = getTransferSyntax(tempCode);

    title = isFreeKOL
      ? "🎁 <b>KHÁCH MỜI KOL / KOC KÍCH HOẠT KEY MIỄN PHÍ — APP.ZEEBEE.VN</b>"
      : "🔑 <b>YÊU CẦU MUA KEY MỞ KHÓA BẢN QUYỀN TRỌN ĐỜI — APP.ZEEBEE.VN</b>";

    lines = [
      ["Sản phẩm", product.name],
      ["Mã thiết bị (Device Code)", deviceCode],
    ];

    if (details.couponCode) {
      lines.push(
        ["Mã giảm giá", `${details.couponCode} (${details.couponLabel})`],
        ["Giá niêm yết", details.originalPrice || formatVnd(product.price)],
        ["Mức giảm", `-${details.discountAmount}`]
      );
    }

    lines.push(
      ["Giá thanh toán", isFreeKOL ? "0đ (Tài trợ 100% cho KOL)" : formatVnd(amount)],
      ["Cú pháp CK yêu cầu", isFreeKOL ? "Không yêu cầu (Tài trợ)" : `ZB [MÃ ĐƠN]`],
      ["Khách hàng", name],
      ["SĐT / Zalo", phone],
      ["Ghi chú", details.note || "(Không có)"],
      ["Key mở khóa", licenseKey]
    );

    const order = createOrder({
      kind: "key_purchase",
      productSlug,
      deviceCode,
      licenseKey,
      amount,
      name,
      phone,
      details,
      status: isFreeKOL ? "paid" : "pending_payment",
    });

    if (!isFreeKOL) {
      lines[lines.findIndex((l) => l[0] === "Cú pháp CK yêu cầu")][1] = getTransferSyntax(order.code);
      customButtons = [
        {
          text: "⚡ Xác Nhận Tiền & Xuất Key",
          url: `https://app.zeebee.vn/admin/xac-nhan?ma=${order.code}&secret=${adminSecret}`,
        },
      ];
    }

    const sent = await sendTelegram(title, [["Mã đơn hàng", order.code], ...lines], phone, customButtons);
    markOrderTelegramSent(order.id, sent);

    return NextResponse.json({ ok: true, code: order.code, kind: "key_purchase" });
  } else if (kind === "product") {
    const product = getProduct(str(body.productSlug, 100));
    if (!product) return NextResponse.json({ error: "Sản phẩm không tồn tại." }, { status: 400 });
    productSlug = product.slug;
    details.productName = product.name;
    details.format = product.format;
    details.kind = product.kind;

    if (product.status === "coming_soon") {
      details.price = `Đăng ký ưu đãi 50% khi ra mắt (Giá niêm yết: ${formatVnd(product.price)})`;
      title = "🎁 <b>KHÁCH ĐĂNG KÝ NHẬN MÃ ƯU ĐÃI 50% (SẮP RA MẮT) — APP.ZEEBEE.VN</b>";
    } else {
      details.price = `${formatVnd(product.price)} (trả 1 lần)`;
      title = "⬇️ <b>ĐƠN ĐẶT MUA SẢN PHẨM TẢI VỀ — APP.ZEEBEE.VN</b>";
    }

    details.note = str(body.note, 1000);
    lines = [
      ["Sản phẩm", product.name],
      ["Định dạng", product.format],
      ["Trạng thái", product.status === "coming_soon" ? "SẮP RA MẮT (Ưu đãi 50%)" : "CÓ SẴN (Giao file Zalo)"],
      ["Giá niêm yết", details.price],
      ["Khách hàng", name],
      ["SĐT / Zalo", phone],
      ["Ghi chú", details.note || "(Không có)"],
    ];

    const order = createOrder({ kind: "product", productSlug, name, phone, details });
    const sent = await sendTelegram(title, [["Mã đơn", order.code], ...lines], phone);
    markOrderTelegramSent(order.id, sent);

    return NextResponse.json({ ok: true, code: order.code });
  } else {
    for (const [key] of CUSTOM_FIELDS) details[key] = str(body[key]);
    if (!details.productType || !details.purpose) {
      return NextResponse.json({ error: "Vui lòng chọn loại sản phẩm và mô tả mục đích." }, { status: 400 });
    }
    title = "🛠️ <b>YÊU CẦU BUILD PHẦN MỀM / MINI TOOL THEO YÊU CẦU — APP.ZEEBEE.VN</b>";
    lines = [
      ["Khách hàng", name],
      ["SĐT / Zalo", phone],
      ...CUSTOM_FIELDS.map(([key, label]) => [label, details[key] || "(Chưa điền)"] as [string, string]),
    ];

    const order = createOrder({ kind: "custom", name, phone, details });
    const sent = await sendTelegram(title, [["Mã đơn", order.code], ...lines], phone);
    markOrderTelegramSent(order.id, sent);

    return NextResponse.json({ ok: true, code: order.code });
  }
}
