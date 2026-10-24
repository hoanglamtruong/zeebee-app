// Danh mục sản phẩm của app.zeebee.vn — sửa giá/nội dung tại đây.
//
// PHIÊN BẢN MỚI 2026: TÁI ĐỊNH VỊ 100% CỬA HÀNG SẢN PHẨM SỐ OFFLINE-FIRST:
//  - 100% Sản phẩm ĐÓNG GÓI DẠNG ANDROID MINI APP APK & GAME BLUETOOTH (Zstore):
//    Trả 1 lần, sở hữu vĩnh viễn, không phí thuê bao hàng tháng, bảo mật cục bộ.
//  - Toàn bộ sản phẩm SaaS thuê bao cũ và sản phẩm không đóng gói APK (HTML lẻ, Excel)
//    đã được loại bỏ khỏi cửa hàng.
//  - Các sản phẩm APK hỗ trợ kích hoạt key bản quyền vĩnh viễn hoặc dùng thử 7 ngày offline-first.

export type ProductStatus = "available" | "coming_soon";
export type ProductModel = "download";
export type ProductCategory = "pro-tools" | "business" | "utility" | "games";

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
  { id: "pro-tools", label: "Công cụ Nghề nghiệp & Xây dựng" },
  { id: "business", label: "Quản lý Bán hàng & Doanh nghiệp" },
  { id: "utility", label: "Tiện ích & Quản lý" },
  { id: "games", label: "Game Offline & Bluetooth" },
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
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: "/products/App_01_BeTong_Pro_Offline.html",
    downloadUrl: "/downloads/BeTong_Pro_v1.0.zip",
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
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: "/products/App_04_DinhGia_LoiNhuan_Pro.html",
    downloadUrl: "/downloads/DinhGia_Cost_Pro_v1.0.zip",
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
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: "/products/App_07_HoaDon_Mini_Offline.html",
    downloadUrl: "/downloads/HoaDon_Mini_v1.0.zip",
    devicePrefix: "HD",
    status: "available",
    mockupIdea: "Mẫu phiếu báo giá PDF sắc nét in logo doanh nghiệp xuất ra từ điện thoại.",
  },

  // ─── 04. Room Paint & Tile Calculator ───
  {
    slug: "room-paint-tile-calculator",
    devicePrefix: "SG",
    name: "Tính Sơn & Gạch Ốp Lát (Room Paint & Tile Calculator)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Đo kích thước phòng để tính chính xác số thùng sơn tường và số hộp gạch lát sàn kèm tỷ lệ hao hụt.",
    description:
      "Ứng dụng tính toán khối lượng vật tư hoàn thiện nội ngoại thất: chỉ cần nhập chiều dài, chiều rộng, chiều cao phòng và số lượng cửa sổ/cửa đi, ứng dụng sẽ tự động khấu trừ diện tích ô mở để tính ra tổng số m² tường cần lăn sơn, số thùng sơn lót và sơn phủ cần mua theo số lớp. Đồng thời tính diện tích mặt sàn, số lượng viên gạch và số thùng gạch lát theo từng kích thước tiêu chuẩn.",
    features: [
      "Tính diện tích tường cần sơn, tự động trừ diện tích cửa chính và cửa sổ",
      "Bóc tách định mức sơn: tính số lon/thùng sơn lót và sơn màu phủ theo 1 hoặc 2 lớp",
      "Tính diện tích lát sàn và ốp chân tường theo quy cách phòng thực tế",
      "Hỗ trợ các quy cách gạch lát phổ biến (30x30, 40x40, 60x60, 80x80, 60x120)",
      "Tùy chỉnh tỷ lệ hao hụt do cắt gạch (3% - 10%) và tính lượng keo dán gạch/xi măng chà ron",
      "Dự toán tổng chi phí vật tư tức thì giúp chủ nhà và thợ thầu kiểm soát ngân sách",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Căn phòng 3D với các mảng tường màu sơn và sàn gạch cùng số lượng vật tư cần mua.",
  },

  // ─── 05. Freelance Project & Timesheet Tracker ───
  {
    slug: "freelance-project-tracker",
    devicePrefix: "FL",
    name: "Quản Lý Dự Án Freelancer (Freelance Project & Timesheet)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Bấm giờ làm việc theo dự án, quản lý deadline, checklist công việc và tự động tính tổng tiền thù lao cho Freelancer.",
    description:
      "Trợ lý quản lý công việc và dòng tiền bỏ túi dành cho các Freelancer, lập trình viên, nhà thiết kế và cộng tác viên tự do: bấm giờ làm việc theo từng tác vụ, theo dõi tiến độ checklist, thiết lập thù lao tính theo giờ làm việc (Hourly Rate) hoặc theo gói dự án (Fixed Price), quản lý tiến độ thanh toán tạm ứng và xuất báo cáo Timesheet PDF chuyên nghiệp gửi cho đối tác.",
    features: [
      "Đồng hồ bấm giờ (Timer) đếm thời gian làm việc chính xác cho từng dự án",
      "Hỗ trợ chế độ tính thù lao theo giờ làm việc hoặc theo hợp đồng khoán trọn gói",
      "Quản lý danh sách đầu việc (Checklist) và cảnh báo hạn chót (Deadline) trực quan",
      "Ghi nhận các đợt tạm ứng, chi phí phát sinh và số tiền khách hàng còn nợ",
      "Xuất báo cáo bảng kê giờ làm (Timesheet Summary) định dạng PDF đính kèm hóa đơn",
      "Toàn bộ dữ liệu nằm cục bộ trên điện thoại, tuyệt đối bảo mật danh sách khách hàng",
    ],
    price: 59000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Đồng hồ bấm giờ dự án đang chạy kèm danh sách checklist công việc hoàn thành.",
  },

  // ─── 06. Mini Inventory Offline Pro ───
  {
    slug: "mini-inventory-offline",
    devicePrefix: "MK",
    name: "Sổ Kho Mini Offline — Quét Mã (Mini Inventory Pro)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Quản lý nhập - xuất - tồn kho mini theo mã SKU ngay trên điện thoại, cảnh báo hàng sắp hết, sao lưu file Excel.",
    description:
      "Ứng dụng quản trị kho hàng mini gọn nhẹ, hoạt động hoàn toàn offline: sử dụng camera điện thoại làm máy quét mã vạch (Barcode / QR), theo dõi biến động nhập kho và xuất kho theo từng mã sản phẩm SKU, thiết lập ngưỡng tồn kho an toàn để nhận cảnh báo màu vàng/đỏ khi sắp cạn hàng, đồng thời hỗ trợ trích xuất toàn bộ dữ liệu ra bảng tính Excel để đối soát.",
    features: [
      "Quét mã vạch Barcode/QR bằng camera điện thoại để tìm kiếm và nhập xuất siêu nhanh",
      "Quản lý danh mục hàng hóa theo SKU, tên sản phẩm, giá vốn và giá bán niêm yết",
      "Theo dõi lịch sử giao dịch nhập kho, xuất bán và điều chỉnh tồn kho chi tiết",
      "Cảnh báo trực quan khi số lượng sản phẩm chạm ngưỡng tồn tối thiểu",
      "Sao lưu và phục hồi dữ liệu dễ dàng qua tệp Excel (.xlsx) không lo mất dữ liệu",
      "100% không cần Internet, không cần trả phí duy trì máy chủ hàng tháng",
    ],
    price: 99000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Giao diện quét mã vạch và danh sách tồn kho hiển thị trực quan các cảnh báo màu vàng/đỏ.",
  },

  // ─── 07. 3D Print Cost Calculator ───
  {
    slug: "3d-print-cost-calculator",
    devicePrefix: "3D",
    name: "Tính Giá In 3D (3D Print Cost Calculator)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Tính giá thành in 3D từ số gram nhựa, thời gian chạy máy, tiền điện và khấu hao để xuất báo giá cho khách hàng.",
    description:
      "Công cụ định giá in 3D chuẩn xác cho xưởng dịch vụ in và người chơi in 3D: chỉ cần nhập trọng lượng file in (gram) và thời gian in (giờ) từ phần mềm Slicer (Cura, Bambu Studio, PrusaSlicer), ứng dụng sẽ tự động tính toán tổng chi phí sợi nhựa (PLA, PETG, ABS, TPU, Resin), chi phí điện năng máy in, khấu hao hao mòn máy móc, nhân công hậu kỳ và tỷ lệ rủi ro in lỗi để đưa ra giá bán có lợi nhuận tối ưu.",
    features: [
      "Tính toán chi phí vật liệu chuẩn xác theo trọng lượng gram và giá cuộn nhựa/chai resin",
      "Tính tiền điện năng tiêu thụ dựa trên công suất watt máy in và thời gian in thực tế",
      "Cộng gộp chi phí khấu hao hao mòn máy in (bàn nhiệt, đầu phun, cụm đùn) theo giờ",
      "Bổ sung chi phí nhân công xử lý hậu kỳ (gọt support, chà nhám, sơn)",
      "Thiết lập tỷ lệ dự phòng in hỏng và biên lợi nhuận ròng mong muốn",
      "Lưu hồ sơ thông số nhiều dòng máy in (Ender, Bambu, Anycubic) để tính giá tức thì",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Cuộn nhựa in 3D filament đặt cạnh mô hình in kèm bảng chi phí chi tiết.",
  },

  // ─── 08. Electrical Engineering Calculator ───
  {
    slug: "electrical-calculator",
    devicePrefix: "DT",
    name: "Sổ Tay Tính Điện Kỹ Thuật (Electrical Engineering Calculator)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Tính toán định luật Ohm, công suất điện DC/AC, chọn tiết diện dây dẫn và lưu lại lịch sử phép tính offline.",
    description:
      "Sổ tay kỹ thuật điện bỏ túi dành cho kỹ sư điện, thợ cơ điện công trình M&E và thợ điện dân dụng: tích hợp các công thức tính toán dòng điện, điện áp, điện trở theo định luật Ohm, tính công suất điện xoay chiều 1 pha và 3 pha, tính toán tổn thất và sụt áp trên đường truyền tải, đồng thời hỗ trợ bảng tra cứu chọn tiết diện dây dẫn theo dòng tải định mức tiêu chuẩn CADIVI.",
    features: [
      "Tính toán nhanh định luật Ohm và công thức biến đổi giữa U, I, R, P",
      "Tính toán công suất điện xoay chiều 1 pha và 3 pha (P = √3 x U x I x cosφ)",
      "Tính toán độ sụt áp (Voltage Drop) trên chiều dài dây dẫn và khoảng cách tải",
      "Tra cứu lựa chọn tiết diện dây dẫn đồng và nhôm theo tiêu chuẩn lắp đặt công trình",
      "Quy đổi qua lại giữa các đơn vị điện năng: kW, kVA, HP (mã lực), Ampe",
      "Lưu trữ lịch sử các phép tính để xem lại trực tiếp trên hiện trường không cần mạng",
    ],
    price: 39000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Sơ đồ mạch điện tử với các đồng hồ đo Vôn, Ampe, Watt hiển thị trực quan.",
  },

  // ─── 09. Tailor Measurement Book ───
  {
    slug: "tailor-measurement-book",
    devicePrefix: "MM",
    name: "Sổ Đo May Mặc — Nhà May (Tailor Measurement Book)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Sổ lưu số đo khách hàng điện tử cho tiệm may, lưu ghi chú kiểu áo, ảnh mẫu vải và tìm kiếm theo tên/SĐT tức thì.",
    description:
      "Giải pháp số hóa thay thế cuốn sổ tay ghi số đo bằng giấy truyền thống cho các nhà may, tiệm thời trang thiết kế và thợ may đo: cung cấp các biểu mẫu số đo chuyên dụng cho Áo dài truyền thống, Áo vest nam/nữ, Sơ mi, Quần âu, Váy đầm dạ hội. Cho phép chụp ảnh mẫu vải đính kèm, ghi chú đặc điểm dáng người, hẹn ngày giao hàng và tra cứu lại số đo khách cũ trong 1 giây.",
    features: [
      "Biểu mẫu số đo chuẩn cho từng loại trang phục: Áo dài, Vest, Sơ mi, Quần tây, Đầm váy",
      "Chụp ảnh mẫu vải thực tế, phụ liệu và kiểu dáng thiết kế đính kèm vào hồ sơ khách",
      "Ghi chú chi tiết đặc điểm cơ thể (vai ngang, lưng gù, hạ ngực...) để cắt may chuẩn",
      "Quản lý tiến độ đơn hàng và nhắc lịch hẹn khách đến thử đồ (fitting)",
      "Tìm kiếm hồ sơ khách hàng ngay lập tức theo tên hoặc số điện thoại",
      "Dữ liệu được lưu trữ an toàn ngay trên điện thoại của chủ tiệm may",
    ],
    price: 59000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Cuộn thước dây may mặc đặt cạnh giao diện sổ ghi số đo khách hàng trên điện thoại.",
  },

  // ─── 10. Rebar & Steel Weight Estimator ───
  {
    slug: "thep-xay-dung",
    devicePrefix: "TX",
    name: "Tính Thép Xây Dựng Pro (Rebar & Steel Weight Estimator)",
    model: "download",
    kind: "Android APK",
    category: "pro-tools",
    format: "Android APK",
    tagline: "Tra cứu trọng lượng thép tròn, thép hình (I, U, V, H, hộp), tính khối lượng dự toán và số cây thép cần mua.",
    description:
      "Sổ tay tra cứu và dự toán khối lượng sắt thép xây dựng bỏ túi cho kỹ sư, cai thầu và đại lý vật liệu: tra cứu nhanh trọng lượng barem tiêu chuẩn của thép thanh vằn (D6 đến D36), thép cuộn, thép hộp vuông/chữ nhật, thép hình chữ I, U, V, H. Tự động tính toán tổng khối lượng (kg/tấn), số lượng cây thép 11.7m cần đặt và tổng kinh phí vật tư.",
    features: [
      "Bảng tra barem trọng lượng thép thanh tròn tiêu chuẩn TCVN từ D6 đến D36",
      "Tra cứu thông số thép hộp vuông, hộp chữ nhật, ống thép tròn mọi quy cách",
      "Bảng tra cứu quy cách thép hình tiêu chuẩn I, U, V, H công nghiệp",
      "Tự động quy đổi qua lại giữa Tổng chiều dài (mét) ↔ Khối lượng (kg/tấn) ↔ Số cây 11.7m",
      "Tính toán tổng giá trị đơn hàng thép theo đơn giá thị trường thời gian thực",
      "Hoạt động 100% offline tại bãi vật liệu và công trình không cần mạng",
    ],
    price: 59000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Bảng tra thép xây dựng hiển thị đường kính D, số cây 11.7m và tổng số tấn cần mua tại công trình.",
  },

  // ─── 11. Rental & Utility Manager Pro ───
  {
    slug: "quan-ly-phong-tro",
    devicePrefix: "PT",
    name: "Quản Lý Nhà Trọ & Điện Nước Pro (Rental & Utility Manager)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Ghi chỉ số điện nước, tính tiền phòng tự động, xuất phiếu thu Zalo và theo dõi hợp đồng cọc.",
    description:
      "Giải pháp quản lý nhà trọ, chung cư mini, mặt bằng cho thuê độc lập trên điện thoại dành cho chủ trọ: quản lý danh sách phòng (trống / đang thuê), ghi nhanh chỉ số công tơ điện và đồng hồ nước theo tháng, tự động tính tổng tiền theo bậc thang hoặc giá cố định, cộng tiền rác, wifi, dịch vụ và xuất phiếu báo tiền phòng có mã VietQR gửi thẳng qua Zalo cho khách thuê.",
    features: [
      "Quản lý danh sách phòng trọ, trạng thái trống/đang thuê và giá thuê từng phòng",
      "Ghi chỉ số điện nước cũ - mới cực nhanh, hỗ trợ tính giá theo bậc thang hoặc đơn giá cố định",
      "Tự động tính tổng tiền phòng, tiền dịch vụ (rác, wifi, vệ sinh, gửi xe)",
      "Tạo phiếu thông báo tiền phòng chi tiết kèm mã VietQR nhận tiền chính xác từng phòng",
      "Gửi phiếu thanh toán 1 chạm qua Zalo cho khách thuê trong vài giây",
      "Lưu trữ lịch sử thu tiền và theo dõi tình trạng nợ tiền phòng của từng khách",
    ],
    price: 79000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Giao diện quản lý phòng trọ hiển thị bảng tính tiền điện nước và phiếu thu gửi qua Zalo.",
  },

  // ─── 12. Barista Recipe & Cost Pro ───
  {
    slug: "cong-thuc-pha-che",
    devicePrefix: "PC",
    name: "Sổ Tay Pha Chế & Cost Đồ Uống (Barista Recipe & Cost Pro)",
    model: "download",
    kind: "Android APK",
    category: "business",
    format: "Android APK",
    tagline: "Lưu công thức đồ uống chuẩn định lượng (gram/ml) và tự động tính giá vốn (cost) từng ly cho quán cafe, trà sữa.",
    description:
      "Trợ lý công thức và quản trị giá cost món bỏ túi cho chủ quán cafe, tiệm trà sữa, bartender và barista: lưu trữ công thức pha chế chi tiết từng thành phần (cà phê, sữa đặc, siro, topping...) theo định lượng chính xác. Ứng dụng tự động tính chi phí nguyên vật liệu cấu thành từng ly (Cost per cup), tính tỷ lệ % giá vốn trên giá bán để chủ quán ra quyết định định giá menu có lãi.",
    features: [
      "Quản lý danh mục nguyên liệu pha chế kèm đơn giá mua vào (kg, lít, hộp)",
      "Lưu trữ công thức pha chế chi tiết theo định lượng ml, gram cho từng size ly (S, M, L)",
      "Tự động tính chi phí giá vốn (Food Cost) chính xác của từng món đồ uống",
      "Cảnh báo tỷ lệ Cost % vượt ngưỡng an toàn (thường 25% - 35% doanh thu)",
      "Ghi chú quy trình pha chế, thứ tự thao tác và hình ảnh ly mẫu decor",
      "Bảo mật 100% công thức độc quyền của quán trên điện thoại của chủ quán",
    ],
    price: 49000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Công thức ly trà sữa trân châu phân tách từng ml siro, trà và tự động tính cost 8.500đ/ly.",
  },

  // ─── 13. Loan & EMI Repayment Pro ───
  {
    slug: "lai-suat-tra-gop",
    devicePrefix: "LS",
    name: "Máy Tính Lãi Suất & Trả Góp Vay (Loan & EMI Repayment Pro)",
    model: "download",
    kind: "Android APK",
    category: "utility",
    format: "Android APK",
    tagline: "Tính lịch trả nợ vay ngân hàng, mua xe, mua nhà trả góp theo dư nợ giảm dần hoặc dư nợ gốc cố định.",
    description:
      "Công cụ phân tích và lập kế hoạch vay vốn tài chính chuẩn xác cho người mua nhà, mua xe trả góp hoặc nhân viên tín dụng: nhập số tiền vay, thời hạn vay (tháng/năm) và lãi suất, ứng dụng sẽ tự động xuất bảng lịch trả nợ chi tiết từng tháng theo 2 phương thức: Dư nợ giảm dần (gốc đều, lãi giảm dần) hoặc Trả góp đều hàng tháng (Amortization EMI).",
    features: [
      "Tính toán lịch trả nợ chi tiết từng tháng theo phương thức Dư nợ giảm dần",
      "Tính toán phương thức trả góp đều định kỳ (cả gốc và lãi cố định mỗi tháng)",
      "Hỗ trợ tính toán lãi suất ưu đãi giai đoạn đầu và lãi suất thả nổi sau ưu đãi",
      "Mô phỏng trường hợp trả nợ trước hạn (phí phạt trả trước và số tiền lãi tiết kiệm được)",
      "Biểu đồ phân tách tỷ trọng Tiền gốc ↔ Tiền lãi trực quan qua từng năm",
      "Xuất bảng lịch thanh toán ra file PDF để lưu trữ đối chiếu",
    ],
    price: 49000,
    delivery: "File cài đặt APK Android + Hướng dẫn sử dụng",
    demoUrl: null,
    status: "available",
    mockupIdea: "Biểu đồ cơ cấu trả nợ gốc - lãi giảm dần theo thời gian hiển thị trực quan.",
  },

  // ─── 14. Bluetooth Battleship Duel: Classic & Salvo ───
  {
    slug: "game-battleship-duel",
    devicePrefix: "BS",
    name: "Bắn Thuyền Hải Chiến (Bluetooth Battleship Duel)",
    model: "download",
    kind: "Android APK Game",
    category: "games",
    format: "Android APK Game",
    tagline: "Đấu tàu chiến 2 người qua Bluetooth không cần mạng. Gồm chế độ bắn cổ điển và loạt đạn Salvo. Tự kết nối lại khi mất sóng.",
    description:
      "Trò chơi thủy chiến chiến thuật đối kháng 2 người kết nối trực tiếp qua sóng Bluetooth không dây: không cần mạng Wi-Fi, không tốn dung lượng 4G, hoàn hảo cho những chuyến đi tàu xe, quán cà phê hoặc giờ giải lao. Người chơi tự do bố trí hạm đội hải quân bí mật trên bàn cờ radar, tham gia chế độ bắn từng phát cổ điển hoặc chế độ bão đạn Salvo đầy kịch tính.",
    features: [
      "Kết nối 2 điện thoại qua Bluetooth tầm gần mượt mà, độ trễ cực thấp",
      "Chế độ bắn Classic (luân phiên 1 viên) và Salvo (số phát bắn tương ứng số tàu còn lại)",
      "Bản đồ radar hải quân hiển thị tọa độ bắn trúng, bắn trượt và tàu bị đánh chìm",
      "Cơ chế tự động lưu bàn đấu và tự động kết nối lại khi tín hiệu Bluetooth gián đoạn",
      "Hiệu ứng âm thanh đại bác, tiếng còi tàu và đồ họa radar quân sự sống động",
      "Tích hợp chế độ chơi đơn với AI máy tính nhiều cấp độ khi chơi một mình",
    ],
    price: 39000,
    delivery: "File cài đặt APK game Android",
    demoUrl: null,
    status: "available",
    mockupIdea: "2 điện thoại đặt cạnh nhau trong tư thế đối kháng, hiển thị radar bản đồ biển và tàu chiến bắn nhau.",
  },

  // ─── 15. Bluetooth Tic-Tac-Toe Pro ───
  {
    slug: "game-tic-tac-toe-pro",
    name: "Cờ Caro Bluetooth — Đấu 2 Máy (Bluetooth Tic-Tac-Toe Pro)",
    model: "download",
    kind: "Android APK Game",
    category: "games",
    format: "Android APK Game",
    tagline: "Cờ caro đối kháng 2 máy qua kết nối Bluetooth siêu mượt. Có chế độ đấu với AI khi chơi 1 mình.",
    description:
      "Tựa game cờ caro đối kháng hiện đại kết nối 2 thiết bị Android qua sóng Bluetooth với tốc độ truyền tức thì không độ trễ: hỗ trợ bàn cờ 3x3 giải trí nhanh và bàn cờ 5x5 chiến thuật sâu sắc. Giao diện phong cách Neon phát sáng rực rỡ, tích hợp bộ đếm thời gian cho mỗi lượt đi và bảng ghi nhận thành tích đối đầu giữa hai kỳ thủ.",
    features: [
      "Kết nối Bluetooth 2 máy siêu tốc, tìm kiếm và ghép đôi trong 3 giây",
      "Hỗ trợ chế độ bàn cờ truyền thống 3x3 và bàn cờ chiến thuật mở rộng 5x5",
      "Hiệu ứng ánh sáng Neon phát sáng hiện đại cùng âm thanh chạm rung phản hồi xúc giác",
      "Đồng hồ đếm ngược thời gian cho mỗi lượt đi tránh người chơi suy nghĩ quá lâu",
      "Bảng ghi nhận tỷ số Thắng - Thua - Hòa chi tiết qua các ván đấu liên tiếp",
      "Chế độ đấu với trí tuệ nhân tạo (AI) thông minh từ Dễ đến Cao thủ",
    ],
    price: 19000,
    delivery: "File cài đặt APK game Android",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "CC",
    status: "available",
    mockupIdea: "Bàn cờ X-O neon phát sáng trên 2 màn hình điện thoại kết nối không dây.",
  },

  // ─── 16. Bluetooth Quiz & English Vocab Duel ───
  {
    slug: "game-quiz-english-duel",
    devicePrefix: "TA",
    name: "Đấu Trí Từ Vựng Tiếng Anh (Bluetooth Quiz & Vocab Duel)",
    model: "download",
    kind: "Android APK Game",
    category: "games",
    format: "Android APK Game",
    tagline: "Thi đấu trả lời đố vui kiến thức và từ vựng tiếng Anh đối kháng giữa 2 máy qua Bluetooth không tốn mạng.",
    description:
      "Đấu trường trắc nghiệm đối kháng 1 vs 1 kịch tính giữa hai người bạn kết nối qua sóng Bluetooth: thử thách tốc độ và phản xạ với các gói câu hỏi từ vựng tiếng Anh giao tiếp, TOEIC, IELTS cùng ngân hàng câu đố kiến thức tổng hợp đời sống. Ai bấm chuông giành quyền trả lời nhanh và chính xác hơn sẽ tích lũy điểm số để giành cúp chiến thắng.",
    features: [
      "Đấu trí 1 vs 1 qua kết nối Bluetooth độc lập, hoàn toàn không cần Internet",
      "Ngân hàng hơn 3.000 từ vựng tiếng Anh phân theo trình độ và chủ đề phong phú",
      "Gói câu hỏi đố vui kiến thức tổng hợp, khoa học, lịch sử, văn hóa thú vị",
      "Cơ chế đếm ngược thời gian gay cấn, cộng điểm theo tốc độ phản xạ bấm chuông",
      "Xem lại toàn bộ giải nghĩa từ vựng và đáp án chi tiết sau mỗi hiệp đấu",
      "Cho phép người dùng tự biên soạn và bổ sung bộ câu hỏi tùy biến của riêng mình",
    ],
    price: 39000,
    delivery: "File cài đặt APK game Android",
    demoUrl: null,
    status: "available",
    mockupIdea: "2 bạn trẻ cầm 2 điện thoại đang tranh nhau bấm nút chọn đáp án trắc nghiệm.",
  },

  // ─── 17. Xếp Hình Cá Gỗ (Zeebee Woodfish Puzzle) ───
  {
    slug: "game-xep-hinh-ca-go",
    devicePrefix: "CG",
    name: "Xếp Hình Cá Gỗ (Zeebee Woodfish Puzzle)",
    model: "download",
    kind: "Android APK Game",
    category: "games",
    format: "Android APK Game",
    tagline: "Game giải đố xếp các khối cá gỗ nghệ thuật Zeebee mang lại cảm giác thư giãn, thẩm mỹ thủ công mộc mạc.",
    description:
      "Tựa game giải đố xếp hình nghệ thuật lấy cảm hứng từ các tác phẩm điêu khắc cá gỗ thủ công đặc trưng của Zeebee Decor: người chơi nhẹ nhàng xoay và ghép các mảnh khối cá gỗ mộc mạc với hoa văn vân gỗ tự nhiên khít vào nhau để hoàn thành bức tranh tổng thể. Âm thanh lách cách của gỗ gõ và nhạc nền mộc giúp xoa dịu căng thẳng và nuôi dưỡng cảm quan thẩm mỹ.",
    features: [
      "Lối chơi giải đố mộc mạc, nhẹ nhàng, giúp giải tỏa căng thẳng và rèn luyện tư duy không gian",
      "Bộ sưu tập hơn 50 màn chơi với các bức tranh cá gỗ thủ công độc bản nghệ thuật",
      "Hiệu ứng âm thanh chạm gỗ mộc sống động và giai điệu thiền định nhẹ nhàng",
      "Chạy 100% offline trên điện thoại Android (file APK), không cần mạng",
      "Không quảng cáo gây phân tâm, không mua bán trong ứng dụng, sở hữu trọn đời",
    ],
    price: 29000,
    delivery: "File cài đặt APK game Android",
    demoUrl: null,
    status: "available",
    mockupIdea: "Những chú cá gỗ thủ công nhiều màu sắc ghép khít vào nhau thành bức tranh nghệ thuật.",
  },
];

// ───────────── COMBO / BUNDLE TIẾT KIỆM 35% (100% APK) ─────────────
export const BUNDLES: Bundle[] = [
  {
    id: "bundle-shop-khoi-nghiep",
    name: "Combo Bán Hàng & Quản Lý Mini APK",
    tagline: "Trọn bộ 4 Mini App APK thiết yếu: Định Giá Lợi Nhuận + Hóa Đơn Mini + Sổ Kho Mini + Quản Lý Nhà Trọ.",
    discountPercent: 36,
    originalPrice: 296000,
    bundlePrice: 189000,
    products: ["pricing-profit-margin-pro", "quotation-invoice-maker", "mini-inventory-offline", "quan-ly-phong-tro"],
    badge: "Tiết kiệm 36%",
  },
  {
    id: "bundle-ky-su-xay-dung",
    name: "Combo Kỹ Sư & Thợ Thầu Xây Dựng APK",
    tagline: "Bộ 4 công cụ tính toán khối lượng công trường: Bê Tông Pro + Thép Xây Dựng + Sơn Gạch + Sổ Tay Kỹ Thuật Điện.",
    discountPercent: 34,
    originalPrice: 196000,
    bundlePrice: 129000,
    products: ["concrete-volume-estimator", "thep-xay-dung", "room-paint-tile-calculator", "electrical-calculator"],
    badge: "Tiết kiệm 34%",
  },
  {
    id: "bundle-giai-tri-bluetooth",
    name: "Combo Game Bluetooth Đối Kháng Không Cần Mạng",
    tagline: "Bộ 4 tựa game đối kháng Bluetooth & giải đố không cần Wi-Fi/4G: Đấu tàu chiến + Cờ caro + Đấu trí Quiz + Xếp hình Cá Gỗ.",
    discountPercent: 37,
    originalPrice: 126000,
    bundlePrice: 79000,
    products: ["game-battleship-duel", "game-tic-tac-toe-pro", "game-quiz-english-duel", "game-xep-hinh-ca-go"],
    badge: "Tiết kiệm 37%",
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
