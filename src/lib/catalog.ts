// Danh mục trò chơi của app.zeebee.vn
//
// ĐỊNH HƯỚNG MỚI: CHUYÊN BIỆT KHO GAME OFFLINE & BLUETOOTH ĐỐI KHÁNG ANDROID
//  - 100% Trò chơi đóng gói file .APK siêu nhẹ (<25KB), chơi độc lập không cần internet
//  - Chế độ chơi: Đối kháng 2 người qua Bluetooth, Hợp tác Co-op và Trí tuệ cổ điển
//  - Doanh thu từ vị trí tài trợ & nhiệm vụ đối tác mở khóa màn chơi / hồi sinh lượt chơi

export type ProductStatus = "available" | "coming_soon";
export type ProductModel = "download";
export type ProductCategory = "bluetooth-pvp" | "coop-arcade" | "puzzle-board";

export interface ProductVisualTheme {
  spineColor: string;
  textColor: string;
  accentColor: string;
  pattern: "geometric" | "stripes" | "circles" | "diamonds" | "vintage" | "grid";
  symbol: string;
  serialTag: string;
  coverGradient?: string;
  glowColor?: string;
}

export interface AffiliateMission {
  id: string;
  partner: string;
  title: string;
  description: string;
  badge: string;
  category: string;
  url: string;
  unlockTypes: string[];
}

export interface ProUnlockMission {
  taskName: string;
  targetPartner: string;
  affiliateUrl: string;
  reward: string;
}

export interface Product {
  slug: string;
  name: string;
  model: ProductModel;
  kind: string;
  category: ProductCategory;
  format: string;
  gameMode: string;
  playerCount: string;
  tagline: string;
  description: string;
  features: string[];
  price: number;
  delivery: string;
  demoUrl: string | null;
  downloadUrl?: string;
  zipUrl?: string;
  devicePrefix?: string;
  status: ProductStatus;
  mockupIdea?: string;
  theme?: ProductVisualTheme;
  proUnlockMission?: ProUnlockMission;
}

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  products: string[];
  badge: string;
}

export const CATEGORY_TABS = [
  { id: "all", label: "Tất Cả Game" },
  { id: "bluetooth-pvp", label: "Đối Kháng Bluetooth" },
  { id: "coop-arcade", label: "Hợp Tác & Arcade" },
  { id: "puzzle-board", label: "Trí Tuệ & Boardgame" },
] as const;

export const AFFILIATE_MISSIONS: AffiliateMission[] = [
  {
    id: "mission-gaming-gear",
    partner: "Gaming Store Shopee",
    title: "Khám Phá Tay Cầm & Phụ Kiện Chơi Game Bluetooth",
    description: "Xem bộ sưu tập tay cầm và phụ kiện để nhận thêm 5 mạng hồi sinh và qua màn game ngay tức thì.",
    badge: "NHIỆM VỤ GAME",
    category: "gaming",
    url: "https://shopee.vn",
    unlockTypes: ["all"],
  },
  {
    id: "mission-tech-deal",
    partner: "Tech & Accessories Hub",
    title: "Săn Deal Tai Nghe Không Dây Siêu Tiết Kiệm Pin",
    description: "Ghé thăm gian hàng đối tác trong 5 giây để mở khóa bàn cờ Đại Kiện Tướng và radar quét tàu.",
    badge: "VẬT PHẨM VIP",
    category: "tech",
    url: "https://shopee.vn",
    unlockTypes: ["all"],
  },
  {
    id: "mission-custom-game",
    partner: "Zeebee Game Studio",
    title: "Đặt Hàng Lập Trình Game Theo Ý Tưởng Riêng",
    description: "Khám phá dịch vụ may đo game offline và mini app theo yêu cầu doanh nghiệp, sự kiện.",
    badge: "STUDIO GAME",
    category: "service",
    url: "/build",
    unlockTypes: ["all"],
  },
];

