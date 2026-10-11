# HANDOFF — Onbase Zeebee App (`app.zeebee.vn` + `zeebee.vn`)

> Bàn giao kỹ thuật · hạ tầng · công nghệ · tiến trình build · vận hành nâng cấp.
> Cập nhật lần cuối: **11/10/2026** — cập nhật lại file này mỗi khi đổi hạ tầng hoặc xong một vòng build.

| Giai đoạn | Trạng thái |
|---|---|
| 1. Cài đặt | ✅ Xong — live tại `https://app.zeebee.vn` và `https://zeebee.vn` |
| 2. Xây dựng | 🟡 Đang làm — 4/5 sản phẩm "Tải về dùng" đã build, game chưa làm |
| 3. Vận hành | 🟡 Đã có flow đơn → Telegram; chưa có đơn thật; chưa có danh sách Seller riêng |

---

## 1. Onbase là gì

Một container phục vụ **2 tên miền**, phân biệt theo `Host` trong `src/middleware.ts`:

| Tên miền | Nội dung |
|---|---|
| `app.zeebee.vn` | Cửa hàng sản phẩm số + dịch vụ build theo yêu cầu |
| `zeebee.vn`, `www.zeebee.vn` | `/` hiển thị trang **hệ sinh thái** (`/he-sinh-thai`): Decor, App, Ads, Owner, "Thành viên — sắp ra mắt". Link Decor cũ được **301 sang `decor.zeebee.vn`** |

### Mô hình kinh doanh (CEO chốt 11/10/2026)
- **Tải về dùng** (ƯU TIÊN): trả 1 lần, khách nhận file, chạy trên máy khách kể cả offline. Seller gửi file qua Zalo sau khi chốt.
- **Thuê bao online**: trả theo tháng/năm, chạy trên máy chủ Zeebee — 5 app hiện có (MoBo, zQR Online, Ztodo, Mind Flow, Zlink) vì đều cần DB/máy chủ.
- **Build theo yêu cầu** (custom): không bán theo gói — form `/build` thu yêu cầu cụ thể để Seller báo giá ngay.

**Flow chung:** khách để lại Họ tên + SĐT → **hành trình khách dừng** → lưu DB + Telegram → Seller tự gọi/Zalo chốt. Trang `/cam-on` báo Seller liên hệ trong 15 phút (ngoài giờ 8h–21h: sáng mai).

## 2. Hạ tầng

| Hạng mục | Giá trị |
|---|---|
| Máy chạy | Dell OptiPlex 9010 (`zang-dell-optiplex-9010`, Ubuntu 24.04) — xem zinfra |
| Container | `zeebee-app`, image `zeebee-app:latest`, compose project `zeebee-app` |
| Cổng | host `8131` → container `3000` |
| Mạng Docker | `homelab-net` (external) |
| Tên miền | `app.zeebee.vn`, `zeebee.vn`, `www.zeebee.vn` → `http://localhost:8131` qua Cloudflare Tunnel `homelab-tunnel` |
| Route tunnel | **Quản lý trên Cloudflare Dashboard** (Zero Trust → Networks → Tunnels → homelab-tunnel → Published application routes); `config.yml` trên máy bị bỏ qua. Thêm route ở dashboard sẽ tự tạo DNS đúng zone. **Đừng dùng `cloudflared tunnel route dns`** trên máy này — cert của nó thuộc zone `zeebee.cloud`, sẽ tạo nhầm `x.zeebee.vn.zeebee.cloud` |
| Dữ liệu | SQLite `/app/data/zeebee-app.db` trong Docker volume `zeebee-app_zeebee-app-data` (bảng `leads` cũ + `orders`) |

## 3. Công nghệ

- Next.js **16.3.8** (App Router, `next build --webpack`, `output: standalone`) · React 19.2.8 · TypeScript · Tailwind CSS 4 · lucide-react
- Node 22 — SQLite qua module có sẵn `node:sqlite` (không cần biên dịch native)
- Telegram Bot (dùng chung bot với Decor)

### Biến môi trường (`.env`, KHÔNG commit — chỉ ghi tên)
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (nạp qua `env_file`, `required: false`). Trong compose:
`ZEEBEE_APP_DB_PATH=/app/data/zeebee-app.db`.

## 4. Mã nguồn

| | |
|---|---|
| Repo | GitHub `hoanglamtruong/zeebee-app` — nhánh **`main`** |
| Bản làm việc | `~/work/zeebee-app` (nhánh `app/vong-2-cua-hang`, đã gộp vào `main`) |

### Cấu trúc
```
src/middleware.ts            → phân luồng theo tên miền + 301 link Decor cũ
src/lib/catalog.ts           → DANH MỤC SẢN PHẨM: giá, mô tả, loại (download/subscription), trạng thái — sửa giá ở đây
src/lib/db.ts                → SQLite: leads, orders (+ chống gửi dồn 3 đơn/10 phút/SĐT)
src/lib/telegram.ts          → gửi Telegram (chỉ nút url https — không dùng tel:)
src/app/page.tsx             → trang chủ app: khu "Tải về dùng" + "Thuê bao online" + CTA build
src/app/san-pham/[slug]/     → chi tiết sản phẩm + form đặt (thuê bao có chọn gói tháng/năm)
src/app/build/               → form thu yêu cầu custom
src/app/cam-on/              → trang cảm ơn
src/app/he-sinh-thai/        → trang chủ zeebee.vn
src/app/api/orders/          → nhận đơn (giá tính ở server từ catalog)
src/app/api/leads/           → API form tư vấn cũ (Vòng 1) — giữ cho tương thích
deliverables/                → FILE SẢN PHẨM "Tải về dùng" để Seller gửi khách (không đóng vào image)
```

