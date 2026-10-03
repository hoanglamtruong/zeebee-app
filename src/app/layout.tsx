import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zee Bee Agency — Build Web / Tool / App",
  description:
    "Thiết kế & thi công website, tool, app theo yêu cầu — gói cấu hình cơ bản, module mở rộng, hoặc nền tảng tùy biến hoàn toàn.",
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
