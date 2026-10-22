import { NextRequest, NextResponse } from "next/server";
import { getOrderByCode, markOrderPaid } from "@/lib/db";
import { generateLicenseKey } from "@/lib/license";
import { sendTelegram } from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const code = typeof body.code === "string" ? body.code.trim() : "";
    const secret = typeof body.secret === "string" ? body.secret.trim() : "";
    const customKey = typeof body.customKey === "string" ? body.customKey.trim() : "";

    const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "zeebee_admin_2026_approve";
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Mã bí mật Admin không đúng." }, { status: 403 });
    }

    const order = getOrderByCode(code);
    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng." }, { status: 404 });
    }

    const deviceCode = order.deviceCode || "";
    const licenseKey = customKey || order.licenseKey || (deviceCode ? generateLicenseKey(deviceCode) : "");

    markOrderPaid(order.code, licenseKey);

    // Gửi thông báo xác nhận về Telegram
    await sendTelegram(
      "✅ <b>ĐÃ DUYỆT ĐƠN & XUẤT KEY THÀNH CÔNG — APP.ZEEBEE.VN</b>",
      [
        ["Mã đơn hàng", order.code],
        ["Khách hàng", order.name],
        ["SĐT / Zalo", order.phone],
        ["Sản phẩm", order.details.productName || "Ứng dụng Zeebee"],
        ["Mã thiết bị", deviceCode || "(Không có)"],
        ["Key đã kích hoạt", licenseKey],
        ["Trạng thái", "Đã thanh toán (Khách đã nhận được key trên web)"],
      ],
      order.phone
    );

    return NextResponse.json({ ok: true, licenseKey, code: order.code });
  } catch (err) {
    console.error("Lỗi xuất key:", err);
    return NextResponse.json({ error: "Lỗi xử lý máy chủ." }, { status: 500 });
  }
}
