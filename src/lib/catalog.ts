// Danh mục sản phẩm của app.zeebee.vn — sửa giá/nội dung tại đây.
//
// PHIÊN BẢN MỚI 2026: TÁI ĐỊNH VỊ 100% CỬA HÀNG SẢN PHẨM SỐ OFFLINE-FIRST:
//  - 100% Sản phẩm ĐÃ ĐƯỢC ĐÓNG GÓI CHUẨN ANDROID APK (Zstore):
//    Trả 1 lần, sở hữu vĩnh viễn, không phí thuê bao hàng tháng, bảo mật cục bộ.
//  - Tất cả các sản phẩm chưa đóng gói APK đã được loại bỏ hoàn toàn khỏi cửa hàng.
//  - Khách hàng tải trực tiếp file .APK cài đặt trên điện thoại Android, dùng thử 7 ngày miễn phí
//    và kích hoạt key bản quyền vĩnh viễn theo mã thiết bị.

export type ProductStatus = "available" | "coming_soon";
export type ProductModel = "download";
export type ProductCategory = "pro-tools" | "business" | "games";

export interface Product {
  slug: string;
  name: string;
  model: ProductModel;
  kind: string;
  category: ProductCategory;
  format: string;
  tagline: string;
  description: string;
  features: string[];
  /** Giá niêm yết (VNĐ) trả một lần dùng trọn đời */
  price: number;
  /** Sản phẩm tải về: khách nhận gì */
  delivery: string;
  demoUrl: string | null;
  downloadUrl?: string;
  zipUrl?: string;
  devicePrefix?: string;
  status: ProductStatus;
  mockupIdea?: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  features: string[];
  demoUrl: string | null;
  downloadUrl?: string;
  devicePrefix?: string;
}

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  discountPercent: number;
  originalPrice: number;
  bundlePrice: number;
  products: string[];
  badge: string;
}

export const CATEGORY_TABS = [
  { id: "all", label: "Tất cả Mini App APK" },
  { id: "pro-tools", label: "Công cụ Xây dựng & Kỹ thuật" },
  { id: "business", label: "Kinh doanh & Bán lẻ" },
  { id: "games", label: "Game Đối Kháng Bluetooth" },
] as const;

