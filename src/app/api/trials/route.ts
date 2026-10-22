import { NextRequest, NextResponse } from "next/server";
import { recordTrialDownload } from "@/lib/db";
import { getProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    if (!slug) {
      return NextResponse.json({ error: "Thi?u m? s?n ph?m." }, { status: 400 });
    }

    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "S?n ph?m kh?ng t?n t?i." }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Ghi nh?n h? th?ng SQLite ?m th?m, TUY?T ??I kh?ng g?i th?ng b?o Telegram
    const record = recordTrialDownload({
      productSlug: product.slug,
      ip: ip.split(",")[0].trim(),
      userAgent: userAgent.slice(0, 300),
    });

    return NextResponse.json({ ok: true, trialId: record.id });
  } catch (err) {
    console.error("L?i ghi nh?n trial:", err);
    return NextResponse.json({ ok: true }); // Kh?ng ch?n t?i file k? c? khi db b?n
  }
}
