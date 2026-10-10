import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
      <Link href="/" aria-label="Về trang chủ app.zeebee.vn">
        <Image src="/zeebee_logo_horizontal_white.svg" alt="Zee Bee" width={150} height={33} priority />
      </Link>
      <nav className="flex items-center gap-4 text-sm whitespace-nowrap">
        <Link href="/#san-pham" className="hidden sm:inline hover:underline" style={{ color: "var(--zb-muted)" }}>
          Sản phẩm
        </Link>
        <Link href="/build" className="zb-btn-primary px-3 py-1.5">
          Build theo yêu cầu
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="text-center text-sm py-8 px-6 space-y-1" style={{ color: "var(--zb-muted)" }}>
      <p>
        © {new Date().getFullYear()} Zee Bee · app.zeebee.vn — một sản phẩm trong{" "}
        <a href="https://zeebee.vn" className="underline">
          hệ sinh thái Zeebee
        </a>
      </p>
    </footer>
  );
}
