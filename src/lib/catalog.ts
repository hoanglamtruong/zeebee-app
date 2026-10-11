// Danh mục sản phẩm của app.zeebee.vn — sửa giá/nội dung tại đây, không cần sửa trang.
//
// VÒNG 3 (11/10/2026): CEO chốt phân 2 mô hình, ƯU TIÊN "download":
//  - download     = TẢI VỀ DÙNG: trả 1 lần, nhận file, chạy trên máy khách (kể cả offline), dữ liệu
//                   nằm ở máy khách, Zeebee không tốn máy chủ. Seller gửi file qua Zalo sau khi chốt.
//  - subscription = THUÊ BAO DÙNG ONLINE: trả theo tháng/năm, chạy trên máy chủ Zeebee. 5 app hiện có
//                   (MoBo, zQR, Ztodo, Mind Flow, Zlink) đều cần DB/máy chủ nên thuộc nhóm này.
// Khách vẫn dừng ở bước đặt hàng (tên + SĐT); Seller nhận Telegram, tự liên hệ chốt.
// demoUrl = bản chạy thật để "Dùng thử"; null = chưa có link công khai.

export type ProductStatus = "available" | "coming_soon";
export type ProductModel = "download" | "subscription";

export interface Product {
  slug: string;
  name: string;
  model: ProductModel;
  kind: "Mini app" | "Game" | "File Excel" | "Mẫu thiết kế";
  tagline: string;
  description: string;
  features: string[];
  /** download: giá trả 1 lần. subscription: giá 1 tháng. */
  price: number;
  /** subscription: giá 1 năm. */
  yearlyPrice?: number;
  /** download: khách nhận gì. */
  delivery?: string;
  demoUrl: string | null;
  status: ProductStatus;
}

export const MODEL_LABEL: Record<ProductModel, string> = {
  download: "Tải về dùng",
  subscription: "Thuê bao online",
};

