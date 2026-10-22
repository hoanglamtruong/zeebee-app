import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";
import { getProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
    }

    const rawCode = typeof body.code === "string" ? body.code.trim() : "";
    const productSlug = typeof body.productSlug === "string" ? body.productSlug.trim() : "";
    let price = typeof body.price === "number" ? body.price : 0;

    if (productSlug && (!price || price <= 0)) {
      const product = getProduct(productSlug);
      if (product) price = product.price;
    }

    if (price <= 0) {
      return NextResponse.json({ error: "Vui lòng chọn sản phẩm hợp lệ." }, { status: 400 });
    }

    const result = validateCoupon(rawCode, price);

    if (!result.valid) {
      return NextResponse.json(
        {
          ok: false,
          error: result.message || "Mã giảm giá không hợp lệ hoặc đã hết hạn.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      code: result.code,
      label: result.label,
      description: result.description,
      discountAmount: result.discountAmount,
      finalPrice: result.finalPrice,
      originalPrice: result.originalPrice,
      message: result.message,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lỗi kiểm tra mã giảm giá." },
      { status: 500 }
    );
  }
}
