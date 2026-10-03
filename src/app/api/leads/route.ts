import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    !body.name.trim() ||
    typeof body.contact !== "string" ||
    !body.contact.trim() ||
    typeof body.packageInterest !== "string" ||
    !body.packageInterest.trim()
  ) {
    return NextResponse.json(
      { error: "Thiếu tên, thông tin liên hệ, hoặc gói quan tâm." },
      { status: 400 }
    );
  }

  const lead = createLead({
    name: body.name.trim(),
    contact: body.contact.trim(),
    packageInterest: body.packageInterest.trim(),
    message: typeof body.message === "string" ? body.message.trim() : undefined,
  });

  return NextResponse.json({ ok: true, lead });
}
