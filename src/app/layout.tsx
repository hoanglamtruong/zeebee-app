import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zeebee Game Vault — Kho Game Offline & Bluetooth Đối Kháng",
  description:
    "Kho game Retro & Bluetooth 2 người chơi offline không cần mạng, dung lượng siêu nhẹ dưới 25KB. Dịch vụ lập trình mini game và tool theo yêu cầu.",
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
