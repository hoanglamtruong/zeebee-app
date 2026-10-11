# LỊCH SỬ PHÁT TRIỂN — Onbase Zeebee App (`app.zeebee.vn` + `zeebee.vn`)

> Dành cho agent phụ trách onbase này. Tình trạng hiện tại xem `docs/HANDOFF.md`; báo cáo vòng xem `docs/reports/`.
> Cập nhật lần cuối: 11/10/2026. **Ghi thêm vào cuối file mỗi khi xong một vòng hoặc có quyết định mới.**

## Tóm tắt một dòng

Sinh ra 03/10/2026 làm trang dịch vụ Build Web/Tool/App; ngày 10–11/10 trở thành **cửa hàng sản phẩm số** của hệ sinh thái
(ưu tiên **Tải về dùng**) kèm dịch vụ **build theo yêu cầu**, đồng thời phục vụ **trang chủ `zeebee.vn`** (giới thiệu hệ sinh thái).

## Bối cảnh: tên miền `zeebee.vn` đã đổi chủ 4 lần
| Thời gian | `zeebee.vn` phục vụ |
|---|---|
| 06/2026 | Nền tảng Owner (zbvn) — nay ở `owner.zeebee.vn` |
| 30/08 → 30/09 | Trang Marketing "Zee Bee Agency" — nay là onbase Ads |
| 30/09 → 10/10 | Cửa hàng Zeebee Decor — nay ở `decor.zeebee.vn` |
| **từ 10/10** | **Trang hệ sinh thái (onbase này)** |
Vì vậy ngoài Internet còn link cũ trỏ `zeebee.vn/...` — middleware chuyển 301 các đường dẫn Decor sang `decor.zeebee.vn`.

## Dòng thời gian

### Vòng 1 SETUP (03/10/2026, `4eff990`)
Trang dịch vụ Build Web/Tool/App: 3 nhóm (Gói cấu hình cơ bản, Module mở rộng, Nền tảng tùy biến) + form tư vấn lưu SQLite.
Chưa có giá (CEO chưa chốt). Container `zeebee-app` cổng 8131, nhưng **chưa có tên miền nào trỏ tới** (tunnel `app.zeebee.vn` chưa tạo).

### 10/10/2026 — sự cố định tuyến & quyết định tên miền
- Phát hiện `zeebee.vn` và `decor.zeebee.vn` cùng hiện trang Decor (route tunnel `zeebee.vn → 8111`). CEO xác nhận `zeebee.vn` phải là
  trang của onbase này → đổi route `zeebee.vn`, `www.zeebee.vn` sang **8131** trên Cloudflare Dashboard; gỡ `zbooking`, `quangcao` (đã ngưng).
- Bài học: tunnel `homelab-tunnel` **quản lý trên Dashboard** — sửa `/etc/cloudflared/config.yml` không có tác dụng;
  `cloudflared tunnel route dns` trên máy Dell tạo nhầm bản ghi ở zone `zeebee.cloud`.
- CEO chốt **hệ sinh thái**: Decor, Owner giữ nguyên; Ads thu hẹp; thêm `app.zeebee.vn` bán sản phẩm số + build theo nhu cầu;
  `zeebee.vn` về sau là cổng đăng ký khách hàng chung (không gấp).
- CEO chốt **2 mô hình**: *đóng gói* (Decor, app/game tải về) — **ưu tiên**; *custom* (content, build app, build ads) — lấy yêu cầu cụ thể rồi báo giá.
- CEO chốt **flow đơn chung**: khách để lại tên + SĐT → Telegram Seller → Seller tự chốt; khách dừng ở bước gửi; thành viên là tùy chọn ở `zeebee.vn`.