export const PRODUCTS: Product[] = [
  // ─── 01. Concrete Volume & Material Estimator ───
  {
    slug: "concrete-volume-estimator",
    name: "Bê Tông Pro (Concrete Volume & Material Estimator)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Tính chính xác thể tích m³ bê tông mọi hình khối và tự động bóc tách khối lượng xi măng, cát, đá theo Mác công trình. Xuất báo cáo PDF.",
    description:
      "Công cụ bỏ túi thiết yếu cho kỹ sư công trường, nhà thầu xây dựng và cai thầu: nhập thông số hình học (móng đơn, móng băng, dầm giằng, cột tròn, cột vuông, sàn, cọc khoan nhồi) để tính chính xác thể tích m³ bê tông. Ứng dụng tự động bóc tách định mức cấp phối vật liệu (xi măng bao/tấn, cát vàng m³, đá dăm m³, nước lít) theo Mác bê tông tiêu chuẩn 150, 200, 250, 300 và cho phép xuất báo cáo PDF.",
    features: [
      "Tính toán nhanh thể tích các cấu kiện: móng, đài cọc, cột, dầm, sàn sàn, lanh tô",
      "Tự động tra cấp phối định mức vật tư theo Mác bê tông tiêu chuẩn Việt Nam",
      "Bóc tách khối lượng chi tiết: số bao xi măng, số khối cát, số khối đá, lượng nước",
      "Cấu hình hệ số hao hụt đổ bê tông thực tế tại công trường (3% - 5%)",
      "Xuất phiếu dự toán vật tư định dạng PDF gửi trực tiếp qua Zalo cho thợ hoặc chủ nhà",
      "Hoạt động 100% offline tại chân công trình không phụ thuộc sóng di động",
    ],
    price: 59000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_01_BeTong_Pro_Offline.html",
    downloadUrl: "/downloads/BeTong_Pro_v1.0.apk",
    zipUrl: "/downloads/BeTong_Pro_v1.0.zip",
    devicePrefix: "BT",
    status: "available",
    mockupIdea: "Thợ xây dựng cầm điện thoại ngoài công trường với bảng khối lượng vật liệu và bản vẽ 3D khối bê tông.",
  },

  // ─── 02. Product Pricing & Profit Margin Pro ───
  {
    slug: "pricing-profit-margin-pro",
    name: "Định Giá & Lợi Nhuận (Pricing & Profit Margin Pro)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Nhập giá vốn, trừ phí sàn Shopee/TikTok/Lazada, phí ship để tính giá bán chuẩn và phân biệt Margin vs Markup.",
    description:
      "Ứng dụng định giá bán và bảo vệ biên lợi nhuận chuyên dụng cho người kinh doanh online: tự động trừ chính xác các khoản phí sàn (phí cố định, phí thanh toán, phí dịch vụ Freeship Extra, Voucher Extra của Shopee, TikTok Shop, Lazada), chi phí đóng gói, tỷ lệ hoàn hàng và phí quảng cáo để đưa ra giá niêm yết chuẩn xác, giúp người bán không bao giờ bị 'bán đắt khách chê — bán rẻ lỗ vốn'.",
    features: [
      "Tự động cập nhật biểu phí sàn thương mại điện tử Shopee, TikTok Shop, Lazada mới nhất",
      "Phân biệt rõ ràng và tính toán song song giữa Biên lợi nhuận (Margin %) và Tỷ lệ đội giá (Markup %)",
      "Tính toán chi phí hoàn đơn và rủi ro hàng hỏng phân bổ vào từng đơn hàng",
      "Mô phỏng 3 mức giá bán: Giá bán lẻ chuẩn, Giá chạy Flash Sale, Giá bán buôn/sỉ",
      "Tính toán chi phí quảng cáo tối đa (Break-even ROAS) trước khi bị lỗ vốn",
      "Lưu lại danh sách công thức giá theo từng nhóm hàng để tra cứu tức thì",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_04_DinhGia_LoiNhuan_Pro.html",
    downloadUrl: "/downloads/DinhGia_Cost_Pro_v1.0.apk",
    zipUrl: "/downloads/DinhGia_Cost_Pro_v1.0.zip",
    devicePrefix: "DG",
    status: "available",
    mockupIdea: "Giao diện điện thoại so sánh 2 cột: 'Giá bán đề xuất' và 'Lợi nhuận ròng thực nhận'.",
  },

  // ─── 03. Quotation & Invoice Maker Offline ───
  {
    slug: "quotation-invoice-maker",
    name: "Hóa Đơn Mini Offline (Quotation & Invoice Maker)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Tạo báo giá dịch vụ trong 30 giây và chuyển 1 chạm thành chứng từ thanh toán/hóa đơn bán lẻ xuất PDF có logo riêng của bạn.",
    description:
      "Ứng dụng làm báo giá và xuất hóa đơn bán lẻ độc lập trên điện thoại di động: tạo bảng báo giá chi tiết gồm danh mục dịch vụ, đơn giá, chiết khấu và thuế VAT chỉ trong 30 giây. Khi khách hàng đồng ý chốt đơn, chỉ cần chạm 1 nút để chuyển đổi ngay thành hóa đơn thanh toán PDF chuyên nghiệp có đính kèm logo công ty và mã VietQR nhận tiền chính xác.",
    features: [
      "Tạo mẫu báo giá dịch vụ thẩm mỹ cao, sắc nét chỉ trong 30 giây",
      "Chuyển đổi 1 chạm từ Báo giá thành Hóa đơn bán lẻ / Biên nhận thanh toán",
      "Tích hợp tự động mã VietQR nhận tiền gắn sẵn số tiền đơn hàng để khách quét trả ngay",
      "Chèn logo doanh nghiệp, thông tin liên hệ, chữ ký điện tử và điều khoản thanh toán",
      "Xuất file PDF chuẩn A4/A5 để gửi trực tiếp qua Zalo hoặc in bằng máy in nhiệt/Wi-Fi",
      "Hoạt động offline hoàn toàn, lưu trữ toàn bộ lịch sử báo giá an toàn trên máy",
    ],
    price: 79000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_07_HoaDon_Mini_Offline.html",
    downloadUrl: "/downloads/HoaDon_Mini_v1.0.apk",
    zipUrl: "/downloads/HoaDon_Mini_v1.0.zip",
    devicePrefix: "HD",
    status: "available",
    mockupIdea: "Mẫu phiếu báo giá PDF sắc nét in logo doanh nghiệp xuất ra từ điện thoại.",
  },

  // ─── 04. Local Tic-Tac-Toe Pro & Bluetooth ───
  {
    slug: "game-tic-tac-toe-pro",
    name: "Cờ Ca Rô Offline & Bluetooth 2 Người (Local Tic-Tac-Toe Pro)",
    model: "download",
    kind: "Android APK",
    category: "games",
    format: "Android APK",
    tagline: "Bàn cờ caro 5 quân đối kháng trực tiếp qua Bluetooth hoặc 2 người cùng chơi trên 1 màn hình, hoàn toàn không cần Internet.",
    description:
      "Tựa game cờ caro kinh điển dành cho 2 người chơi: kết nối đối kháng cục bộ siêu tốc giữa 2 điện thoại qua sóng Bluetooth mà không cần kết nối Wi-Fi hay 4G/5G, hoặc chế độ 2 người chơi luân phiên trên cùng một màn hình điện thoại/máy tính bảng. Bàn cờ vô tận, âm thanh cờ gỗ chân thực và lưu lại lịch sử đối đầu chi tiết.",
    features: [
      "Đối kháng 2 người qua kết nối Bluetooth siêu tốc, không tốn 1 byte dữ liệu mạng",
      "Chế độ Pass & Play chơi chung trên 1 thiết bị cho bạn bè, đồng nghiệp giải lao",
      "Chế độ đấu với máy AI Offline nhiều cấp độ (Dễ, Trung bình, Cao thủ)",
      "Bàn cờ mở rộng không giới hạn với luật chặn 2 đầu chuẩn thi đấu",
      "Giao diện gỗ sang trọng, hiệu ứng âm thanh lách cách đặt quân thư giãn",
      "Sở hữu vĩnh viễn, không quảng cáo chen ngang, không thu phí duy trì",
    ],
    price: 29000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "CR",
    status: "available",
    mockupIdea: "Hai chiếc điện thoại đặt cạnh nhau đang kết nối thi đấu cờ caro với bàn cờ bằng gỗ.",
  },
];

// ───────────── COMBO / BUNDLE TIẾT KIỆM 35% (100% APK ĐÃ ĐÓNG GÓI) ─────────────
export const BUNDLES: Bundle[] = [
  {
    id: "bundle-master-apk-4in1",
    name: "Combo Master 4 Mini App APK & Game Bluetooth",
    tagline: "Trọn bộ 4 ứng dụng Android APK độc quyền: Bê Tông Pro + Định Giá Lợi Nhuận + Hóa Đơn Mini + Cờ Caro Bluetooth.",
    discountPercent: 35,
    originalPrice: 206000,
    bundlePrice: 134000,
    products: ["concrete-volume-estimator", "pricing-profit-margin-pro", "quotation-invoice-maker", "game-tic-tac-toe-pro"],
    badge: "Tiết kiệm 35%",
  },
];

// ───────────── CASE STUDIES: NĂNG LỰC CÔNG NGHỆ (MỤC BUILD THEO YÊU CẦU) ─────────────
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "mobo-so-thu-chi",
    name: "MoBo — Hệ Thống Đánh Giá & Quản Trị Sức Khỏe Tài Chính",
    type: "Web Cloud SaaS & Mini App",
    tagline: "Theo dõi thu chi, tài sản, công nợ và tự động chấm điểm sức khỏe tài chính theo 4 trụ cột.",
    description:
      "Ứng dụng phân tích tài chính toàn diện cho hộ kinh doanh và cá nhân: quản trị dòng tiền, danh mục tài sản và nợ vay, tự động chấm điểm sức khỏe tài chính theo thang 100 dựa trên tính thanh khoản, hệ số an toàn nợ và kỷ luật dòng tiền.",
    features: ["Quản trị tài sản, nợ và dòng tiền đa nguồn", "Thuật toán chấm điểm sức khỏe tài chính /100", "Đánh giá 4 trụ cột tài chính doanh nghiệp nhỏ", "Giao diện Dashboard trực quan trên máy tính và di động"],
    demoUrl: "https://zmoney.zeebee.io.vn",
  },
  {
    slug: "zqr-tao-ma-qr",
    name: "zQR Cloud — Nền Tảng Tạo & Quản Lý Mã QR Động Thông Minh",
    type: "Nền tảng Quản trị QR Thông Minh",
    tagline: "Mã QR động cho phép thay đổi trang đích tức thì không cần in lại bao bì, tích hợp thống kê quét.",
    description:
      "Hệ thống tạo và điều hướng mã QR động chuyên nghiệp: một lần in ấn lên bao bì, menu hoặc biển quảng cáo nhưng có thể linh hoạt thay đổi đường link đích đến bất cứ lúc nào, đồng thời ghi nhận thống kê số lượt quét mã và vị trí theo thời gian thực.",
    features: ["Đổi đích đến của mã QR tức thì mà không cần in lại", "Hỗ trợ QR thanh toán VietQR, Wi-Fi, vCard, tài liệu PDF", "Tùy biến phong cách màu sắc thương hiệu và chèn logo", "Theo dõi số lượt quét mã và thiết bị truy cập"],
    demoUrl: null,
  },
  {
    slug: "ztodo-so-viec",
    name: "Ztodo — Nền Tảng Phân Rã & Điều Hành Công Việc Nhóm",
    type: "Ứng dụng Điều hành Nội bộ",
    tagline: "Quản lý nhiệm vụ, phân quyền công việc theo không gian và theo dõi tiến độ hoàn thành.",
    description:
      "Hệ thống quản lý công việc và nhiệm vụ nhóm nhỏ với triết lý tối giản hóa: không đòi hỏi đào tạo phức tạp, phân chia công việc theo các không gian làm việc độc lập, nhắc việc tự động và báo cáo tiến độ trực quan.",
    features: ["Phân tách không gian làm việc cho từng dự án", "Quản lý nhiệm vụ theo danh sách hoặc thẻ Kanban", "Theo dõi tiến độ hoàn thành công việc theo thời gian thực"],
    demoUrl: "https://ztodo.zeebee.io.vn",
  },
  {
    slug: "mind-flow-so-do-tu-duy",
    name: "Mind Flow — Công Cụ Sơ Đồ Tư Duy & Biểu Đồ Tiến Độ Gantt",
    type: "Web App Tư Duy & Lập Kế Hoạch",
    tagline: "Biến ý tưởng thành sơ đồ tư duy (Mindmap), dàn ý phân cấp và lịch trình Gantt trực quan.",
    description:
      "Giải pháp hỗ trợ lên kế hoạch dự án và brainstorm ý tưởng: cho phép chuyển đổi mượt mà giữa sơ đồ tư duy dạng nhánh rẽ sang dàn ý gạch đầu dòng phân cấp và biểu đồ tiến độ Gantt chuẩn xác.",
    features: ["Vẽ sơ đồ tư duy (Mind Map) trực quan mượt mà", "Chuyển đổi 1 chạm sang dạng dàn ý (Outline)", "Xem tiến độ dự án dưới dạng biểu đồ Gantt chuẩn"],
    demoUrl: "https://zmind.zspace.io.vn",
  },
  {
    slug: "zlink-thu-vien-video",
    name: "Zlink — Thư Viện Lưu Trữ & Phân Loại Video-Link Chuyên Sâu",
    type: "Hệ thống Quản lý Dữ liệu Số",
    tagline: "Tập trung và phân loại kho video tư liệu, khóa học và link tham khảo ở một nơi duy nhất.",
    description:
      "Hệ thống kho lưu trữ và phân loại các liên kết video tư liệu cho các nhà sáng tạo nội dung, trung tâm đào tạo và đội ngũ truyền thông, hỗ trợ gắn tag thông minh và tìm kiếm tức thì.",
    features: ["Quản lý kho liên kết video đa nền tảng tập trung", "Hệ thống gắn tag và phân loại thư mục thông minh", "Trình phát video tích hợp sẵn và tìm kiếm tốc độ cao"],
    demoUrl: "https://zlink.zeebee.io.vn",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatVnd(n: number): string {
  return `${n.toLocaleString("vi-VN")}đ`;
}

/** Nhãn giá: "79.000đ" */
export function priceLabel(p: Product): string {
  return formatVnd(p.price);
}
