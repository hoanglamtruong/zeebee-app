import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PRODUCTS } from "@/lib/catalog";

// VÒNG 2: một container phục vụ 2 tên miền (Cloudflare tunnel trỏ cả hai về cổng 8131):
//  - app.zeebee.vn → cửa hàng app & build theo yêu cầu
//  - zeebee.vn / www.zeebee.vn → "/" hiển thị trang hệ sinh thái
// Trước 10/10/2026 zeebee.vn phục vụ Decor: các đường dẫn Decor cũ (link Telegram, link khách đã
// lưu) được chuyển 301 sang decor.zeebee.vn để không bị hỏng.
const DECOR_PATHS = ["/don-hang", "/gio-hang", "/tra-cuu-don-hang", "/uu-dai", "/sap-ra-mat", "/san-pham-khac", "/admin"];
const APP_SLUGS = new Set(PRODUCTS.map((p) => p.slug));

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const isRootDomain = host === "zeebee.vn" || host === "www.zeebee.vn";
  if (!isRootDomain) return NextResponse.next();

  const { pathname, search } = request.nextUrl;

  const isOldDecorPath =
    DECOR_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    (pathname.startsWith("/san-pham/") && !APP_SLUGS.has(pathname.slice("/san-pham/".length)));
  if (isOldDecorPath) {
    return NextResponse.redirect(`https://home.zeebee.vn${pathname}${search}`, 301);
  }

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/he-sinh-thai", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
