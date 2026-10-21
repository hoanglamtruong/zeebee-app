import { NextRequest, NextResponse } from "next/server";
import { createOrder, countRecentOrdersByPhone, markOrderTelegramSent } from "@/lib/db";
import { getProduct, formatVnd } from "@/lib/catalog";
import { sendTelegram } from "@/lib/telegram";

export const dynamic = "force-dynamic";

// Endpoint xử lý đơn hàng & yêu cầu:
//  - kind=product: đặt mua sản phẩm tải về hoặc đăng ký nhận mã ưu đãi 50% sản phẩm sắp ra mắt
//  - kind=custom : yêu cầu build phần mềm / mini tool theo yêu cầu riêng

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

  const kind = body.kind === "custom" ? "custom" : body.kind === "product" ? "product" : null;
  const name = str(body.name, 100);
  const phone = str(body.phone, 20).replace(/[\s.-]/g, "");

  if (!kind || !name || !phone) {
    return NextResponse.json({ error: "Vui lòng nhập họ tên và số điện thoại." }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Số điện thoại chưa đúng định dạng (VD: 0912345678)." }, { status: 400 });
  }
  if (countRecentOrdersByPhone(phone, 10) >= 3) {
    return NextResponse.json(
      { error: "Bạn vừa gửi nhiều yêu cầu. Đội ngũ Zeebee sẽ liên hệ sớm qua Zalo, vui lòng chờ trong giây lát." },
      { status: 429 }
    );
  }

  let title: string;
  let lines: [string, string][];
  let productSlug: string | undefined;
  const details: Record<string, string> = {};

  if (kind === "product") {
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
  }

  const order = createOrder({ kind, productSlug, name, phone, details });
  const sent = await sendTelegram(title, [["Mã đơn", order.code], ...lines], phone);
  markOrderTelegramSent(order.id, sent);

  return NextResponse.json({ ok: true, code: order.code });
}
