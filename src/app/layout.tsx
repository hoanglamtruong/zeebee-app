import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zee Bee App — App & game nhỏ, build theo yêu cầu",
  description:
    "Mini app và game dùng được ngay, dùng thử miễn phí trước khi mua. Build website, tool, app theo yêu cầu — báo giá theo nhu cầu cụ thể.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