### Sản phẩm "Tải về dùng" (`deliverables/`)
| Sản phẩm | File giao khách | Cách build lại |
|---|---|---|
| zQR Offline (79k) | `zqr-offline/dist/zQR-Offline.html` + `HUONG-DAN.txt` | sửa `zqr-offline/src.html` → `./build.sh` (nhúng `qr-code-styling` MIT từ `~/work/zqr/node_modules`) |
| Sổ thu chi gia đình (49k) | `excel/dist/So-thu-chi-gia-dinh.xlsx` | `python excel/build_excel.py` (cần `openpyxl`) |
| Quản lý bán hàng shop nhỏ (149k) | `excel/dist/Quan-ly-ban-hang-shop-nho.xlsx` | như trên |
| Chấm công & tính lương (99k) | `excel/dist/Cham-cong-tinh-luong.xlsx` | như trên |

Kiểm thử đã làm: zQR quét ngược bằng jsQR (VietQR — CRC khớp tính độc lập; Wi-Fi; danh thiếp tiếng Việt có dấu). Excel tính lại bằng thư viện `formulas`: 0 lỗi, số liệu khớp tính tay. **Chưa mở thử bằng Excel/LibreOffice thật** (máy chưa cài).

## 5. Tiến trình build

| Vòng | Nội dung | Commit |
|---|---|---|
| Vòng 1 — Setup | Trang dịch vụ Build Web/Tool/App + form tư vấn (SQLite) | `4eff990` |
| Vòng 2 (11/10/2026) | Cửa hàng sản phẩm số + `/build` + `/cam-on` + Telegram; `zeebee.vn` → trang hệ sinh thái; 301 link Decor cũ; thêm route `app.zeebee.vn` | `06d02e6` |
| Vòng 3 (11/10/2026) | Phân loại Tải về dùng / Thuê bao (giá tháng/năm); build zQR Offline + 3 file Excel, mở bán | `2ca2e65`, `c512106` |

### Việc còn lại để HOÀN THIỆN
1. **Bàn giao thuê bao**: 5 app thuê bao hiện chỉ có 1 bản dùng chung — cần quyết cách cấp riêng cho từng khách (tài khoản riêng trong app hay instance riêng) trước khi có đơn thật.
2. **Game "Xếp Hình Cá Gỗ"** (tải về, 29k) — chưa build.
3. Bộ **mẫu thiết kế** (Canva/PSD) — đề xuất, cần đội content.
4. **Danh sách Seller riêng** cho app (hiện Telegram chỉ vào nhóm admin) — để báo thẳng Seller như Decor.
5. **zQR Online** chưa có link dùng thử công khai — cần route Cloudflare cho cổng 8122.
6. Trang **quản lý đơn** cho Seller (xem/đổi trạng thái `orders`) — hiện chỉ xem được bằng truy vấn SQLite.
7. Tự động giao file "Tải về dùng" (link tải có hạn sau khi xác nhận thanh toán) — khi số đơn tăng.
8. **Thành viên Zeebee** trên `zeebee.vn` (lịch sử mua, ưu đãi, tích điểm) — CEO: không gấp; định danh khách thống nhất theo **số điện thoại** để gộp đơn cũ.

## 6. Vận hành & nâng cấp

### Deploy
```bash
cd ~/work/zeebee-app
git pull
docker compose up -d --build        # gián đoạn vài giây cho cả zeebee.vn và app.zeebee.vn
```

### Thử trước khi deploy (DB riêng, không Telegram)
```bash
docker build -t zeebee-app-test .
docker run -d --name app-test -p 8231:3000 -e ZEEBEE_APP_DB_PATH=/app/data/test.db zeebee-app-test
curl -s -H 'Host: zeebee.vn' localhost:8231/ | grep -o '<title>[^<]*'      # kiểm tra phân luồng tên miền
```
Dọn: `docker rm -f app-test && docker rmi zeebee-app-test`.

### Xem đơn mới
```bash
docker exec zeebee-app node -e "const {DatabaseSync}=require('node:sqlite');const d=new DatabaseSync('/app/data/zeebee-app.db');console.table(d.prepare('select code,kind,product_slug,name,phone,status,telegram_sent,created_at from orders order by id desc limit 20').all())"
```
`telegram_sent = 0` nghĩa là Telegram gửi lỗi — liên hệ khách thủ công.

### Đổi giá / thêm sản phẩm
Sửa `src/lib/catalog.ts` (giá, mô tả, `status: "available" | "coming_soon"`, `model`) → deploy. Sản phẩm tải về mới: đặt file vào `deliverables/<tên>/dist/`.

### Sao lưu
Volume `zeebee-app_zeebee-app-data` (SQLite). **Chưa có job sao lưu tự động** — nên thêm.

## 7. Liên quan
- Onbase Decor: repo `hoanglamtruong/zbads` nhánh `main`, `docs/HANDOFF.md`
- App thuê bao gốc: zmoney (8121), zqr (8122, `~/work/zqr`), ztodo (8105), zmind (8128), zlink (8096)
- Hạ tầng tổng: skill **zinfra**
