import { NextRequest, NextResponse } from "next/server";
import { createOrder, countRecentOrdersByPhone, markOrderTelegramSent } from "@/lib/db";
import { getProduct, formatVnd } from "@/lib/catalog";
import { sendTelegram } from "@/lib/telegram";

// VÒNG 2: một endpoint cho cả 2 loại:
//  - kind=product: đặt mua sản phẩm đóng gói (giá lấy từ catalog phía server, không tin client)
//  - kind=custom : yêu cầu build theo nhu cầu (thu đủ thông tin để Seller báo giá được ngay)

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
    return NextResponse.json({ error: "Số điện thoại chưa đúng (VD: 0912345678)." }, { status: 400 });
  }
  if (countRecentOrdersByPhone(phone, 10) >= 3) {
    return NextResponse.json(
      { error: "Bạn vừa gửi nhiều yêu cầu. Seller sẽ liên hệ sớm, vui lòng chờ trong giây lát." },
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
    details.price = product.status === "coming_soon" ? "Đăng ký chờ ra mắt" : formatVnd(product.price);
    details.note = str(body.note, 1000);
    title =
      product.status === "coming_soon"
        ? "🔔 <b>KHÁCH ĐĂNG KÝ CHỜ RA MẮT — APP.ZEEBEE.VN</b>"
        : "🛍️ <b>ĐƠN SẢN PHẨM SỐ MỚI — APP.ZEEBEE.VN</b>";
    lines = [
      ["Sản phẩm", product.name],
      ["Giá", details.price],
      ["Khách hàng", name],
      ["SĐT / Zalo", phone],
      ["Ghi chú", details.note],
    ];
  } else {
    for (const [key] of CUSTOM_FIELDS) details[key] = str(body[key]);
    if (!details.productType || !details.purpose) {
      return NextResponse.json({ error: "Vui lòng chọn loại sản phẩm và mô tả mục đích." }, { status: 400 });
    }
    title = "🛠️ <b>YÊU CẦU BUILD THEO NHU CẦU — APP.ZEEBEE.VN</b>";
    lines = [
      ["Khách hàng", name],
      ["SĐT / Zalo", phone],
      ...CUSTOM_FIELDS.map(([key, label]) => [label, details[key]] as [string, string]),
    ];
  }

  const order = createOrder({ kind, productSlug, name, phone, details });
  const sent = await sendTelegram(title, [["Mã", order.code], ...lines], phone);
  markOrderTelegramSent(order.id, sent);

  return NextResponse.json({ ok: true, code: order.code });
}
