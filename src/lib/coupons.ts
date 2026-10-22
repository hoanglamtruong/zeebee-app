// Quản lý mã giảm giá (Coupon / Voucher) được Admin Zeebee cấp
// Dành cho: Khách quen, KOL, KOC, Cộng tác viên (CTV)

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number; // 20 = 20% hoặc 50000 = 50.000đ
  label: string;
  group: "kol" | "koc" | "ctv" | "khach_quen" | "special";
  description: string;
  active: boolean;
}

export const COUPONS: Coupon[] = [
  // ─── KOL / KOC (Reviewer, Tiktoker, Youtuber) ───
  {
    code: "KOL50",
    type: "percent",
    value: 50,
    label: "Ưu đãi Đối tác KOL / Reviewer (-50%)",
    group: "kol",
    description: "Giảm 50% dành cho khán giả kênh KOL hợp tác với Zeebee",
    active: true,
  },
  {
    code: "KOL30",
    type: "percent",
    value: 30,
    label: "Ưu đãi Đối tác KOL (-30%)",
    group: "kol",
    description: "Giảm 30% dành cho cộng đồng KOL giới thiệu",
    active: true,
  },
  {
    code: "KOL100",
    type: "percent",
    value: 100,
    label: "Tài trợ 100% Khách mời KOL / KOC (-100%)",
    group: "kol",
    description: "Cấp License Key miễn phí 100% cho KOL trải nghiệm làm video review",
    active: true,
  },
  {
    code: "KOCVIP",
    type: "percent",
    value: 35,
    label: "Ưu đãi Đối tác KOC VIP (-35%)",
    group: "koc",
    description: "Dành riêng cho khách hàng từ đối tác KOC Zeebee",
    active: true,
  },

  // ─── CỘNG TÁC VIÊN (CTV) ───
  {
    code: "CTV20",
    type: "percent",
    value: 20,
    label: "Ưu đãi Cộng Tác Viên (-20%)",
    group: "ctv",
    description: "Chiết khấu trực tiếp cho khách mua qua hệ thống CTV Zeebee",
    active: true,
  },
  {
    code: "CTV30",
    type: "percent",
    value: 30,
    label: "Ưu đãi CTV Hạng Vàng (-30%)",
    group: "ctv",
    description: "Chiết khấu đặc biệt dành cho CTV xuất sắc",
    active: true,
  },
  {
    code: "CTVZEEBEE",
    type: "percent",
    value: 25,
    label: "Ưu đãi Đối Tác Zeebee Partner (-25%)",
    group: "ctv",
    description: "Chính sách đối tác liên kết phân phối ứng dụng",
    active: true,
  },

  // ─── KHÁCH HÀNG THÂN THIẾT / KHÁCH QUEN ───
  {
    code: "KHACHQUEN",
    type: "percent",
    value: 20,
    label: "Tri Ân Khách Quen Thân Thiết (-20%)",
    group: "khach_quen",
    description: "Dành cho khách hàng thân thiết đã từng ủng hộ Zeebee",
    active: true,
  },
  {
    code: "VIP2026",
    type: "percent",
    value: 25,
    label: "Thành Viên Zeebee VIP 2026 (-25%)",
    group: "khach_quen",
    description: "Đặc quyền thành viên VIP thân thiết của hệ sinh thái Zeebee",
    active: true,
  },
  {
    code: "TRIAN",
    type: "percent",
    value: 15,
    label: "Chương Trình Tri Ân Khách Hàng (-15%)",
    group: "khach_quen",
    description: "Voucher tri ân khách hàng nhân dịp mở rộng cửa hàng số",
    active: true,
  },
  {
    code: "ZEEBEE10",
    type: "percent",
    value: 10,
    label: "Ưu Đãi Khách Hàng Mới (-10%)",
    group: "special",
    description: "Giảm 10% trải nghiệm ứng dụng lần đầu",
    active: true,
  },
];

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  label?: string;
  description?: string;
  discountAmount: number;
  finalPrice: number;
  originalPrice: number;
  message: string;
  coupon?: Coupon;
}

export function validateCoupon(rawCode: string, originalPrice: number): CouponValidationResult {
  const code = (rawCode || "").trim().toUpperCase();
  if (!code) {
    return {
      valid: false,
      code: "",
      discountAmount: 0,
      finalPrice: originalPrice,
      originalPrice,
      message: "Vui lòng nhập mã giảm giá.",
    };
  }

  // Tìm trong danh mục coupon
  const found = COUPONS.find((c) => c.code === code && c.active);

  if (!found) {
    // Hỗ trợ mã động định dạng: CTV_[SĐT/TÊN] hoặc KOL_[TÊN] mặc định giảm 20%
    if (code.startsWith("CTV-") || code.startsWith("CTV_")) {
      const discount = Math.round(originalPrice * 0.2);
      return {
        valid: true,
        code,
        label: `Mã Cộng Tác Viên (${code}) - Giảm 20%`,
        description: "Mã giới thiệu hợp lệ từ đối tác CTV Zeebee",
        discountAmount: discount,
        finalPrice: Math.max(0, originalPrice - discount),
        originalPrice,
        message: "Áp dụng mã CTV thành công! Giảm 20%.",
      };
    }
    if (code.startsWith("KOL-") || code.startsWith("KOL_") || code.startsWith("KOC-") || code.startsWith("KOC_")) {
      const discount = Math.round(originalPrice * 0.3);
      return {
        valid: true,
        code,
        label: `Mã Đối Tác KOL/KOC (${code}) - Giảm 30%`,
        description: "Mã giới thiệu hợp lệ từ Creator / KOL",
        discountAmount: discount,
        finalPrice: Math.max(0, originalPrice - discount),
        originalPrice,
        message: "Áp dụng mã KOL/KOC thành công! Giảm 30%.",
      };
    }

    return {
      valid: false,
      code,
      discountAmount: 0,
      finalPrice: originalPrice,
      originalPrice,
      message: "Mã giảm giá không tồn tại hoặc đã hết hạn.",
    };
  }

  let discountAmount = 0;
  if (found.type === "percent") {
    discountAmount = Math.round((originalPrice * found.value) / 100);
  } else {
    discountAmount = found.value;
  }

  if (discountAmount > originalPrice) {
    discountAmount = originalPrice;
  }

  const finalPrice = Math.max(0, originalPrice - discountAmount);

  return {
    valid: true,
    code: found.code,
    label: found.label,
    description: found.description,
    discountAmount,
    finalPrice,
    originalPrice,
    message: `Áp dụng thành công: ${found.label}`,
    coupon: found,
  };
}
