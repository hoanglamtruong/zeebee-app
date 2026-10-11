# CLAUDE.md — Agent phụ trách onbase **Zeebee App** (`app.zeebee.vn` + `zeebee.vn`)

Bạn là agent **riêng** của onbase này. Mỗi onbase (website/app/game) trong hệ sinh thái Zeebee có một agent phụ trách,
đi qua 3 giai đoạn **Cài đặt → Xây dựng → Vận hành**. Onbase này: Cài đặt xong; đang **Xây dựng** (4/5 sản phẩm tải về đã bán).

## Đọc trước khi làm bất cứ việc gì
1. `docs/HANDOFF.md` — hiện trạng: phân luồng 2 tên miền, hạ tầng, sản phẩm & file giao khách, deploy, việc còn lại.
2. `docs/HISTORY.md` — lịch sử `zeebee.vn` (đổi chủ 4 lần), quyết định CEO (Tải về dùng ưu tiên / Thuê bao / Custom), bài học.
3. `~/zeebee/docs/HANDOFF.md` — bức tranh hệ sinh thái, hạ tầng chung, vấn đề còn mở.

## Phạm vi
- Repo GitHub `hoanglamtruong/zeebee-app` (`main`), bản làm việc `~/work/zeebee-app`, container `zeebee-app` (cổng 8131).
- Onbase này phục vụ **cả `zeebee.vn`** (trang hệ sinh thái) — sửa trang đó ảnh hưởng mọi onbase khác vì nó dẫn khách tới họ.
  Thẻ giới thiệu onbase khác trên `/he-sinh-thai`: đổi nội dung thì báo CEO.
- Không sửa code onbase khác (Decor, Ads, Owner, Bấm Huyệt, các app thuê bao gốc zmoney/zqr/ztodo/zmind/zlink).

## Quy tắc bất biến
- Giá, mô tả, loại sản phẩm chỉ sửa ở `src/lib/catalog.ts`; giá luôn do **server** tính.
- Mô tả sản phẩm phải **khớp tính năng thật** — kiểm tra app/file trước khi viết.
- Sản phẩm **Tải về dùng** phải chạy được trên máy khách, không phụ thuộc máy chủ Zeebee. File giao khách để trong `deliverables/<tên>/dist/`
  (không đóng vào image). Kiểm thử thật trước khi chuyển `status: "available"`.
- Middleware phân luồng theo Host: giữ 301 các link Decor cũ; thử bằng `curl -H 'Host: zeebee.vn'` trên cổng phụ trước khi deploy.
- Thử trên **cổng phụ** với DB riêng, không Telegram. Commit trước, deploy sau.
- Telegram inline button **không `tel:`**. Route/DNS Cloudflare chỉ sửa trên **Dashboard**. Không ghi token/mật khẩu vào code, tài liệu hay chat.

## Khi xong một vòng việc
1. Thêm mục vào `docs/HISTORY.md`. 2. Cập nhật `docs/HANDOFF.md`. 3. Báo cáo vòng trong `docs/reports/` nếu là vòng lớn.
4. Cập nhật dòng App trong bảng `~/zeebee/docs/HANDOFF.md`.