### Vòng 2 (11/10/2026, `06d02e6`)
Cửa hàng sản phẩm số (5 app hiện có làm sản phẩm, có nút Dùng thử), `/build` (form thu yêu cầu custom: loại, mục đích, tính năng,
mẫu tham khảo, hạn, ngân sách), `/cam-on` (báo Seller liên hệ trong 15 phút / sáng mai nếu ngoài 8h–21h), bảng `orders`, Telegram,
chống gửi dồn. `zeebee.vn` → trang hệ sinh thái `/he-sinh-thai` (rewrite theo Host). Thêm route `app.zeebee.vn` trên Dashboard.
Mô tả sản phẩm được đối chiếu với app thật (không bịa tính năng).

### Vòng 3 (11/10/2026, `2ca2e65`, `c512106`)
- **Quyết định CEO:** phân loại **Tải về dùng** (trả 1 lần, chạy trên máy khách — **ưu tiên**) và **Thuê bao online** (tháng/năm).
  Khảo sát cho thấy cả 5 app hiện có đều cần DB/máy chủ (Postgres, Supabase, bot Telegram, dịch vụ tải video) → **không tải về được** →
  chuyển sang Thuê bao (giá CEO duyệt: MoBo/zQR Online 49k/tháng – 490k/năm, Mind Flow/Zlink 39k – 390k, Ztodo 29k – 290k).
- CEO cho phép đề xuất và build sản phẩm tải về mới. Đã build:
  - **zQR Offline** (79k): 1 file HTML tự chứa, nhúng `qr-code-styling` (MIT). Sự cố: thư viện mặc định không mã hóa UTF-8 → tiếng Việt có dấu hỏng;
    sửa bằng cách đổi chuỗi sang byte UTF-8 trước. Kiểm thử: quét ngược bằng jsQR; CRC VietQR đối chiếu độc lập bằng Python.
  - **3 file Excel** (Sổ thu chi 49k, Quản lý bán hàng 149k, Chấm công & tính lương 99k) sinh bằng `build_excel.py`. Sự cố bắt được trước khi bán:
    danh sách chọn trỏ vùng 2 cột (Excel không nhận) → thêm cột gộp; SUMPRODUCT + N() trên vùng (sai trong Excel) → cột phụ + SUMIFS.
    Tính lại bằng thư viện `formulas`: 0 lỗi, khớp số tính tay. Chưa mở bằng Excel thật (máy chưa cài).
- Game "Xếp Hình Cá Gỗ" để **Sắp ra mắt**.

### 11/10/2026 — tài liệu
`docs/HANDOFF.md`, file này, `CLAUDE.md` cho agent phụ trách; handoff tổng hệ sinh thái tại `~/zeebee/docs/HANDOFF.md`.

## Quyết định của CEO còn hiệu lực
1. Ưu tiên **Tải về dùng**; nếu sản phẩm hiện có không đáp ứng, được đề xuất sản phẩm khác và build.
2. Thuê bao: giá tháng/năm như trên; cách cấp riêng cho từng khách **chưa quyết**.
3. Build theo yêu cầu là **custom** — không bán theo gói; chìa khóa là lấy yêu cầu cụ thể.
4. Flow đơn: tên + SĐT → Telegram → Seller tự chốt. Thành viên ở `zeebee.vn` là tùy chọn, làm sau; định danh theo SĐT.

## Bài học
| Sự cố | Bài học |
|---|---|
| Mô tả sản phẩm ban đầu đoán tính năng | Luôn đối chiếu với app thật trước khi viết mô tả bán hàng |
| Bán app cần máy chủ như "trả 1 lần" | Kiểm tra kiến trúc (có DB/máy chủ không) trước khi xếp loại sản phẩm |
| Thư viện QR cắt tiếng Việt | Luôn test nội dung tiếng Việt có dấu, giải mã ngược để xác nhận |
| Click giả lập mobile trong trình duyệt test không trúng nút | Xác nhận lại bằng click thật ở khung desktop trước khi kết luận là lỗi |
| Repo chưa cấu hình tên tác giả → commit lỗi sau khi đã deploy | Kiểm tra `git config user.name` trước khi deploy; commit trước, deploy sau |
