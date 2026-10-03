# app.zeebee.vn — Zee Bee Agency Build Web/Tool/App

Trang dịch vụ chính thức cho mảng kinh doanh mới của Zee Bee Agency: thiết kế &
thi công website — tool — app theo yêu cầu khách hàng.

## Mô hình nghiệp vụ

- Trang giới thiệu 3 nhóm dịch vụ: **Gói cấu hình cơ bản** (sản phẩm dựng sẵn,
  tùy biến nhẹ) · **Module mở rộng** (thêm chức năng vào nền tảng đang chạy) ·
  **Nền tảng tùy biến hoàn toàn** (build riêng theo yêu cầu).
- Khách để lại yêu cầu tư vấn qua form (họ tên, liên hệ, gói quan tâm, mô tả
  ngắn) → lưu vào SQLite, Zee Bee Agency chủ động liên hệ lại.
- VÒNG 1 (SETUP) **không** có bảng giá/catalog gói chi tiết — giá chưa được CEO
  chốt. Nội dung giá/gói cụ thể sẽ bổ sung ở vòng NÂNG CẤP sau.
- Domain `app.zeebee.vn` chỉ phục vụ riêng hệ sinh thái Zeebee (không dùng cho
  module chia sẻ đa thương hiệu — domain đó là `*.zspace.io.vn`).

## Tech stack

- Next.js 16 (App Router, Turbopack/webpack build) + React 19 + TypeScript
- Tailwind CSS v4 — brand tokens kế thừa từ Zee Bee Agency (navy/gold/orange,
  xem `src/app/globals.css`, đồng bộ với `zeebee-staff`)
- Lưu yêu cầu tư vấn: `node:sqlite` (built-in Node 22, không cần biên dịch
  native) — file `data/zeebee-app.db`, persist qua Docker volume
  `zeebee-app-data`
- Icon: `lucide-react`
- Đóng gói: Docker multi-stage build (`output: "standalone"`), network
  `homelab-net`

## Cấu trúc thư mục

```
src/app/              → App Router pages (page.tsx, layout.tsx, globals.css)
src/app/api/leads/    → API nhận yêu cầu tư vấn (POST)
src/components/       → LeadForm (client component)
src/lib/db.ts         → SQLite — bảng leads
public/               → logo + static assets
docs/reports/         → report-log theo vòng (eng.cook.app)
```

## Lệnh dev / deploy

```bash
# Dev local
npm install
npm run dev          # http://localhost:8131

# Build + chạy Docker (Tầng 1 — máy CODE)
docker build -t zeebee-app:latest .
docker compose up -d # http://localhost:8131

# Deploy chính thức (Tầng 2 — máy DEPLOY, sau lệnh /xuatban)
# SSH sang máy deploy → git pull nhánh đã merge → docker compose up -d --build
# → Cloudflare Tunnel ingress trỏ app.zeebee.vn → cổng 8131
```

## Quy ước backup

- **Codebase** → GitHub (`hoanglamtruong/zeebee-app`), remote chính thức duy
  nhất.
- **Asset khác** (ảnh/video ngoài `public/`, nếu có về sau) → Google Drive,
  folder riêng của dự án (chưa tạo ở VÒNG 1 — chưa có asset ngoài logo).

## Việc còn tồn đọng

- Chưa có bảng giá/catalog gói dịch vụ chi tiết — chờ CEO chốt giá (vòng NÂNG
  CẤP kế tiếp).
- Chưa có kênh thông báo lead mới (email/Telegram) — hiện chỉ lưu SQLite, xem
  trực tiếp qua `sqlite3 data/zeebee-app.db "select * from leads;"`.
- Chưa có Cloudflare Tunnel ingress route cho `app.zeebee.vn` trên máy DEPLOY
  (Human Node — thêm qua Zero Trust Dashboard trước khi Tầng 2 có thể live).
- Chưa có folder Drive riêng cho dự án (tạo khi có asset cần lưu ngoài git).