export const PRODUCTS: Product[] = [
  // ───────────── TẢI VỀ DÙNG (ưu tiên) ─────────────
  {
    slug: "zqr-offline",
    name: "zQR Offline — Tạo mã QR không cần mạng",
    model: "download",
    kind: "Mini app",
    tagline: "VietQR nhận tiền, QR link, Wi-Fi, danh thiếp — chèn logo, đổi màu. Chạy không cần mạng.",
    description:
      "Một file duy nhất, mở bằng trình duyệt trên máy tính hoặc điện thoại là dùng, không cần mạng, không cần tài khoản. Tạo QR link, VietQR nhận chuyển khoản, Wi-Fi, danh thiếp; đổi màu, chèn logo; tải ảnh PNG hoặc SVG nét để in.",
    features: ["VietQR nhận chuyển khoản", "QR link, Wi-Fi, danh thiếp, văn bản", "Đổi màu, chèn logo", "Xuất PNG, SVG nét để in", "Không cần mạng, không cần tài khoản"],
    price: 79000,
    delivery: "1 file HTML + hướng dẫn sử dụng, gửi qua Zalo",
    demoUrl: null,
    status: "available",
  },
  {
    slug: "excel-so-thu-chi-gia-dinh",
    name: "Sổ thu chi gia đình (Excel)",
    model: "download",
    kind: "File Excel",
    tagline: "Ghi thu chi hằng ngày, tự tổng hợp theo tháng và theo hạng mục.",
    description:
      "File Excel ghi thu chi cho gia đình: nhập từng khoản, chọn hạng mục từ danh sách, file tự tổng hợp thu, chi, số dư theo tháng và theo hạng mục. Mở được bằng Excel hoặc Google Sheets.",
    features: ["Nhập nhanh, chọn hạng mục từ danh sách", "Tự tổng hợp theo tháng", "Tổng hợp theo hạng mục chi", "Dùng Excel hoặc Google Sheets"],
    price: 49000,
    delivery: "File .xlsx + hướng dẫn, gửi qua Zalo",
    demoUrl: null,
    status: "available",
  },
  {
    slug: "excel-quan-ly-ban-hang",
    name: "Quản lý bán hàng shop nhỏ (Excel)",
    model: "download",
    kind: "File Excel",
    tagline: "Danh mục hàng, nhập kho, đơn bán, tồn kho và lợi nhuận — tự tính.",
    description:
      "File Excel cho shop nhỏ: khai báo sản phẩm và giá vốn, ghi phiếu nhập và đơn bán, file tự tính tồn kho, doanh thu và lãi gộp theo tháng. Mở được bằng Excel hoặc Google Sheets.",
    features: ["Danh mục sản phẩm, giá vốn, giá bán", "Ghi nhập kho và đơn bán", "Tự tính tồn kho", "Doanh thu, lãi gộp theo tháng"],
    price: 149000,
    delivery: "File .xlsx + hướng dẫn, gửi qua Zalo",
    demoUrl: null,
    status: "available",
  },
  {
    slug: "excel-cham-cong-tinh-luong",
    name: "Chấm công & tính lương (Excel)",
    model: "download",
    kind: "File Excel",
    tagline: "Chấm công theo ngày, tự tính ngày công, tăng ca và lương tháng.",
    description:
      "File Excel cho hộ kinh doanh, quán nhỏ: danh sách nhân viên và mức lương, bảng chấm công theo ngày trong tháng, file tự tính số công, giờ tăng ca, phụ cấp, khấu trừ và lương thực nhận.",
    features: ["Danh sách nhân viên, lương cơ bản", "Bảng chấm công theo ngày", "Tự tính công, tăng ca", "Bảng lương thực nhận"],
    price: 99000,
    delivery: "File .xlsx + hướng dẫn, gửi qua Zalo",
    demoUrl: null,
    status: "available",
  },
  {
    slug: "game-xep-hinh-ca-go",
    name: "Xếp Hình Cá Gỗ",
    model: "download",
    kind: "Game",
    tagline: "Game giải đố xếp hình thư giãn, lấy cảm hứng từ Zeebee Decor.",
    description: "Game giải đố nhẹ nhàng, chơi trên trình duyệt hoặc cài lên điện thoại, không cần mạng. Đang phát triển — đăng ký để nhận ưu đãi khi ra mắt.",
    features: ["Chơi không cần mạng", "Không cần cài đặt phức tạp"],
    price: 29000,
    delivery: "File game, gửi qua Zalo",
    demoUrl: null,
    status: "coming_soon",
  },

  // ───────────── THUÊ BAO ONLINE ─────────────
  {
    slug: "mobo-so-thu-chi",
    name: "MoBo — Quản lý tài chính",
    model: "subscription",
    kind: "Mini app",
    tagline: "Quản lý tài chính cá nhân và hộ kinh doanh, chấm điểm sức khỏe tài chính.",
    description:
      "Theo dõi thu chi, tài sản và nợ của cá nhân hoặc hộ kinh doanh. MoBo chấm điểm sức khỏe tài chính theo 4 trụ cột: an toàn nợ, thanh khoản, dòng tiền và kỷ luật chi tiêu.",
    features: ["Theo dõi thu chi, tài sản, nợ", "Điểm sức khỏe tài chính /100", "Đánh giá 4 trụ cột", "Dùng trên điện thoại và máy tính"],
    price: 49000,
    yearlyPrice: 490000,
    demoUrl: "https://zmoney.zeebee.io.vn",
    status: "available",
  },
  {
    slug: "zqr-tao-ma-qr",
    name: "zQR Online — QR động",
    model: "subscription",
    kind: "Mini app",
    tagline: "QR động đổi đích đến không cần in lại, kèm đủ loại QR tĩnh.",
    description:
      "Bản online của zQR: ngoài QR tĩnh (link, VietQR, Wi-Fi, danh thiếp…), có QR động — in một lần, đổi link đích bất cứ lúc nào. Tùy biến màu gradient, kiểu hạt, chèn logo; xuất PNG, SVG.",
    features: ["QR động đổi đích không in lại", "VietQR, link, Wi-Fi, danh thiếp", "Đổi màu, chèn logo", "Xuất PNG, SVG chất lượng in"],
    price: 49000,
    yearlyPrice: 490000,
    demoUrl: null,
    status: "available",
  },
  {
    slug: "ztodo-so-viec",
    name: "Ztodo — Quản lý công việc",
    model: "subscription",
    kind: "Mini app",
    tagline: "Quản lý công việc và nhiệm vụ theo không gian làm việc.",
    description:
      "Quản lý việc cá nhân hoặc nhóm nhỏ: tạo nhiệm vụ, sắp xếp theo không gian làm việc, theo dõi tiến độ. Đơn giản, không cần học cách dùng.",
    features: ["Quản lý nhiệm vụ", "Nhiều không gian làm việc", "Giao diện tối giản"],
    price: 29000,
    yearlyPrice: 290000,
    demoUrl: "https://ztodo.zeebee.io.vn",
    status: "available",
  },
  {
    slug: "mind-flow-so-do-tu-duy",
    name: "Mind Flow — Sơ đồ tư duy",
    model: "subscription",
    kind: "Mini app",
    tagline: "Mind map, dàn ý và Gantt trong một công cụ.",
    description:
      "Vẽ sơ đồ tư duy, trình bày dạng dàn ý, lập tiến độ dạng biểu đồ Gantt. Phù hợp học tập, lên kế hoạch, brainstorm ý tưởng.",
    features: ["Sơ đồ tư duy (mind map)", "Dàn ý (outline)", "Biểu đồ Gantt"],
    price: 39000,
    yearlyPrice: 390000,
    demoUrl: "https://zmind.zspace.io.vn",
    status: "available",
  },
  {
    slug: "zlink-thu-vien-video",
    name: "Zlink — Thư viện video-link",
    model: "subscription",
    kind: "Mini app",
    tagline: "Lưu và phân loại link video yêu thích ở một chỗ.",
    description:
      "Gom các link video bạn hay xem lại vào một thư viện riêng, sắp xếp và tìm lại nhanh. Hợp cho người sưu tầm nội dung và người làm content.",
    features: ["Thư viện link video riêng", "Sắp xếp, phân loại", "Tìm lại nhanh"],
    price: 39000,
    yearlyPrice: 390000,
    demoUrl: "https://zlink.zeebee.io.vn",
    status: "available",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatVnd(n: number): string {
  return `${n.toLocaleString("vi-VN")}đ`;
}

/** Nhãn giá ngắn: "79.000đ" (tải về) hoặc "49.000đ/tháng" (thuê bao). */
export function priceLabel(p: Product): string {
  return p.model === "subscription" ? `${formatVnd(p.price)}/tháng` : formatVnd(p.price);
}