export const PRODUCTS: Product[] = [
  // ─── TẦNG 1: GAME ĐỐI KHÁNG BLUETOOTH 2 NGƯỜI (PVP) ───
  {
    slug: "game-tic-tac-toe-pro",
    name: "Cờ Ca Rô Bluetooth (Gomoku Pro)",
    model: "download",
    kind: "Android Game APK",
    category: "bluetooth-pvp",
    format: "Android Game APK",
    gameMode: "Bluetooth 2 Người",
    playerCount: "2 Người (Bluetooth) / Đấu Máy",
    tagline: "Đấu trí cờ caro 5 quân kinh điển kết nối trực tiếp giữa hai điện thoại qua Bluetooth không cần mạng internet.",
    description:
      "Tựa game cờ caro chuẩn luật quốc tế kết nối ngang hàng (P2P) qua Bluetooth. Hai máy tự động tìm và kết nối trong 3 giây. Hỗ trợ bàn cờ 15x15 chuẩn thi đấu, tính thời gian mỗi nước đi, lưu lịch sử ván đấu và âm thanh gõ cờ chân thực.",
    features: [
      "Kết nối Bluetooth Classic 2 điện thoại khoảng cách 10m không cần Wi-Fi",
      "Bàn cờ caro 15x15 chuẩn thi đấu quốc tế, cơ chế tự động cuộn mượt mà",
      "Đồng hồ đếm ngược từng nước đi và tổng thời gian trận đấu",
      "Chế độ đấu máy thông minh khi chơi một mình",
      "Lưu lại ván cờ và thống kê tỷ số thắng - hòa - thua giữa hai người",
      "Cài đặt dung lượng siêu nhẹ <22KB, mở lên chơi ngay lập tức",
    ],
    price: 0,
    delivery: "File cài đặt APK Android + Hướng dẫn kết nối Bluetooth",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "CR",
    status: "available",
    mockupIdea: "Hai chiếc điện thoại đặt cạnh nhau trên bàn gỗ hiển thị trận đấu cờ caro kết nối Bluetooth.",
    proUnlockMission: {
      taskName: "Xem ưu đãi Phụ kiện Tay cầm & Tai nghe Bluetooth",
      targetPartner: "Gaming Store",
      affiliateUrl: "https://shopee.vn",
      reward: "Nhận 5 lượt hoàn tác nước đi & Mở khóa Bàn cờ Gỗ VIP",
    },
  },
  {
    slug: "game-battleship-duel",
    name: "Đấu Tàu Chiến Hải Quân (Battleship Duel)",
    model: "download",
    kind: "Android Game APK",
    category: "bluetooth-pvp",
    format: "Android Game APK",
    gameMode: "Chiến Thuật Ẩn Danh",
    playerCount: "2 Người (Bluetooth) / Đấu AI",
    tagline: "Bày binh bố trận hạm đội hải quân bí mật và bắn phá hạm đội đối phương qua kết nối Bluetooth.",
    description:
      "Trò chơi chiến thuật hải chiến kinh điển: mỗi người bí mật bố trí hạm đội gồm tàu sân bay, thiết giáp hạm, tàu tuần dương và tàu ngầm trên lưới tọa độ 10x10. Từng lượt bắn được truyền qua sóng Bluetooth bảo mật tuyệt đối, chỉ báo trúng hoặc trượt.",
    features: [
      "Bảo mật tuyệt đối vị trí tàu: dữ liệu chỉ truyền tọa độ bắn và kết quả Hit/Miss",
      "Bố trí hạm đội linh hoạt: xoay ngang, dọc và tự động dàn trận ngẫu nhiên",
      "Hiệu ứng âm thanh đại bác, radar quét và tiếng tàu chìm kịch tính",
      "Chế độ thi đấu tính lượt bắn và thời gian phản xạ",
      "Chơi mượt mà không cần mạng ở bất kỳ đâu",
    ],
    price: 0,
    delivery: "File cài đặt APK Android + Hướng dẫn chơi",
    demoUrl: "/products/Game_53_TauChien_Bluetooth.html",
    downloadUrl: "/downloads/TauChien_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/TauChien_Bluetooth_v1.0.zip",
    devicePrefix: "TC",
    status: "available",
    mockupIdea: "Bản đồ radar hải quân màu xanh neon hiển thị lưới tọa độ bắn phá hạm đội giữa 2 máy.",
    proUnlockMission: {
      taskName: "Xem gian hàng thiết bị giải trí không dây",
      targetPartner: "Navy Sponsor",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa 3 lượt Radar do thám quét vị trí tàu địch",
    },
  },
  {
    slug: "game-rock-paper-scissors",
    name: "Oẳn Tù Tì Phản Xạ (RPS Arena)",
    model: "download",
    kind: "Android Game APK",
    category: "bluetooth-pvp",
    format: "Android Game APK",
    gameMode: "Tốc Độ Phản Xạ",
    playerCount: "2 Người (Bluetooth)",
    tagline: "Trận chiến Kéo - Búa - Bao đối kháng thời gian thực, đếm ngược giây và phân định thắng bại tức thì.",
    description:
      "Game oẳn tù tì tốc độ cao giữa hai người qua Bluetooth: hai người cùng ra quyết định đồng thời trong vòng 3 giây đếm ngược. Cơ chế khóa lựa chọn mã hóa ngăn chặn nhìn trộm hoặc đổi quyết định, giải quyết nhanh các kèo cá cược vui vẻ.",
    features: [
      "Đồng bộ thời gian thực siêu chuẩn không độ trễ qua Bluetooth",
      "Khóa quyết định bí mật chống gian lận tuyệt đối",
      "Các chế độ thi đấu: Chạm 3, Chạm 5 hoặc Vòng tròn sinh tồn",
      "Bảng thống kê tỷ lệ ra Kéo/Búa/Bao để đọc vị đối thủ",
    ],
    price: 0,
    delivery: "File cài đặt APK Android + Hướng dẫn",
    demoUrl: "/products/Game_52_Oan_Tu_Ti_Bluetooth.html",
    downloadUrl: "/downloads/OanTuTi_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/OanTuTi_Bluetooth_v1.0.zip",
    devicePrefix: "TT",
    status: "available",
    mockupIdea: "Biểu tượng Kéo Búa Bao phát sáng rực rỡ với đồng hồ đếm ngược 3 giây kịch tính.",
    proUnlockMission: {
      taskName: "Xem ưu đãi phụ kiện Bluetooth tiện ích",
      targetPartner: "Gaming Store",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Chế độ Đấu Boss Khó & Thêm 5 lượt đấu lại",
    },
  },
  {
    slug: "game-quiz-duel",
    name: "Đố Vui Trí Tuệ Đối Kháng (Quiz Duel)",
    model: "download",
    kind: "Android Game APK",
    category: "bluetooth-pvp",
    format: "Android Game APK",
    gameMode: "Đấu Trí Trả Lời Nhanh",
    playerCount: "2 Người (Bluetooth) / Solo",
    tagline: "Kho 1.000+ câu hỏi bách khoa toàn thư thi đấu tính điểm trả lời nhanh giữa hai người bạn.",
    description:
      "Game show đấu trí ngay trong túi quần: hai máy cùng nhận một bộ câu hỏi trắc nghiệm đồng bộ qua Bluetooth. Ai bấm chuông và chọn đáp án chính xác nhanh hơn sẽ giành điểm số. Đa dạng chủ đề: Lịch sử, Khoa học, Thể thao, Điện ảnh và Văn hóa Việt Nam.",
    features: [
      "Kho 1.000+ câu hỏi trắc nghiệm chọn lọc có đáp án giải thích chi tiết",
      "Đồng bộ bộ câu hỏi giữa 2 máy trong tích tắc",
      "Cơ chế bấm chuông giành quyền trả lời thời gian thực",
      "Thang điểm thưởng tốc độ trả lời càng nhanh điểm càng cao",
    ],
    price: 0,
    delivery: "File cài đặt APK Android + Gói câu hỏi",
    demoUrl: "/products/Game_60_Do_Vui_Bluetooth.html",
    downloadUrl: "/downloads/DoVui_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/DoVui_Bluetooth_v1.0.zip",
    devicePrefix: "DV",
    status: "available",
    mockupIdea: "Màn hình đấu trí câu hỏi kiến thức với đồng hồ bấm giờ và thanh điểm hai bên cân não.",
    proUnlockMission: {
      taskName: "Khám phá tủ sách tri thức & phát triển bản thân",
      targetPartner: "Tri Thức Mall",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa trọn bộ 1.000 câu hỏi nâng cao & Quyền trợ giúp 50/50",
    },
  },
  {
    slug: "game-bluetooth-party-pack",
    name: "Party Pack Game Tiệc (Bluetooth Party Pack)",
    model: "download",
    kind: "Android Game APK",
    category: "bluetooth-pvp",
    format: "Android Game APK",
    gameMode: "Nhóm Bạn & Bàn Tiệc",
    playerCount: "2 - 4 Người Kết Nối",
    tagline: "Bộ sưu tập trò chơi nhóm: Thử Thách Vòng Quay, Rút Thẻ May Mắn và Ai Là Gián Điệp kết nối đa máy.",
    description:
      "Gói giải trí không thể thiếu trong các buổi họp mặt, dã ngoại hay tiệc tùng: một máy làm phòng chủ (Host) và các máy xung quanh tham gia qua Bluetooth. Bao gồm các minigame: Vòng quay thử thách, Thẻ bài nói thật, Đếm số loại trừ và Ai là Gián điệp.",
    features: [
      "Kết nối nhóm từ 2 đến 4 máy Android qua Bluetooth mượt mà",
      "Tích hợp 5 minigame bàn tiệc khuấy động không khí",
      "Tự động gán lượt chơi và thông báo kết quả tức thì trên từng màn hình",
      "Tùy biến bộ câu hỏi và hình phạt theo nhóm bạn riêng",
    ],
    price: 0,
    delivery: "File cài đặt APK Android + Gói game tiệc",
    demoUrl: "/products/Game_70_Party_Pack_Bluetooth.html",
    downloadUrl: "/downloads/PartyPack_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/PartyPack_Bluetooth_v1.0.zip",
    devicePrefix: "PP",
    status: "available",
    mockupIdea: "Nhóm bạn trẻ ngồi quanh bàn cafe cầm điện thoại kết nối Bluetooth tham gia vòng quay.",
    proUnlockMission: {
      taskName: "Xem ưu đãi quà tặng & phụ kiện tiệc tùng",
      targetPartner: "Party Store",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Phòng chơi 8 người & 200 thẻ thử thách cao cấp",
    },
  },

  // ─── TẦNG 2: HỢP TÁC CHIẾN THUẬT & ARCADE CO-OP ───
  {
    slug: "game-pong-bluetooth",
    name: "Bóng Bàn Pong Đối Kháng (Pong Retro Duel)",
    model: "download",
    kind: "Android Game APK",
    category: "coop-arcade",
    format: "Android Game APK",
    gameMode: "Arcade Phản Xạ Realtime",
    playerCount: "2 Người (Bluetooth)",
    tagline: "Tái hiện huyền thoại bóng bàn Pong cổ điển: vuốt vợt đón bóng và dứt điểm qua sóng Bluetooth.",
    description:
      "Tựa game arcade retro huyền thoại được hồi sinh với cơ chế kết nối Bluetooth: mỗi người điều khiển thanh vợt trên điện thoại của mình. Quả bóng bay từ màn hình máy này xuyên qua màn hình máy đối phương theo thời gian thực.",
    features: [
      "Vật lý va chạm quả bóng chân thực với góc nảy theo điểm chạm vợt",
      "Độ trễ truyền gói tin thấp, bóng bay mượt mà giữa hai màn hình",
      "Tăng tốc độ bóng theo từng lượt chạm tạo kịch tính dồn dập",
      "Tùy chọn skin vợt Neon phát sáng và quả bóng lửa",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "PG",
    status: "available",
    mockupIdea: "Bàn đấu Pong màu đen với 2 thanh trượt neon màu xanh ngọc và cam phát sáng.",
    proUnlockMission: {
      taskName: "Xem thiết bị tai nghe gaming chống ồn",
      targetPartner: "Shopee Tech",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Vợt Neon Lửa & 5 lượt Hồi sinh bóng",
    },
  },
  {
    slug: "game-coop-escape",
    name: "Giải Mã Mê Cung (Co-op Escape Grid)",
    model: "download",
    kind: "Android Game APK",
    category: "coop-arcade",
    format: "Android Game APK",
    gameMode: "Hợp Tác Vượt Ải",
    playerCount: "2 Người Hợp Lực",
    tagline: "Hai người cùng bước vào mê cung bí ẩn: một người giữ công tắc, một người mở đường thoát hiểm.",
    description:
      "Trò chơi giải đố co-op phối hợp đồng đội: bản đồ mê cung chia thành hai khu vực tương tác chéo. Người chơi A phải dẫm lên công tắc để mở cửa cho người chơi B đi qua lấy chìa khóa, cùng nhau tìm đường tới cửa thoát trước khi hết giờ.",
    features: [
      "Đồng bộ vị trí nhân vật và trạng thái công tắc/cửa theo thời gian thực",
      "Hơn 30 màn chơi mê cung từ dễ đến cực khó",
      "Đòi hỏi sự giao tiếp và phối hợp chiến thuật ăn ý giữa hai người",
      "Lưu lại tiến độ các màn chơi đã vượt qua",
    ],
    price: 0,
    delivery: "File cài đặt APK Android + Màn chơi",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "EG",
    status: "available",
    mockupIdea: "Bản đồ mê cung pixel với hai nhân vật tí hon phối hợp mở các cánh cổng ánh sáng.",
    proUnlockMission: {
      taskName: "Khám phá đồ chơi trí tuệ & boardgame",
      targetPartner: "Puzzle Store",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa 10 Màn chơi Bí Ẩn & Bản đồ Radar hướng dẫn",
    },
  },
  {
    slug: "game-tower-defense-duo",
    name: "Thủ Thành Duo (Mini Tower Defense)",
    model: "download",
    kind: "Android Game APK",
    category: "coop-arcade",
    format: "Android Game APK",
    gameMode: "Chiến Thuật Phối Hợp",
    playerCount: "2 Người Co-op",
    tagline: "Hợp lực xây dựng hệ thống tháp pháo phòng thủ và chặn đứng các đợt quái vật xâm chiếm cứ điểm.",
    description:
      "Hai người cùng bảo vệ một cứ điểm chung trên bản đồ: chia sẻ tài nguyên vàng, phối hợp đặt các loại tháp pháo băng làm chậm, tháp pháo laser dồn sát thương và súng cối diện rộng để chặn đứng 20 đợt quái vật hung hãn.",
    features: [
      "Đồng bộ bản đồ quái vật và các vị trí tháp canh giữa hai máy",
      "Hệ thống 6 loại tháp pháo nâng cấp tối đa 3 cấp độ",
      "Cơ chế chia sẻ tài nguyên hoặc chuyển vàng cho đồng đội khi cần kíp",
      "Độ khó tăng dần theo từng đợt Boss khổng lồ",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_53_TauChien_Bluetooth.html",
    downloadUrl: "/downloads/TauChien_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/TauChien_Bluetooth_v1.0.zip",
    devicePrefix: "TD",
    status: "available",
    mockupIdea: "Bản đồ thủ thành với các tháp pháo laser bắn tia sáng tiêu diệt quái vật bảo vệ thành cổ.",
    proUnlockMission: {
      taskName: "Xem các dòng máy tính bảng & điện thoại chơi game",
      targetPartner: "Gaming Mall",
      affiliateUrl: "https://shopee.vn",
      reward: "Nhận 1.000 Vàng khởi đầu & Tháp Pháo Plasma Thần Thánh",
    },
  },
  {
    slug: "game-bomber-grid",
    name: "Đặt Bom Chiến Thuật (Bomber Grid Lite)",
    model: "download",
    kind: "Android Game APK",
    category: "coop-arcade",
    format: "Android Game APK",
    gameMode: "Chiến Đấu Sinh Tồn",
    playerCount: "2 Người Đối Đầu",
    tagline: "Di chuyển trên mê cung gạch đá, đặt bom phá chướng ngại vật và dồn ép đối thủ vào chân tường.",
    description:
      "Lối chơi đặt bom huyền thoại: di chuyển trên lưới ô vuông, đặt bom hẹn giờ phá các khối gạch để thu thập vật phẩm tăng độ dài tia lửa, tăng số lượng bom và giày chạy nhanh, tìm cơ hội gài bẫy hạ gục đối thủ.",
    features: [
      "Vật lý nổ bom lan tỏa theo hàng ngang dọc chuẩn xác",
      "Hệ thống vật phẩm ngẫu nhiên: Bom thêm, Lửa dài, Giày tốc độ, Đá bom",
      "Vòng bo thu hẹp sàn đấu sau 2 phút để phân định thắng bại dứt khoát",
      "Điều khiển cảm ứng mượt mà nhạy bén",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_52_Oan_Tu_Ti_Bluetooth.html",
    downloadUrl: "/downloads/OanTuTi_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/OanTuTi_Bluetooth_v1.0.zip",
    devicePrefix: "BM",
    status: "available",
    mockupIdea: "Mê cung gạch đá với quả bom tròn cổ điển đang bốc khói hẹn giờ nổ.",
    proUnlockMission: {
      taskName: "Xem phụ kiện game & nút bấm cơ học",
      targetPartner: "Arcade Hub",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Khiên Bất Tử 5 giây & Tăng 2 mạng hồi sinh",
    },
  },
  {
    slug: "game-asteroid-coop",
    name: "Bắn Thiên Thạch Không Gian (Asteroid Co-op)",
    model: "download",
    kind: "Android Game APK",
    category: "coop-arcade",
    format: "Android Game APK",
    gameMode: "Bắn Tàu Bay Co-op",
    playerCount: "2 Người Hợp Lực",
    tagline: "Hai phi thuyền sát cánh giữa dải ngân hà, bắn vỡ các tảng thiên thạch và cùng sinh tồn.",
    description:
      "Tựa game bắn tàu arcade 2D cổ điển: hai phi thuyền di chuyển tự do trong không gian không trọng lực, bắn vỡ các thiên thạch lớn thành những mảnh nhỏ hơn, cùng thu thập khiên năng lượng và bảo vệ tàu của bạn bè.",
    features: [
      "Mô phỏng lực đẩy phản lực không gian và quán tính trôi dạt",
      "Bắn vỡ thiên thạch đa tầng kích thước sinh động",
      "Cơ chế hồi sinh đồng đội khi một tàu bị va chạm",
      "Điểm số kỷ lục chung giữa hai phi hành gia",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_53_TauChien_Bluetooth.html",
    downloadUrl: "/downloads/TauChien_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/TauChien_Bluetooth_v1.0.zip",
    devicePrefix: "AS",
    status: "available",
    mockupIdea: "Không gian vũ trụ sâu thẳm với hai phi thuyền phát tia laser bắn vỡ thiên thạch.",
    proUnlockMission: {
      taskName: "Xem kính thực tế ảo & phụ kiện điện tử",
      targetPartner: "Space Hub",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Pháo Tia Chớp Laser & Vệ tinh hộ tống",
    },
  },

  // ─── TẦNG 3: TRÍ TUỆ & BOARDGAME CỔ ĐIỂN ───
  {
    slug: "game-ludo-lite",
    name: "Cờ Cá Ngựa (Bluetooth Ludo Lite)",
    model: "download",
    kind: "Android Game APK",
    category: "puzzle-board",
    format: "Android Game APK",
    gameMode: "Boardgame Đổ Xúc Xắc",
    playerCount: "2 - 4 Người Chơi",
    tagline: "Đổ xúc xắc xúc xắc, xuất chuồng và đưa đủ 4 chú ngựa về chuồng an toàn trong tiếng cười giòn giã.",
    description:
      "Trò chơi cờ cá ngựa truyền thống gắn liền với tuổi thơ người Việt: đổ xúc xắc nhận điểm 6 để xuất quân, chạy vòng quanh bàn cờ, đá ngựa đối phương về chuồng và đưa đội quân của mình về đích an toàn.",
    features: [
      "Bàn cờ 4 màu Đỏ, Xanh Lá, Xanh Dương, Vàng sống động",
      "Xúc xắc 3D lăn ngẫu nhiên chống gian lận",
      "Chế độ chơi 2 người đối kháng hoặc 4 người luân phiên",
      "Âm thanh tiếng ngựa phi và hiệu ứng đá quân vui nhộn",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "LD",
    status: "available",
    mockupIdea: "Bàn cờ cá ngựa 4 góc 4 màu sắc nét với quân xúc xắc 3D đang lơ lửng.",
    proUnlockMission: {
      taskName: "Xem ưu đãi đồ chơi gia đình & trẻ em",
      targetPartner: "Family Deals",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Xúc Xắc May Mắn (tăng tỷ lệ đổ 6 khi xuất chuồng)",
    },
  },
  {
    slug: "game-block-puzzle",
    name: "Xếp Hình Gỗ (Block Puzzle Classic)",
    model: "download",
    kind: "Android Game APK",
    category: "puzzle-board",
    format: "Android Game APK",
    gameMode: "Xếp Gạch Thư Giãn",
    playerCount: "Chơi Đơn / So Điểm",
    tagline: "Kéo thả các khối gỗ xếp đầy hàng ngang hoặc hàng dọc để ghi điểm combo và rèn luyện tư duy không gian.",
    description:
      "Tựa game giải đố xếp hình gỗ nhẹ nhàng nhưng gây nghiện cao: kéo các khối hình dạng khác nhau vào lưới 8x8 hoặc 10x10. Khi lấp đầy một hàng hoặc một cột, các khối sẽ biến mất và phát ra âm thanh gõ gỗ êm dịu.",
    features: [
      "Chất liệu giao diện khối gỗ óc chó cổ điển sang trọng và thư thái",
      "Không giới hạn thời gian, không áp lực tốc độ, chơi bất cứ lúc nào",
      "Cơ chế Combo dọn nhiều hàng cùng lúc thưởng điểm số bùng nổ",
      "Lưu lại điểm số cao nhất mọi thời đại",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "BP",
    status: "available",
    mockupIdea: "Bàn cờ gỗ 8x8 với các khối gỗ vuông vức được kéo thả tạo thành đường combo sáng lóa.",
    proUnlockMission: {
      taskName: "Xem đồ decor bàn làm việc & gỗ mỹ nghệ",
      targetPartner: "Wood Craft",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Búa Đập Gạch (phá 1 khối kẹt) & Đổi bộ hình mới",
    },
  },
  {
    slug: "game-animal-connect",
    name: "Nối Thú Onet Cổ Điển (Animal Connect Offline)",
    model: "download",
    kind: "Android Game APK",
    category: "puzzle-board",
    format: "Android Game APK",
    gameMode: "Nhanh Mắt Nhanh Tay",
    playerCount: "1 - 2 Người Đua Điểm",
    tagline: "Tìm và nối hai chú thú cưng giống nhau bằng tối đa 3 đoạn gấp khúc trước khi đồng hồ đếm hết giờ.",
    description:
      "Tựa game nối thú kinh điển trên máy tính nay đã có mặt trên Android: hàng trăm hình vẽ động vật dễ thương được xếp ngẫu nhiên. Nhiệm vụ của bạn là nối các cặp thú giống nhau mà đường nối không bị cản trở bởi các quân cờ khác.",
    features: [
      "Hơn 50 bộ màn chơi với đủ hướng xô lệch: trên xuống, dưới lên, dồn vào tâm",
      "Đồ họa các loài vật ngộ nghĩnh, biểu cảm dễ thương",
      "Bộ nút hỗ trợ: Gợi ý cặp hình và Xáo trộn lại toàn bảng",
      "Hoạt động mượt mà không tốn pin điện thoại",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_52_Oan_Tu_Ti_Bluetooth.html",
    downloadUrl: "/downloads/OanTuTi_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/OanTuTi_Bluetooth_v1.0.zip",
    devicePrefix: "AC",
    status: "available",
    mockupIdea: "Màn hình tràn ngập các con thú hoạt hình ngộ nghĩnh nối nhau bằng đường kẻ vàng lấp lánh.",
    proUnlockMission: {
      taskName: "Xem ưu đãi thú cưng & phụ kiện gia đình",
      targetPartner: "Pet Store",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa 10 lượt Gợi Ý Nhanh & 5 Lượt Xáo Bảng Tự Động",
    },
  },
  {
    slug: "game-backgammon",
    name: "Cờ Tào Cáo (Mini Backgammon)",
    model: "download",
    kind: "Android Game APK",
    category: "puzzle-board",
    format: "Android Game APK",
    gameMode: "Boardgame Chiến Thuật",
    playerCount: "2 Người (Bluetooth) / Solo",
    tagline: "Bộ môn cờ bàn cổ xưa nhất nhân loại: tính toán xác suất xúc xắc và di chuyển quân cờ về đích an toàn.",
    description:
      "Trò chơi cờ Backgammon kết hợp hoàn hảo giữa kỹ năng tính toán và vận may xúc xắc: hai người chơi di chuyển 15 quân cờ của mình theo hai chiều ngược nhau trên 24 điểm tam giác. Bắt quân đối phương và đưa toàn bộ quân về đích trước.",
    features: [
      "Bàn cờ da cổ điển với các tam giác đỏ đen tương phản sang trọng",
      "Luật chơi chuẩn quốc tế kèm hướng dẫn từng bước cho người mới",
      "Đấu 2 người qua Bluetooth hoặc luyện tập với máy ở 3 cấp độ",
      "Lưu lại thế trận ván đấu khi có cuộc gọi đến",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_39_CoCaro_Bluetooth_Offline.html",
    downloadUrl: "/downloads/CoCaro_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/CoCaro_Bluetooth_v1.0.zip",
    devicePrefix: "BG",
    status: "available",
    mockupIdea: "Bàn cờ Backgammon bằng da nâu sang trọng với các quân cờ tròn ngà và đen bóng.",
    proUnlockMission: {
      taskName: "Khám phá các bộ cờ vua & cờ tướng cao cấp",
      targetPartner: "Boardgame Store",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Bàn Cờ Cẩm Thạch & Gợi ý nước đi tối ưu AI",
    },
  },
  {
    slug: "game-memory-match",
    name: "Lật Hình Trí Nhớ (Memory Match Duel)",
    model: "download",
    kind: "Android Game APK",
    category: "puzzle-board",
    format: "Android Game APK",
    gameMode: "Rèn Luyện Trí Não",
    playerCount: "2 Người Thi Đấu / Solo",
    tagline: "Lật mở từng cặp thẻ bài úp để kiểm tra trí nhớ siêu phàm và thi thố điểm số cùng bạn bè.",
    description:
      "Trò chơi rèn luyện phản xạ và trí nhớ hình ảnh: các cặp thẻ bài úp mặt trên bàn cờ. Mỗi lượt, người chơi lật mở 2 lá bài; nếu trùng khớp sẽ giữ lại lá bài và được đi tiếp, nếu sai sẽ úp lại và chuyển lượt cho đối thủ.",
    features: [
      "Các bộ chủ đề thẻ bài: Động vật, Cờ các quốc gia, Xe cộ và Biểu tượng số học",
      "Chế độ thi đấu 2 người luân phiên giật điểm kịch tính",
      "Nhiều kích cỡ bàn cờ: 4x4 (16 thẻ), 5x6 (30 thẻ) và 6x6 (36 thẻ)",
      "Bài tập tuyệt vời cho trí não người lớn và trẻ nhỏ mỗi ngày",
    ],
    price: 0,
    delivery: "File cài đặt APK Android",
    demoUrl: "/products/Game_60_Do_Vui_Bluetooth.html",
    downloadUrl: "/downloads/DoVui_Bluetooth_v1.0.apk",
    zipUrl: "/downloads/DoVui_Bluetooth_v1.0.zip",
    devicePrefix: "MM",
    status: "available",
    mockupIdea: "Các quân bài lật mở hiệu ứng 3D hiển thị hình vẽ động vật sắc nét sống động.",
    proUnlockMission: {
      taskName: "Khám phá trò chơi phát triển trí thông minh",
      targetPartner: "Edu Toys",
      affiliateUrl: "https://shopee.vn",
      reward: "Mở khóa Bộ Thẻ Bài Vũ Trụ & 3 lượt Xem Nhanh toàn bảng",
    },
  },
];

export const BUNDLES: Bundle[] = [
  {
    id: "bundle-master-game-15in1",
    name: "Bộ Sưu Tập Master Game Pack (15 Game Android)",
    tagline: "Trọn bộ 15 tựa game đối kháng Bluetooth, hợp tác Co-op và trí tuệ cổ điển trong 1 file nén ZIP.",
    products: [
      "game-tic-tac-toe-pro",
      "game-battleship-duel",
      "game-rock-paper-scissors",
      "game-quiz-duel",
      "game-bluetooth-party-pack",
      "game-pong-bluetooth",
      "game-coop-escape",
      "game-tower-defense-duo",
      "game-bomber-grid",
      "game-asteroid-coop",
      "game-ludo-lite",
      "game-block-puzzle",
      "game-animal-connect",
      "game-backgammon",
      "game-memory-match"
    ],
    badge: "Trọn Bộ 15 Game",
  },
  {
    id: "bundle-bluetooth-pvp",
    name: "Bộ 5 Game Đối Kháng Bluetooth 2 Người",
    tagline: "Cờ Ca Rô + Đấu Tàu Chiến + Oẳn Tù Tì + Đố Vui Trí Tuệ + Party Pack kết nối ngang hàng 2 máy.",
    products: [
      "game-tic-tac-toe-pro",
      "game-battleship-duel",
      "game-rock-paper-scissors",
      "game-quiz-duel",
      "game-bluetooth-party-pack"
    ],
    badge: "5 Game Bluetooth",
  },
  {
    id: "bundle-coop-arcade",
    name: "Bộ 5 Game Hợp Tác & Thử Thách Co-op",
    tagline: "Bóng Bàn Pong + Giải Mã Mê Cung + Thủ Thành Duo + Đặt Bom + Bắn Thiên Thạch.",
    products: [
      "game-pong-bluetooth",
      "game-coop-escape",
      "game-tower-defense-duo",
      "game-bomber-grid",
      "game-asteroid-coop"
    ],
    badge: "5 Game Co-op",
  },
  {
    id: "bundle-puzzle-classic",
    name: "Bộ 5 Game Trí Tuệ & Boardgame Cổ Điển",
    tagline: "Cờ Cá Ngựa + Xếp Hình Gỗ + Nối Thú Onet + Cờ Tào Cáo + Lật Hình Trí Nhớ.",
    products: [
      "game-ludo-lite",
      "game-block-puzzle",
      "game-animal-connect",
      "game-backgammon",
      "game-memory-match"
    ],
    badge: "5 Game Boardgame",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatVnd(n: number): string {
  return `${n.toLocaleString("vi-VN")}đ`;
}

export function priceLabel(p: Product): string {
  return p.gameMode || "Mini Game";
}

export const PRODUCT_THEMES: Record<string, ProductVisualTheme> = {
  "game-tic-tac-toe-pro": {
    spineColor: "#0f172a",
    textColor: "#ffffff",
    accentColor: "#22d3ee",
    pattern: "grid",
    symbol: "⚔️",
    serialTag: "PVP. 01 · CARO",
    coverGradient: "linear-gradient(145deg, #091322 0%, #082f49 45%, #164e63 100%)",
    glowColor: "rgba(6, 182, 212, 0.55)",
  },
  "game-battleship-duel": {
    spineColor: "#022c22",
    textColor: "#f0fdfa",
    accentColor: "#34d399",
    pattern: "geometric",
    symbol: "⚓",
    serialTag: "PVP. 02 · NAVY",
    coverGradient: "linear-gradient(145deg, #021a14 0%, #064e3b 50%, #042f2e 100%)",
    glowColor: "rgba(16, 185, 129, 0.55)",
  },
  "game-rock-paper-scissors": {
    spineColor: "#450a0a",
    textColor: "#fffbeb",
    accentColor: "#fbbf24",
    pattern: "circles",
    symbol: "✊",
    serialTag: "PVP. 03 · RPS",
    coverGradient: "linear-gradient(145deg, #2b0606 0%, #7c2d12 50%, #78350f 100%)",
    glowColor: "rgba(245, 158, 11, 0.55)",
  },
  "game-quiz-duel": {
    spineColor: "#2e1065",
    textColor: "#fbfbfe",
    accentColor: "#c4b5fd",
    pattern: "diamonds",
    symbol: "🧠",
    serialTag: "PVP. 04 · QUIZ",
    coverGradient: "linear-gradient(145deg, #1e0a45 0%, #4c1d95 50%, #3b0764 100%)",
    glowColor: "rgba(168, 85, 247, 0.55)",
  },
  "game-bluetooth-party-pack": {
    spineColor: "#500724",
    textColor: "#ecfeff",
    accentColor: "#22d3ee",
    pattern: "vintage",
    symbol: "🎉",
    serialTag: "PVP. 05 · PARTY",
    coverGradient: "linear-gradient(145deg, #380419 0%, #831843 50%, #0e7490 100%)",
    glowColor: "rgba(236, 72, 153, 0.55)",
  },
  "game-pong-bluetooth": {
    spineColor: "#0f172a",
    textColor: "#f5f3ff",
    accentColor: "#a78bfa",
    pattern: "grid",
    symbol: "🏓",
    serialTag: "COOP. 01 · PONG",
    coverGradient: "linear-gradient(145deg, #090b1e 0%, #1e1b4b 50%, #4c1d95 100%)",
    glowColor: "rgba(139, 92, 246, 0.55)",
  },
  "game-coop-escape": {
    spineColor: "#052e16",
    textColor: "#f0fdf4",
    accentColor: "#4ade80",
    pattern: "stripes",
    symbol: "🗝️",
    serialTag: "COOP. 02 · MAZE",
    coverGradient: "linear-gradient(145deg, #031c0e 0%, #14532d 50%, #064e3b 100%)",
    glowColor: "rgba(34, 197, 94, 0.55)",
  },
  "game-tower-defense-duo": {
    spineColor: "#4a044e",
    textColor: "#fdf4ff",
    accentColor: "#f472b6",
    pattern: "geometric",
    symbol: "🏰",
    serialTag: "COOP. 03 · TOWER",
    coverGradient: "linear-gradient(145deg, #300233 0%, #701a75 50%, #831843 100%)",
    glowColor: "rgba(217, 70, 239, 0.55)",
  },
  "game-bomber-grid": {
    spineColor: "#18181b",
    textColor: "#fefce8",
    accentColor: "#facc15",
    pattern: "grid",
    symbol: "💣",
    serialTag: "COOP. 04 · BOMB",
    coverGradient: "linear-gradient(145deg, #09090b 0%, #431407 50%, #713f12 100%)",
    glowColor: "rgba(234, 88, 12, 0.55)",
  },
  "game-asteroid-coop": {
    spineColor: "#020617",
    textColor: "#f8fafc",
    accentColor: "#38bdf8",
    pattern: "diamonds",
    symbol: "🚀",
    serialTag: "COOP. 05 · SPACE",
    coverGradient: "linear-gradient(145deg, #020617 0%, #075985 50%, #0369a1 100%)",
    glowColor: "rgba(2, 132, 199, 0.55)",
  },
  "game-ludo-lite": {
    spineColor: "#450a0a",
    textColor: "#fef2f2",
    accentColor: "#f87171",
    pattern: "circles",
    symbol: "🎲",
    serialTag: "BOARD. 01 · LUDO",
    coverGradient: "linear-gradient(145deg, #2b0606 0%, #7f1d1d 50%, #854d0e 100%)",
    glowColor: "rgba(220, 38, 38, 0.55)",
  },
  "game-block-puzzle": {
    spineColor: "#1c1917",
    textColor: "#faf5ff",
    accentColor: "#d8b4fe",
    pattern: "grid",
    symbol: "🧱",
    serialTag: "BOARD. 02 · BLOCK",
    coverGradient: "linear-gradient(145deg, #0c0a09 0%, #451a03 50%, #78350f 100%)",
    glowColor: "rgba(217, 119, 6, 0.55)",
  },
  "game-animal-connect": {
    spineColor: "#022c22",
    textColor: "#ecfdf5",
    accentColor: "#34d399",
    pattern: "diamonds",
    symbol: "🐼",
    serialTag: "BOARD. 03 · ONET",
    coverGradient: "linear-gradient(145deg, #021a14 0%, #065f46 50%, #047857 100%)",
    glowColor: "rgba(16, 185, 129, 0.55)",
  },
  "game-backgammon": {
    spineColor: "#2e1065",
    textColor: "#fdf4ff",
    accentColor: "#e879f9",
    pattern: "stripes",
    symbol: "♟️",
    serialTag: "BOARD. 04 · GAMMON",
    coverGradient: "linear-gradient(145deg, #190838 0%, #4c1d95 50%, #581c87 100%)",
    glowColor: "rgba(168, 85, 247, 0.55)",
  },
  "game-memory-match": {
    spineColor: "#082f49",
    textColor: "#ecfeff",
    accentColor: "#67e8f9",
    pattern: "vintage",
    symbol: "🃏",
    serialTag: "BOARD. 05 · MATCH",
    coverGradient: "linear-gradient(145deg, #041c2c 0%, #0e7490 50%, #155e75 100%)",
    glowColor: "rgba(20, 184, 166, 0.55)",
  },
};

export function getProductTheme(p: Product): ProductVisualTheme {
  return (
    p.theme ||
    PRODUCT_THEMES[p.slug] || {
      spineColor: "#1e293b",
      textColor: "#ffffff",
      accentColor: "#eabd17",
      pattern: "geometric",
      symbol: "🎮",
      serialTag: "GAME. 2026",
    }
  );
}

export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  features: string[];
  demoUrl: string | null;
}

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
