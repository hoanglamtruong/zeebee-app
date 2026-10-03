# Report-log · app.zeebee.vn

> Ghi theo vòng, APPEND — không ghi đè. Đọc file này trước khi soạn Brief vòng mới.

## VÒNG 1 · SETUP · 03/10/2026

- Yêu cầu   : Dựng hạ tầng + trang dịch vụ Build Web/Tool/App cho Zee Bee Agency
  tại domain `app.zeebee.vn`. Xem `ZOS/orders/app-zeebee-vn.md`.
- Kết quả   : PASS Tầng 1 (máy CODE + Tailscale) — chờ merge PR + lệnh `/xuatban`
  để deploy Tầng 2 (domain chính thức).
- Chi tiết:
  - Port đổi từ 8123 (đề xuất gốc, đã bị chiếm trên máy CODE bởi
    `bamhuyetgiatruyen-app`) sang **8131** — xác nhận trống trên cả máy CODE
    (HP) và máy DEPLOY (Dell) lúc SETUP.
  - Build Next.js 16 + Docker multi-stage (`output: standalone`) — verify
    `docker build` + `docker compose up -d` PASS, `curl http://localhost:8131/`
    → HTTP 200, nội dung đúng 3 nhóm dịch vụ.
  - API `/api/leads` (lưu SQLite `node:sqlite`, volume `zeebee-app-data`) đã
    test POST thành công.
  - Tailscale test link (máy CODE, HP): `http://100.82.135.18:8131/` → HTTP 200.
  - Brand kế thừa nguyên từ Zee Bee Agency (navy/gold/orange, logo
    `zeebee_logo_horizontal_white.svg`) — đồng bộ `zeebee-staff`.
  - KHÔNG dựng bảng giá/catalog gói chi tiết trong VÒNG 1 (giá chưa chốt) —
    đúng theo Order.
- CLEAN     : ✅ không dead code — đã xóa `node_modules`/`.next` khỏi host sau
  build Docker, `.dockerignore`/`.gitignore` đầy đủ, không service mồ côi.
- README    : ✅ đã viết theo đúng dự án (mô hình nghiệp vụ, stack, cấu trúc,
  lệnh dev/deploy, quy ước backup, việc tồn đọng).
- Backup    : ⏳ GitHub — PR đang mở (chờ merge). Drive — chưa có asset ngoài
  logo kế thừa, chưa cần tạo folder riêng ở vòng này.
- Ghi chú quy trình: commit scaffold đầu tiên đã lên thẳng `main` vì repo
  GitHub lúc tạo hoàn toàn trống (chưa có commit nào để nhánh riêng). PR này
  (branch `claude/app-zeebee-vn-setup-vong1`) là bước Human Node merge chính
  thức cho VÒNG 1 — từ vòng sau, mọi thay đổi đều đi qua branch + PR trước khi
  vào `main`, không push thẳng nữa.
- Quyết định override (nếu có, do lặp >3 lần) : không có.
- Tồn đọng cho vòng sau:
  - Cloudflare Tunnel ingress `app.zeebee.vn` trên Dell CHƯA tạo (Human Node).
  - Bảng giá/catalog gói dịch vụ cụ thể — chờ CEO chốt giá.
  - Kênh thông báo lead mới (email/Telegram) chưa có.
