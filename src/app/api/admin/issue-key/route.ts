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
      return NextResponse.json({ error: "M? b? m?t Admin kh?ng ??ng." }, { status: 403 });
    }

    const order = getOrderByCode(code);
    if (!order) {
      return NextResponse.json({ error: "Kh?ng t?m th?y ??n h?ng." }, { status: 404 });
    }

    const deviceCode = order.deviceCode || "";
    const licenseKey = customKey || order.licenseKey || (deviceCode ? generateLicenseKey(deviceCode) : "");

    markOrderPaid(order.code, licenseKey);

    // G?i th?ng b?o x?c nh?n v? Telegram
    await sendTelegram(
      "? <b>?? DUY?T ??N & XU?T KEY TH?NH C?NG ? APP.ZEEBEE.VN</b>",
      [
        ["M? ??n h?ng", order.code],
        ["Kh?ch h?ng", order.name],
        ["S?T / Zalo", order.phone],
        ["S?n ph?m", order.details.productName || "?ng d?ng Zeebee"],
        ["M? thi?t b?", deviceCode || "(Kh?ng c?)"],
        ["Key ?? k?ch ho?t", licenseKey],
        ["Tr?ng th?i", "?? thanh to?n (Kh?ch ?? nh?n ???c key tr?n web)"],
      ],
      order.phone
    );

    return NextResponse.json({ ok: true, licenseKey, code: order.code });
  } catch (err) {
    console.error("L?i xu?t key:", err);
    return NextResponse.json({ error: "L?i x? l? m?y ch?." }, { status: 500 });
  }
}
