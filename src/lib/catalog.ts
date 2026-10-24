// Danh mục sản phẩm của app.zeebee.vn — sửa giá/nội dung tại đây.
//
// PHIÊN BẢN MỚI 2026: TÁI ĐỊNH VỊ 100% CỬA HÀNG SẢN PHẨM SỐ OFFLINE-FIRST:
//  - 100% Sản phẩm ĐÃ ĐƯỢC ĐÓNG GÓI CHUẨN ANDROID APK (Zstore):
//    Trả 1 lần, sở hữu vĩnh viễn, không phí thuê bao hàng tháng, bảo mật cục bộ.
//  - Dữ liệu sản phẩm đồng bộ chính xác từ Google Sheet kế hoạch 100 Mini App Zeebee.
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
  { id: "pro-tools", label: "Công cụ Kỹ thuật & Xây dựng" },
  { id: "business", label: "Quản lý Bán hàng & Dịch vụ" },
  { id: "games", label: "Game Đối Kháng Bluetooth" },
] as const;

export const PRODUCTS: Product[] = [
  // ─── 01. Concrete Volume & Material Estimator (Sheet ID 1) ───
  {
    slug: "concrete-volume-estimator",
    name: "Bê Tông Pro (Concrete Volume Estimator)",
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

  // ─── 02. 3D Print Cost Calculator (Sheet ID 2) ───
  {
    slug: "3d-print-cost-calculator",
    name: "In 3D Pro (3D Print Cost Calculator)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Tính giá thành in 3D từ số gram nhựa, thời gian chạy máy, tiền điện và khấu hao để xuất báo giá cho khách hàng.",
    description:
      "Ứng dụng tính giá thành và báo giá in 3D chuyên dụng cho các xưởng in dịch vụ, Maker và người dùng máy in FDM/SLA: nhập đơn giá cuộn nhựa filament (PLA, PETG, ABS, TPU, Resin), khối lượng in (gram), thời gian in máy, công suất tiêu thụ điện (Watt) và chi phí nhân công để tự động tính chính xác giá vốn (COGS) và gợi ý giá bán theo tỷ lệ Markup, xuất báo giá gửi khách qua Zalo tức thì.",
    features: [
      "Tính chi phí nhựa filament/resin kèm tỷ lệ hao hụt in hỏng (3% - 10%)",
      "Tính tiền điện thực tế theo công suất máy in (Watt) và số giờ in liên tục",
      "Tính chi phí khấu hao hao mòn máy in và chi phí công kỹ thuật hậu kỳ",
      "Tự động tính giá vốn sản xuất (COGS) và giá bán đề xuất theo tỷ lệ Markup mong muốn",
      "Lưu lịch sử báo giá các đơn in khách hàng cục bộ không sợ mất dữ liệu",
      "Sao chép mẫu báo giá chuyên nghiệp 1 chạm gửi cho khách hàng",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_02_In3D_Cost_Pro.html",
    downloadUrl: "/downloads/In3D_Pro_v1.0.apk",
    zipUrl: "/downloads/In3D_Pro_v1.0.zip",
    devicePrefix: "3D",
    status: "available",
    mockupIdea: "Cuộn nhựa in 3D filament đặt cạnh mô hình in kèm bảng chi phí chi tiết trên điện thoại.",
  },

  // ─── 03. Electrical Engineering Calculator (Sheet ID 5) ───
  {
    slug: "electrical-calculator",
    name: "Kỹ Thuật Điện Pro (Electrical Calculator)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Tính toán định luật Ohm, công suất điện 1 pha/3 pha, chọn tiết diện dây dẫn đồng nhôm và quy đổi đơn vị điện.",
    description:
      "Sổ tay kỹ thuật số bỏ túi cho thợ điện, sinh viên ngành điện và kỹ thuật viên bảo trì cơ điện (M&E): hỗ trợ giải nhanh định luật Ohm (U, I, R, P) chỉ với 2 thông số đầu vào bất kỳ; tính toán dòng điện định mức cho hệ thống điện 1 pha 220V và 3 pha 380V; tính chọn tiết diện ruột dây cáp điện đồng/nhôm theo mật độ dòng điện kinh tế (J) và khuyến nghị Aptomat (CB) bảo vệ phù hợp.",
    features: [
      "Giải nhanh định luật Ohm: nhập 2 đại lượng bất kỳ để tự động suy ra 2 đại lượng còn lại",
      "Tính toán công suất & dòng điện định mức hệ thống 1 pha dân dụng và 3 pha công nghiệp",
      "Tính chọn tiết diện ruột dây dẫn đồng (J=6A/mm²) và nhôm (J=4A/mm²) chuẩn Việt Nam",
      "Khuyến nghị định mức dòng cắt Aptomat (CB/MCB) bảo vệ dự phòng theo tải",
      "Bảng quy đổi đơn vị điện năng: kW sang Mã lực (HP), BTU/h điều hòa, kVA, kWh",
      "Hoạt động 100% offline tại hiện trường, nhà xưởng hoặc công trình hầm sâu",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_05_Dien_Pro.html",
    downloadUrl: "/downloads/Dien_Pro_v1.0.apk",
    zipUrl: "/downloads/Dien_Pro_v1.0.zip",
    devicePrefix: "EE",
    status: "available",
    mockupIdea: "Sơ đồ mạch điện tử với các đồng hồ đo Vôn, Ampe, Watt hiển thị trực quan.",
  },

  // ─── 04. Product Pricing & Profit Margin Pro (Sheet ID 4) ───
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

  // ─── 05. Quotation & Invoice Maker Offline (Sheet ID 7 & 8) ───
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

  // ─── 06. Mini Inventory Offline Pro (Sheet ID 11) ───
  {
    slug: "mini-inventory-offline",
    name: "Sổ Kho Mini Offline (Mini Inventory Pro)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Quản lý nhập - xuất - tồn kho mini theo mã SKU ngay trên điện thoại, cảnh báo hàng sắp hết, sao lưu file Excel.",
    description:
      "Ứng dụng quản trị kho hàng mini gọn nhẹ, hoạt động hoàn toàn offline: theo dõi biến động nhập kho và xuất kho theo từng mã sản phẩm SKU, thiết lập ngưỡng tồn kho an toàn để nhận cảnh báo màu vàng/đỏ khi sắp cạn hàng, tự động tính tổng giá trị kho hàng theo giá vốn, đồng thời hỗ trợ trích xuất toàn bộ dữ liệu ra tệp bảng tính Excel (CSV) để đối soát.",
    features: [
      "Quản lý danh mục hàng hóa theo SKU, tên sản phẩm, giá vốn và giá bán niêm yết",
      "Tạo phiếu Nhập kho (+) và phiếu Xuất bán (-) siêu tốc chỉ với 2 chạm",
      "Cảnh báo trực quan màu sắc khi số lượng sản phẩm chạm ngưỡng tồn tối thiểu",
      "Dashboard thống kê tổng giá trị tiền hàng tồn kho và số lượng mặt hàng đang quản lý",
      "Xuất toàn bộ cơ sở dữ liệu kho hàng ra file Excel (.csv) lưu trữ trên thiết bị",
      "100% không cần Internet, dữ liệu bảo mật tuyệt đối trên thiết bị của bạn",
    ],
    price: 99000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_11_SoKho_Mini.html",
    downloadUrl: "/downloads/SoKho_Mini_v1.0.apk",
    zipUrl: "/downloads/SoKho_Mini_v1.0.zip",
    devicePrefix: "MK",
    status: "available",
    mockupIdea: "Giao diện quản lý danh mục tồn kho hiển thị trực quan các cảnh báo màu vàng/đỏ.",
  },

  // ─── 07. Tailor Measurement Book (Sheet ID 6) ───
  {
    slug: "tailor-measurement-book",
    name: "Sổ Đo Tiệm May (Tailor Measurement Book)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Sổ lưu số đo khách hàng điện tử cho tiệm may, lưu ghi chú kiểu dáng, mẫu vải và tìm kiếm khách theo tên/SĐT tức thì.",
    description:
      "Trợ lý số đo thông minh dành riêng cho tiệm may đo thời trang, nhà may áo dài, veston, đầm dạ hội và thợ may gia đình: lưu trữ đầy đủ bộ thông số đo chi tiết (cổ, ngực, hạ ngực, cách ngực, eo, hạ eo, mông, vai, dài tay, bắp tay, dài áo, dài quần/váy), ghi chú yêu cầu kiểu dáng vải và ngày hẹn lấy đồ, tìm kiếm hồ sơ khách hàng chỉ trong 1 giây.",
    features: [
      "Bảng số đo chuẩn hóa cho may đo Việt Nam: Áo dài, Váy đầm, Sơ mi, Quần tây, Veston",
      "Tìm kiếm khách hàng siêu tốc theo tên hoặc số điện thoại",
      "Quản lý tiến độ may: Chờ cắt may, Đang may / Thử đồ, Đã hoàn thành, Đã giao khách",
      "Lưu ghi chú chi tiết kiểu cổ áo, tay áo, tà xẻ, màu sắc và yêu cầu riêng của từng khách",
      "Sao chép nhanh bảng thông số số đo sang định dạng tin nhắn gửi qua Zalo",
      "Xuất danh sách và số đo toàn bộ khách hàng ra tệp Excel CSV để lưu trữ",
    ],
    price: 59000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_06_SoDo_TiemMay.html",
    downloadUrl: "/downloads/SoDo_TiemMay_v1.0.apk",
    zipUrl: "/downloads/SoDo_TiemMay_v1.0.zip",
    devicePrefix: "TM",
    status: "available",
    mockupIdea: "Cuộn thước dây may mặc đặt cạnh giao diện sổ ghi số đo khách hàng trên điện thoại.",
  },

  // ─── 08. Local Tic-Tac-Toe Pro & Bluetooth (Sheet ID 51) ───
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

  // ─── 09. Bluetooth Battleship Duel (Sheet ID 53) ───
  {
    slug: "game-battleship-duel",
    name: "Đấu Tàu Chiến Hải Quân (Battleship Duel Offline)",
    model: "download",
    kind: "Android APK",
    category: "games",
    format: "Android APK",
    tagline: "Game chiến hạm hải quân đối kháng 2 người: dàn trận giấu tàu bí mật và nã pháo đánh chìm hạm đội địch offline.",
    description:
      "Tựa game hải chiến kinh điển dành cho 2 người chơi hoặc đấu với máy AI: bố trí hạm đội gồm 4 lớp chiến hạm (Tàu sân bay, Tàu khu trục, Tàu ngầm, Tàu tuần tra) trên lưới radar hải quân 8x8. Lần lượt khai hỏa nã pháo vào tọa độ ẩn của đối phương, phát hiện vị trí tàu và đánh chìm toàn bộ hạm đội địch để giành chiến thắng vinh quang.",
    features: [
      "Chế độ Đấu Máy AI Offline thông minh tự động quét radar phản pháo",
      "Chế độ Pass & Play 2 người chơi luân phiên trên 1 điện thoại với màn hình giấu tàu",
      "Lưới hải quân 8x8 trực quan với hiệu ứng nổ pháo và tàu chìm sinh động",
      "Bảng thống kê tỷ số thắng thua đối đầu chi tiết giữa 2 thuyền trưởng",
      "100% chạy mượt mà không cần mạng Internet hay 4G",
      "Sở hữu vĩnh viễn, không quảng cáo làm gián đoạn trận hải chiến",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/Game_53_TauChien_Bluetooth.html",
    downloadUrl: "/downloads/TauChien_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/TauChien_Bluetooth_v1.0.zip",
    devicePrefix: "BS",
    status: "available",
    mockupIdea: "Bản đồ radar hải quân với các chiến hạm đang khai hỏa nã pháo trên biển.",
  },

  // ─── 10. Freelancer Rate Calculator (Sheet ID 3) ───
  {
    slug: "freelancer-rate-calculator",
    name: "Định Giá Giờ Công Freelancer Pro (Freelancer Rate)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Định giá thù lao giờ công chuẩn xác, tính giá hòa vốn và xuất báo giá hợp đồng dự án trong 30 giây.",
    description:
      "Công cụ tài chính bỏ túi dành riêng cho Freelancer, Designer, Coder, Copywriter và người làm nghề tự do: nhập mức thu nhập mục tiêu, chi phí cố định (máy tính, phần mềm, cafe, điện nước), số ngày làm việc thực tế và tỷ lệ giờ tính phí để tính ra chính xác thù lao giờ công tối thiểu (hòa vốn) và mức giá đề xuất chào khách. Tích hợp tính giá trọn gói dự án và xuất báo giá tóm tắt gửi Zalo/Email.",
    features: [
      "Tính toán mức thù lao theo giờ (Hourly Rate) và giá theo ngày (Daily Rate)",
      "Phân bổ chi phí cố định, thuế và quỹ dự phòng tài chính rủi ro",
      "Tính toán tỷ lệ thời gian tính phí thực tế (Billable Hours) khoa học",
      "Bảng dự toán báo giá dự án nhanh theo độ phức tạp và chi phí tài nguyên",
      "Xuất tóm tắt báo giá chuyên nghiệp để gửi trực tiếp cho khách hàng",
      "100% Offline, lưu trữ và bảo mật dữ liệu thù lao tuyệt đối trên máy",
    ],
    price: 29000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_03_Freelancer_Rate.html",
    downloadUrl: "/downloads/Freelancer_Rate_v1.0.apk",
    zipUrl: "/downloads/Freelancer_Rate_v1.0.zip",
    devicePrefix: "FR",
    status: "available",
    mockupIdea: "Giao diện tính toán thù lao giờ công với biểu đồ phân bổ chi phí và bảng giá đề xuất.",
  },

  // ─── 11. Room Paint & Tile Calculator (Sheet ID 38 & 39 - Thay thế ID 9) ───
  {
    slug: "paint-tile-calculator",
    name: "Tính Sơn Tường & Gạch Lát Nền Pro (Paint & Tile Pro)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Đo diện tích phòng để tính chính xác số thùng sơn tường và số hộp gạch lát sàn kèm tỷ lệ hao hụt thi công.",
    description:
      "Ứng dụng tính toán khối lượng vật tư hoàn thiện công trình nhà ở: nhập kích thước dài, rộng, cao của căn phòng, trừ diện tích cửa sổ, cửa đi để bóc tách chính xác số lít sơn lót kháng kiềm, số thùng sơn phủ 18L và lon 5L. Đồng thời tính toán chuẩn xác diện tích lát sàn, quy đổi ra số viên gạch theo các kích thước phổ biến (30x30, 40x40, 50x50, 60x60, 80x80, 60x120cm), số hộp gạch đóng gói và bao keo dán gạch cần mua.",
    features: [
      "Bóc tách diện tích tường và trần nhà, tự động trừ diện tích hệ thống cửa",
      "Tính toán số lít sơn phủ (1-3 lớp) và sơn lót kèm tỷ lệ hao hụt 5-15%",
      "Quy đổi khối lượng sơn ra thùng 18L và lon 5L thực tế tại đại lý sơn",
      "Tính gạch lát sàn & ốp tường theo nhiều kích thước chuẩn và tính năng cắt viền",
      "Ước tính số bao keo dán gạch và tổng chi phí tiền gạch công trình",
      "Hoạt động offline 100% ngoài công trường xây dựng không cần mạng",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_38_Son_Gach_Pro.html",
    downloadUrl: "/downloads/Son_Gach_Pro_v1.0.apk",
    zipUrl: "/downloads/Son_Gach_Pro_v1.0.zip",
    devicePrefix: "PG",
    status: "available",
    mockupIdea: "Căn phòng 3D với các mảng tường màu sơn và sàn gạch cùng số lượng vật tư cần mua.",
  },

  // ─── 12. Unit Converter Pro (Sheet ID 10) ───
  {
    slug: "unit-converter-pro",
    name: "Đổi Đơn Vị Kỹ Thuật Pro (Unit Converter Pro)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Bảng quy đổi tức thì 6 nhóm đơn vị đo lường kỹ thuật: Chiều dài, khối lượng, áp suất, thể tích, công suất & nhiệt độ.",
    description:
      "Công cụ chuyển đổi đơn vị đo lường kỹ thuật thực địa chuẩn xác: chỉ cần gõ 1 con số, toàn bộ các đơn vị tương đương trong nhóm (Mét, Inch, Feet, Bar, PSI, MPa, Kilôgam, Pound, Lít, Gallon, Mã lực HP, kW, Độ C, Độ F) sẽ được quy đổi đồng thời ngay lập tức trên cùng một màn hình. Chạm vào bất kỳ kết quả nào để sao chép nhanh vào bộ nhớ tạm.",
    features: [
      "6 nhóm đại lượng kỹ thuật chuyên dụng: Chiều dài, Khối lượng, Áp suất, Thể tích, Công suất, Nhiệt độ",
      "Chuyển đổi tức thì đa đơn vị đồng thời trên 1 màn hình duy nhất",
      "Hỗ trợ các đơn vị kỹ thuật quốc tế: Bar, PSI, MPa, ATM, HP, BTU/h, kW, lb, oz",
      "Chạm 1 chạm để sao chép kết quả chính xác vào bộ nhớ tạm",
      "Giao diện tối ưu thao tác 1 tay, tốc độ phản hồi 0ms không độ trễ",
      "100% Offline, không có quảng cáo gây phiền toái",
    ],
    price: 19000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/App_10_Doi_Don_Vi_Pro.html",
    downloadUrl: "/downloads/DoiDonVi_Pro_v1.0.apk",
    zipUrl: "/downloads/DoiDonVi_Pro_v1.0.zip",
    devicePrefix: "UC",
    status: "available",
    mockupIdea: "Giao diện đổi đơn vị kỹ thuật hiển thị các thước đo áp suất bar, PSI và công suất kW.",
  },

  // ─── 13. Bluetooth Rock Paper Scissors (Sheet ID 52) ───
  {
    slug: "game-rock-paper-scissors",
    name: "Oẳn Tù Tì Bluetooth 2 Người (Rock Paper Scissors Duel)",
    model: "download",
    kind: "Android APK",
    category: "games",
    format: "Android APK",
    tagline: "Game oẳn tù tì đối kháng kịch tính qua Bluetooth hoặc 2 người chơi cùng màn hình, tích hợp AI tâm lý học.",
    description:
      "Tựa game dân gian quen thuộc được nâng tầm với chế độ thi đấu đối kháng công bằng: chế độ 2 người chơi qua sóng Bluetooth hoặc chơi chung trên 1 thiết bị với cơ chế khóa nước đi bí mật (Blind Pick) để tránh nhìn lén. Tích hợp AI máy tính phân tích chu kỳ nước đi của đối thủ, hiệu ứng âm thanh sống động và bảng ghi nhận chuỗi thắng kịch tính.",
    features: [
      "Đối kháng 2 người qua Bluetooth hoặc 2 người chơi luân phiên cùng 1 máy",
      "Chế độ đấu với AI Máy tính có khả năng phân tích tâm lý nước đi",
      "Hiệu ứng âm thanh chân thực được tạo bằng công nghệ Web Audio Offline",
      "Bảng ghi nhận điểm số và chuỗi trận thắng liên tiếp (Streak)",
      "Dung lượng siêu nhẹ (<25KB), cài đặt ngay và chơi mượt mà mọi dòng máy Android",
      "Mua 1 lần dùng trọn đời, không quảng cáo, không tốn dung lượng 4G",
    ],
    price: 9000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/Game_52_Oan_Tu_Ti_Bluetooth.html",
    downloadUrl: "/downloads/OanTuTi_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/OanTuTi_Bluetooth_v1.0.zip",
    devicePrefix: "OT",
    status: "available",
    mockupIdea: "Biểu tượng Búa - Kéo - Bao đối đầu phát sáng với bảng điểm số kịch tính.",
  },

  // ─── 14. Bluetooth Quiz Duel (Sheet ID 60) ───
  {
    slug: "game-quiz-duel",
    name: "Đấu Trí Đố Vui Bluetooth (Quiz Duel 2 Players)",
    model: "download",
    kind: "Android APK",
    category: "games",
    format: "Android APK",
    tagline: "Đấu trí đố vui 2 người đối kháng trực tiếp: đồng hồ đếm ngược 10 giây kịch tính, kho câu hỏi offline đa dạng.",
    description:
      "Game show đấu trí hỏi đáp đối kháng hấp dẫn dành cho bạn bè và người thân: tích hợp sẵn kho câu hỏi trắc nghiệm phong phú thuộc các chủ đề Khoa học, Địa lý - Lịch sử Việt Nam, Công nghệ và Đố mẹo dân gian. Mỗi câu hỏi có đồng hồ đếm ngược 10 giây nghẹt thở; người trả lời nhanh và chính xác hơn sẽ giành được điểm số thưởng tối đa.",
    features: [
      "Chế độ Solo thi đấu với AI thông thái hoặc đối đầu bạn bè qua Bluetooth",
      "Đồng hồ đếm ngược 10 giây/câu tạo áp lực thi đấu gay cấn",
      "Kho câu hỏi trắc nghiệm 4 đáp án chọn lọc chất lượng cao hoạt động offline 100%",
      "Hiệu ứng chuông âm thanh đúng/sai sinh động không cần kết nối mạng",
      "Hệ thống tính điểm thông minh cộng thưởng theo tốc độ phản xạ của người chơi",
      "Trọn đời không quảng cáo, không cần đăng nhập tài khoản phức tạp",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/Game_60_Do_Vui_Bluetooth.html",
    downloadUrl: "/downloads/DoVui_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/DoVui_Bluetooth_v1.0.zip",
    devicePrefix: "QD",
    status: "available",
    mockupIdea: "Màn hình đấu trí trắc nghiệm với đồng hồ đếm ngược phát sáng và bảng điểm đối đầu.",
  },

  // ─── 15. Bluetooth Party Pack (Sheet ID 70) ───
  {
    slug: "game-bluetooth-party-pack",
    name: "Party Game Bluetooth 2 Người (Party Pack 3-in-1)",
    model: "download",
    kind: "Android APK",
    category: "games",
    format: "Android APK",
    tagline: "Bộ 3 trò chơi tiệc tùng đối kháng siêu vui: Phản Xạ Bấm Nhanh, Đấu Xúc Xắc 50 Điểm & Đoán Số Bí Mật.",
    description:
      "Gói giải trí đối kháng tiệc tùng all-in-one không thể thiếu trong các buổi tụ họp bạn bè, cắm trại, đi tàu xe: bao gồm 3 tựa game tương tác cực nhanh: (1) Phản Xạ Chạm Nhanh thử thách tốc độ phản ứng mili-giây, (2) Đấu Xúc Xắc May Mắn tranh đua chạm mốc 50 điểm, và (3) Đoán Số Bí Mật thử tài suy luận logic. Tất cả đều chơi mượt mà không cần mạng Internet.",
    features: [
      "Gói tổng hợp 3 mini game đối kháng 2 người kinh điển trong 1 ứng dụng duy nhất",
      "Chơi 2 người chia đôi màn hình hoặc kết nối Bluetooth không cần Wi-Fi/4G",
      "Mini game Phản xạ tốc độ cao tính thời gian phản ứng chính xác từng mili-giây",
      "Mini game Đấu xúc xắc kịch tính tranh tài may mắn và chiến thuật",
      "Mini game Đoán số bí mật thử tài logic phá án",
      "Sở hữu trọn bộ vĩnh viễn, không quảng cáo, không chi phí phát sinh",
    ],
    price: 59000,
    delivery: "File cài đặt APK Android + Hướng dẫn cài đặt & sử dụng",
    demoUrl: "/products/Game_70_Party_Pack_Bluetooth.html",
    downloadUrl: "/downloads/PartyPack_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/PartyPack_Bluetooth_v1.0.zip",
    devicePrefix: "PP",
    status: "available",
    mockupIdea: "Các biểu tượng xúc xắc, tia chớp phản xạ và câu đố số học phát sáng đa màu sắc.",
  },
];

// ───────────── COMBO / BUNDLE TIẾT KIỆM 35% - 40% (100% APK ĐÃ ĐÓNG GÓI) ─────────────
export const BUNDLES: Bundle[] = [
  {
    id: "bundle-master-apk-15in1",
    name: "Combo Master 15-in-1 Trọn Bộ Kho APK Zeebee",
    tagline: "Sở hữu toàn bộ 15 ứng dụng Android APK & Game Bluetooth: Bê Tông, In 3D, Điện, Định Giá, Hóa Đơn, Sổ Kho, Sổ Đo, Sơn Gạch, Đổi Đơn Vị, Freelancer Rate, Cờ Caro, Tàu Chiến, Oẳn Tù Tì, Đố Vui & Party Pack.",
    discountPercent: 40,
    originalPrice: 598000,
    bundlePrice: 359000,
    products: [
      "concrete-volume-estimator",
      "3d-print-cost-calculator",
      "electrical-calculator",
      "pricing-profit-margin-pro",
      "quotation-invoice-maker",
      "mini-inventory-offline",
      "tailor-measurement-book",
      "freelancer-rate-calculator",
      "paint-tile-calculator",
      "unit-converter-pro",
      "game-tic-tac-toe-pro",
      "game-battleship-duel",
      "game-rock-paper-scissors",
      "game-quiz-duel",
      "game-bluetooth-party-pack"
    ],
    badge: "Tiết kiệm 40%",
  },
  {
    id: "bundle-pro-tools-kỹ-thuật",
    name: "Combo Kỹ Thuật & Xây Dựng 5-in-1 APK",
    tagline: "Trọn bộ 5 công cụ kỹ thuật thực địa: Bê Tông Pro + In 3D Cost + Kỹ Thuật Điện + Sơn Gạch Pro + Đổi Đơn Vị Pro.",
    discountPercent: 35,
    originalPrice: 195000,
    bundlePrice: 129000,
    products: [
      "concrete-volume-estimator",
      "3d-print-cost-calculator",
      "electrical-calculator",
      "paint-tile-calculator",
      "unit-converter-pro"
    ],
    badge: "Tiết kiệm 35%",
  },
  {
    id: "bundle-quan-ly-kinh-doanh",
    name: "Combo Quản Lý Bán Hàng & Dịch Vụ 5-in-1 APK",
    tagline: "Trọn bộ 5 ứng dụng kinh doanh bỏ túi: Định Giá Lợi Nhuận + Hóa Đơn Mini + Sổ Kho Mini + Sổ Đo Tiệm May + Định Giá Freelancer Rate.",
    discountPercent: 35,
    originalPrice: 305000,
    bundlePrice: 199000,
    products: [
      "pricing-profit-margin-pro",
      "quotation-invoice-maker",
      "mini-inventory-offline",
      "tailor-measurement-book",
      "freelancer-rate-calculator"
    ],
    badge: "Tiết kiệm 35%",
  },
  {
    id: "bundle-game-bluetooth-doi-khang",
    name: "Combo 5 Game Đối Kháng Bluetooth Không Cần Mạng",
    tagline: "Trọn bộ 5 tựa game giải trí đối kháng cùng bạn bè: Cờ Ca Rô + Đấu Tàu Chiến + Oẳn Tù Tì + Đố Vui + Party Pack.",
    discountPercent: 30,
    originalPrice: 175000,
    bundlePrice: 119000,
    products: [
      "game-tic-tac-toe-pro",
      "game-battleship-duel",
      "game-rock-paper-scissors",
      "game-quiz-duel",
      "game-bluetooth-party-pack"
    ],
    badge: "Tiết kiệm 30%",
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
