// VÒNG 2 (11/10/2026): danh mục SẢN PHẨM ĐÓNG GÓI của app.zeebee.vn — giá cố định, khách đặt mua
// rồi Seller liên hệ bàn giao (flow chung hệ sinh thái Zeebee: khách dừng ở bước đặt hàng).
// Giá là đề xuất ban đầu đã được CEO duyệt — sửa giá/nội dung tại đây, không cần sửa trang.
// demoUrl = bản chạy thật để khách "Dùng thử" ngay; null = chưa có link công khai.

export type ProductStatus = "available" | "coming_soon";

export interface Product {
  slug: string;
  name: string;
  kind: "Mini app" | "Game";
  tagline: string;
  description: string;
  features: string[];
  price: number;
  demoUrl: string | null;
  status: ProductStatus;
}

export const PRODUCTS: Product[] = [
  {
    slug: "mobo-so-thu-chi",
    name: "MoBo — Quản lý tài chính",
    kind: "Mini app",
    tagline: "Quản lý tài chính cá nhân và hộ kinh doanh, chấm điểm sức khỏe tài chính.",
    description:
      "Theo dõi thu chi, tài sản và nợ của cá nhân hoặc hộ kinh doanh. MoBo chấm điểm sức khỏe tài chính theo 4 trụ cột: an toàn nợ, thanh khoản, dòng tiền và kỷ luật chi tiêu.",
    features: ["Theo dõi thu chi, tài sản, nợ", "Điểm sức khỏe tài chính /100", "Đánh giá 4 trụ cột", "Dùng trên điện thoại và máy tính"],
    price: 49000,
    demoUrl: "https://zmoney.zeebee.io.vn",
    status: "available",
  },
  {
    slug: "zqr-tao-ma-qr",
    name: "zQR — Tạo mã QR chuyên nghiệp",
    kind: "Mini app",
    tagline: "VietQR nhận tiền, QR link, Wi-Fi, danh thiếp — đổi màu, chèn logo.",
    description:
      "Tạo mã QR đa năng: link website, VietQR thanh toán, Wi-Fi, danh thiếp, email, gọi điện. Tùy biến màu gradient, kiểu hạt, chèn logo; có QR động đổi đích đến không cần in lại. Xuất PNG, SVG nét để in ấn.",
    features: ["VietQR nhận chuyển khoản", "QR link, Wi-Fi, danh thiếp", "QR động đổi đích không in lại", "Xuất PNG, SVG chất lượng in"],
    price: 99000,
    demoUrl: null,
    status: "available",
  },
  {
    slug: "ztodo-so-viec",
    name: "Ztodo — Sổ việc cần làm",
    kind: "Mini app",
    tagline: "Quản lý công việc và nhiệm vụ theo không gian làm việc.",
    description:
      "Quản lý việc cá nhân hoặc nhóm nhỏ: tạo nhiệm vụ, sắp xếp theo không gian làm việc, theo dõi tiến độ. Đơn giản, không cần học cách dùng.",
    features: ["Quản lý nhiệm vụ", "Nhiều không gian làm việc", "Giao diện tối giản"],
    price: 29000,
    demoUrl: "https://ztodo.zeebee.io.vn",
    status: "available",
  },
  {
    slug: "mind-flow-so-do-tu-duy",
    name: "Mind Flow — Sơ đồ tư duy",
    kind: "Mini app",
    tagline: "Mind map, dàn ý và Gantt trong một công cụ.",
    description:
      "Vẽ sơ đồ tư duy, trình bày dạng dàn ý, lập tiến độ dạng biểu đồ Gantt. Phù hợp học tập, lên kế hoạch, brainstorm ý tưởng.",
    features: ["Sơ đồ tư duy (mind map)", "Dàn ý (outline)", "Biểu đồ Gantt"],
    price: 49000,
    demoUrl: "https://zmind.zspace.io.vn",
    status: "available",
  },
  {
    slug: "zlink-thu-vien-video",
    name: "Zlink — Thư viện video-link",
    kind: "Mini app",
    tagline: "Lưu và phân loại link video yêu thích ở một chỗ.",
    description:
      "Gom các link video bạn hay xem lại vào một thư viện riêng, sắp xếp và tìm lại nhanh. Hợp cho người sưu tầm nội dung và người làm content.",
    features: ["Thư viện link video riêng", "Sắp xếp, phân loại", "Tìm lại nhanh"],
    price: 79000,
    demoUrl: "https://zlink.zeebee.io.vn",
    status: "available",
  },
  {
    slug: "game-xep-hinh-ca-go",
    name: "Xếp Hình Cá Gỗ",
    kind: "Game",
    tagline: "Game giải đố xếp hình thư giãn, lấy cảm hứng từ Zeebee Decor.",
    description: "Game giải đố nhẹ nhàng chơi ngay trên trình duyệt. Đang phát triển — để lại thông tin để nhận ưu đãi khi ra mắt.",
    features: ["Chơi trên trình duyệt", "Không cần cài đặt"],
    price: 29000,
    demoUrl: null,
    status: "coming_soon",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatVnd(n: number): string {
  return `${n.toLocaleString("vi-VN")}đ`;
}
