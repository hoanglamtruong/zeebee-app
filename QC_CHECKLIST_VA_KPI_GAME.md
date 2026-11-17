# BỘ TIÊU CHUẨN QC CHECKLIST & KPI SẢN XUẤT GAME PWA — APP.ZEEBEE.VN

> **Mục đích tài liệu:** Tài liệu chuẩn hóa dành cho đội ngũ Coder & QC đối chiếu trước, trong và sau khi code/nâng cấp bất kỳ tựa game nào trong kho **Zeebee Game Vault (15 Game PWA Đa Nền Tảng)**.  
> **Nguyên tắc bắt buộc (Zero-Tolerance):**
> 1. **Tuyệt đối không dùng các từ:** *"Free"*, *"Miễn phí"*, *"0đ"*, *"0 đồng"* trên giao diện.
> 2. **100% chuẩn PWA (Web App):** Chạy mượt trên cả **iPhone (Safari iOS)**, **Android (Chrome)** và **Desktop**; hỗ trợ lưu ra màn hình chính (Add to Home Screen) và chạy Offline qua Service Worker.
> 3. **Đảm bảo đủ 3 trụ cột:** Gameplay cuốn hút không lỗi logic + Chế độ chơi linh hoạt (AI / 2 Người 1 Máy / Phòng Online 4 Số) + Tích hợp kiếm tiền tự nhiên (Banner tài trợ & Nhiệm vụ Affiliate mở khóa VIP/Mạng chơi).

---

## PHẦN 1: BỘ CHỈ SỐ KPI CHO MỖI TỰA GAME (GAME KPIs)

Các coder khi tối ưu game phải đảm bảo đạt các ngưỡng chỉ số kỹ thuật và sản phẩm sau:

### 1.1. KPI Kỹ thuật & Hiệu năng (Technical KPIs)
| Chỉ số KPI | Ngưỡng chuẩn bắt buộc | Cách đo lường / Kiểm tra |
| :--- | :--- | :--- |
| **Thời gian mở vào bàn chơi (Time-to-Play)** | **< 1.0 giây** | Bấm nút *"Vào Chơi Ngay"* là hiện bàn chơi tức thì, không có màn hình loading rườm rà. |
| **Tốc độ khung hình (Frame Rate)** | **60 FPS ổn định** | Kiểm tra trên điện thoại tầm trung với các game Canvas (Pong, Bắn Thiên Thạch, Đặt Bom) không bị giật/drop frame. |
| **Dung lượng tài nguyên (Asset Size)** | **< 50 KB / game** | Ưu tiên đồ họa Vector SVG, CSS Gradient và HTML5 Canvas thuần; không nhúng ảnh PNG/JPG hay thư viện ngoài nặng nề. |
| **Khả năng chạy Offline (PWA Cache)** | **100% hoạt động** | Mở game 1 lần $\rightarrow$ Bật chế độ Máy bay (Airplane Mode) $\rightarrow$ Tải lại trang vẫn chơi bình thường với AI hoặc 2 người 1 máy. |
| **Lỗi Runtime / TypeScript** | **0 Error, 0 Crash** | Vượt qua `next build` nghiêm ngặt và không phát sinh lỗi đỏ trong DevTools Console suốt 15 phút chơi liên tục. |

### 1.2. KPI Trải nghiệm & Giữ chân người chơi (Gameplay & Retention KPIs)
| Chỉ số KPI | Mục tiêu | Yêu cầu thiết kế dành cho Coder |
| :--- | :--- | :--- |
| **Thời gian hiểu luật (Time-to-Understand)** | **< 5 giây** | Nhìn vào bàn cờ là biết bấm vào đâu ngay; có dòng trạng thái ngắn gọn hướng dẫn lượt đi tiếp theo. |
| **Độ dài trung bình 1 ván (Match Duration)** | **1 – 3 phút / ván** | Nhịp độ nhanh, kịch tính, phù hợp giải trí nhanh tại quán cafe, giờ nghỉ trưa hoặc trên xe. |
| **Tỷ lệ chơi lại (Replayability)** | **> 3 ván / phiên** | Khi kết thúc ván phải có thông báo Thắng/Thua nổi bật và nút **"Ván Mới / Chơi Lại"** 1 chạm ngay tại chỗ. |

### 1.3. KPI Kiếm tiền (Monetization & Affiliate KPIs)
| Chỉ số KPI | Mục tiêu | Yêu cầu tích hợp trong Code |
| :--- | :--- | :--- |
| **Hiển thị Banner Nhà Tài Trợ (Ad Viewability)** | **100% phiên chơi** | Có mặt ở đầu và cuối khung Arena, hiển thị sắc nét, không đè lên vùng điều khiển cảm ứng của người chơi. |
| **Điểm chạm Nhiệm vụ (Offerwall Trigger)** | **Đúng lúc có nhu cầu thực** | Kích hoạt khi: (1) Hết `3 ❤️` mạng chơi, hoặc (2) Bấm vào nút kỹ năng/vật phẩm đặc quyền có biểu tượng `🔒 VIP`. |
| **Tỷ lệ hoàn tất mở khóa VIP** | **100% không lỗi state** | Sau 5 giây đếm ngược xem link đối tác $\rightarrow$ Cộng ngay **+5 ❤️** và bật `vipUnlocked = true` **mà không làm mất ván cờ đang chơi dở**. |

---

## PHẦN 2: CHECKLIST QC CHUNG CHO TẤT CẢ CÁC GAME (CORE QC CHECKLIST)

Mỗi coder trước khi bàn giao bất kỳ game nào phải tự đánh dấu kiểm tra (Pass) toàn bộ 4 hạng mục dưới đây:

### 2.1. Kiểm tra Giao diện & Cảm ứng Di động (Mobile UI/UX)
- [ ] **Responsive chuẩn Mobile First:** Kiểm tra trên khung hình `375x667` (iPhone SE), `390x844` (iPhone 14) và `412x915` (Android) — bàn cờ nằm gọn trong màn hình, không bị tràn ngang.
- [ ] **Chống cuộn nhầm khi vuốt (`touch-none`):** Với các game vuốt liên tục (Pong, Bắn Thiên Thạch), khi ngón tay di chuyển trên bàn đấu, trang web không bị cuộn lên/xuống hoặc kéo làm mới trang (Pull-to-refresh).
- [ ] **Phản hồi thị giác (Visual Feedback):** Nước đi vừa đánh, quân cờ đang chọn, hoặc đường ăn điểm phải có màu sắc/hiệu ứng phát sáng phân biệt rõ với các ô khác.
- [ ] **Kiểm duyệt ngôn từ:** Tuyệt đối không có chữ *"Free"*, *"Miễn phí"*, *"0đ"* ở bất cứ nhãn hay thông báo nào.

### 2.2. Kiểm tra 3 Chế độ chơi (Multi-Mode Verification)
- [ ] **Chế độ `🤖 Đấu Máy / Solo`:**
  - [ ] Máy tự động đi sau `300ms – 500ms` (có độ trễ vừa phải để người chơi kịp nhìn nước đi).
  - [ ] Máy không đi đè lên ô đã có quân, không tự đi tiếp khi ván đấu đã có người thắng.
- [ ] **Chế độ `📱 2 Người 1 Máy`:**
  - [ ] Chuyển lượt chuẩn xác giữa Người chơi 1 (P1) và Người chơi 2 (P2).
  - [ ] Với game cần giấu bài (Oẳn Tù Tì, Hải Chiến): Khi P1 chọn xong phải ẩn lựa chọn (`🔒`) trước khi P2 bấm.
- [ ] **Chế độ `🌐 Phòng Online`:**
  - [ ] Tạo được mã phòng 4 chữ số ngẫu nhiên (VD: `#8492`).
  - [ ] Nút **Chép Link Mời** sao chép đúng URL có kèm `?room=XXXX`.
  - [ ] Nút **Mã QR** hiển thị đúng ảnh QR code để máy thứ 2 quét vào thẳng phòng.
  - [ ] Khi 2 tab/2 máy cùng mã phòng: Nước đi và nút "Ván mới" đồng bộ chính xác.

### 2.3. Kiểm tra Cơ chế Mạng (`❤️`) & Đặc quyền VIP (Affiliate Offerwall)
- [ ] Bắt đầu game luôn có mặc định `3 ❤️` (hoặc `5 ❤️` nếu đã từng mở khóa VIP trong `localStorage`).
- [ ] Khi người chơi thua 1 hiệp/mất mạng: Số mạng giảm đi `1` (`lives - 1`).
- [ ] Khi số mạng về `0`: Hiển thị banner cảnh báo **"Bạn Đã Hết Lượt Mạng Chơi"** kèm nút làm nhiệm vụ hồi sinh `+5 ❤️`.
- [ ] Khi chưa mở VIP (`vipUnlocked === false`), nút kỹ năng đặc biệt hiển thị biểu tượng `🔒`. Bấm vào nút đó phải bật ngay modal **Nhiệm Vụ Đối Tác**.
- [ ] Sau khi bấm xem link đối tác và đếm ngược 5 giây thành công:
  - [ ] Nút kỹ năng mất biểu tượng `🔒` và dùng được ngay lập tức.
  - [ ] Lưu trạng thái vào `localStorage` (`zb_unlocked_<slug>`) để lần sau vào lại vẫn giữ đặc quyền VIP.

### 2.4. Kiểm tra Chống lỗi thao tác nhanh (Anti-Bug & Edge Cases)
- [ ] **Chống Spam Click:** Bấm liên tiếp 5 lần vào cùng 1 ô cờ trong lúc chờ AI nghĩ không làm AI đánh 5 lần hoặc làm hỏng lượt đi.
- [ ] **Xử lý Hòa cờ / Hết nước đi:** Khi bàn cờ đầy hoặc không còn nước đi hợp lệ, game phải thông báo Hòa hoặc kết thúc ván và cho phép bấm "Ván Mới".
- [ ] **Dọn dẹp bộ nhớ (Cleanup):** Khi thoát khỏi game (`unmount`), mọi `requestAnimationFrame`, `setInterval`, `setTimeout`, và `BroadcastChannel` phải được hủy sạch sẽ, không gây rò rỉ bộ nhớ (memory leak).

---

## PHẦN 3: CHECKLIST NGHIỆM THU CHI TIẾT CHO TỪNG TỰA GAME (15 GAME SPECS)

Coder phụ trách tựa game nào phải đối chiếu đúng từng gạch đầu dòng của tựa game đó:

### TẦNG 1: NHÓM ĐỐI KHÁNG 2 NGƯỜI (PVP)

#### 01. Cờ Ca Rô (`game-tic-tac-toe-pro`)
- [ ] Bàn cờ lưới `13x13` rõ nét, chấm đánh dấu nước đi cuối cùng để người chơi dễ theo dõi.
- [ ] Luật thắng: Đủ 5 quân liên tiếp theo hàng ngang, dọc, hoặc chéo — tô sáng (highlight) đúng 5 quân chiến thắng.
- [ ] AI biết chặn chuỗi 3, chuỗi 4 của người chơi và biết tự tạo chuỗi 5.
- [ ] **Tính năng VIP cần test:**
  - [ ] *Hoàn tác (Undo):* Lùi lại đúng nước vừa đi (nếu đấu AI thì lùi cả nước của AI và người).
  - [ ] *Gợi ý AI (Hint):* Nhấp nháy ô có điểm chiến thuật cao nhất trên bàn cờ.

#### 02. Đấu Tàu Chiến Hải Quân (`game-battleship-duel`)
- [ ] Hiển thị 2 lưới: Lưới Radar đối phương (`8x8`) để bấm khai hỏa và Lưới Hạm đội của mình (`8x8`).
- [ ] Dàn trận ngẫu nhiên 4 tàu (`kích thước 4, 3, 3, 2` — tổng 12 ô tàu) không chồng lấn, không tràn biên.
- [ ] Bắn trúng (`💥`) được bắn tiếp lượt nữa; bắn trượt (`•`) chuyển lượt cho đối phương phản kích.
- [ ] **Tính năng VIP cần test:** Nút *Quét Radar* phát hiện và đánh dấu chính xác `📡` lên 1 ô có tàu địch chưa bị bắn.

#### 03. Oẳn Tù Tì Phản Xạ (`game-rock-paper-scissors`)
- [ ] Có đủ 3 chiêu: Búa (`✊`), Bao (`✋`), Kéo (`✌️`) với phân định Thắng - Hòa - Thua chuẩn xác.
- [ ] Chế độ 2 Người 1 Máy: Khi P1 chọn chiêu, màn hình chỉ hiện `🔒` cho đến khi P2 chọn xong mới đồng loạt lật mở kết quả.
- [ ] **Tính năng VIP cần test:** Nút *Bật Khiên Chắn Thua* giúp miễn trừ mất điểm và không bị trừ mạng trong 1 hiệp thua kế tiếp.

#### 04. Đố Vui Trí Tuệ Đối Kháng (`game-quiz-duel`)
- [ ] Bộ câu hỏi hiển thị rõ ràng, 4 đáp án A/B/C/D, chọn đúng tô màu xanh lá + cộng 10 điểm, chọn sai tô màu đỏ + báo đáp án đúng.
- [ ] Chế độ 2 Người 1 Máy: Luân phiên đổi lượt trả lời giữa P1 và P2, bảng điểm tách biệt.
- [ ] **Tính năng VIP cần test:** Nút *Trợ giúp 50/50* ẩn đi chính xác 2 phương án sai của câu hỏi hiện tại.

#### 05. Party Pack 4-in-1 (`game-bluetooth-party-pack`)
- [ ] Chuyển đổi mượt giữa các tab: *Vòng Quay Thử Thách*, *Bom Số (1–100)* và *Thẻ Bài VIP*.
- [ ] Ở game *Bom Số*: Giới hạn khoảng `[min, max]` tự động thu hẹp sau mỗi lần đoán; đoán trúng số bí mật phải nổ bom `💥` và cho phép tạo ván mới.
- [ ] **Tính năng VIP cần test:** Mở khóa tab *Thẻ Bài Bàn Tiệc VIP*.

---

### TẦNG 2: NHÓM HỢP TÁC & ARCADE 60FPS (CO-OP & ARCADE)

#### 06. Bóng Bàn Pong Đối Kháng (`game-pong-bluetooth`)
- [ ] Vật lý bóng nảy chuẩn: Góc nảy phụ thuộc vào vị trí bóng chạm vào thanh vợt (chạm rìa vợt bóng đi chéo gắt hơn), tốc độ tăng nhẹ sau mỗi lần đỡ.
- [ ] Hỗ trợ cảm ứng đa vùng: Vuốt nửa dưới điều khiển vợt P1, ở chế độ 2 người vuốt nửa trên điều khiển vợt P2.
- [ ] Có nút *Tạm dừng / Tiếp tục* hoạt động chuẩn.
- [ ] **Tính năng VIP cần test:** Nút *Kích hoạt Vợt Siêu Rộng* tăng chiều dài thanh đỡ của người chơi thêm 40% và đổi màu vợt sang Vàng Hoàng Gia.

#### 07. Giải Mã Mê Cung Co-op (`game-coop-escape`)
- [ ] Có 2 nhân vật độc lập (`🔵 A` và `🟢 B`), nút chuyển đổi điều khiển giữa A và B hoạt động nhạy.
- [ ] Logic giải đố: Phải có ít nhất 1 nhân vật dẫm lên công tắc điện (`⚡`) để mở cổng chắn laser (`🚧`), đưa cả 2 nhân vật tới cổng thoát (`🚪`) để qua màn.
- [ ] **Tính năng VIP cần test:** Đặc quyền *Đi Xuyên Tường / Mở Cổng VIP* giúp mở toang cổng laser và đi xuyên chướng ngại vật.

#### 08. Thủ Thành Duo Co-op (`game-tower-defense-duo`)
- [ ] Hiển thị đầy đủ: Vàng hiện có, Đợt quái (Wave), Máu của Thành (`10/10`), và 8 ô đặt tháp pháo.
- [ ] Cho phép chọn ô đất trống để xây mới hoặc chọn ô đã có tháp để nâng cấp Level (`Lv.1 -> Lv.2 -> Lv.3`).
- [ ] Tính toán hỏa lực từng đợt quái rõ ràng: Thắng đợt quái thưởng thêm Vàng, thua đợt quái trừ máu Thành.
- [ ] **Tính năng VIP cần test:** Mở khóa *Tháp Plasma VIP* (sát thương cao nhất) và nút nhận *Tiếp tế +500 Vàng*.

#### 09. Đặt Bom Chiến Thuật (`game-bomber-grid`)
- [ ] Bản đồ có phân biệt: Tường đá cố định (không thể phá) và Tường gạch (đặt bom phá được để mở đường + cộng điểm).
- [ ] Quả bom đặt xuống có thời gian đếm ngược kích nổ, tia lửa phóng ra 4 hướng ngang/dọc và tự dừng lại khi gặp tường đá.
- [ ] **Tính năng VIP cần test:** Nút *Bom Lửa Dài VIP* nâng tầm nổ từ 1 ô lên 3 ô mỗi hướng.

#### 10. Bắn Thiên Thạch Không Gian (`game-asteroid-coop`)
- [ ] Phi thuyền di chuyển ngang mượt theo ngón tay vuốt, tự động bắn đạn liên thanh.
- [ ] Thiên thạch rơi từ trên xuống với kích thước/tốc độ khác nhau; bắn trúng thiên thạch nổ và cộng điểm, để thiên thạch lọt qua đáy màn hình bị trừ mạng.
- [ ] **Tính năng VIP cần test:** Nâng cấp từ *Pháo Đơn* lên *Pháo Laser Đôi VIP* (bắn 2 luồng đạn vàng song song).

---

### TẦNG 3: NHÓM BOARDGAME & TRÍ TUỆ CỔ ĐIỂN (BOARD & PUZZLE)

#### 11. Cờ Cá Ngựa (`game-ludo-lite`)
- [ ] Đổ xúc xắc ngẫu nhiên từ `1` đến `6`. Phải đổ ra `6` mới được xuất ngựa từ chuồng ra ô khởi hành (hoặc được đổ thêm lượt).
- [ ] Hiển thị tiến độ số ngựa đã về đích (`/4`) của từng đội trên đường đua.
- [ ] **Tính năng VIP cần test:** Nút *Xúc Xắc Ra 6 VIP* giúp đổ chắc chắn ra mặt 6 điểm để xuất chuồng hoặc bứt tốc.

#### 12. Xếp Hình Gỗ 8x8 (`game-block-puzzle`)
- [ ] Lưới gỗ `8x8` kiểm tra va chạm chuẩn: Chỉ cho phép đặt khối gỗ khi toàn bộ các ô của khối đó nằm trong bàn cờ và chưa có gỗ.
- [ ] Tự động xóa và cộng điểm thưởng Combo khi bất kỳ hàng ngang hoặc cột dọc nào được lấp kín đủ 8 ô.
- [ ] **Tính năng VIP cần test:** Nút *Búa Phá Bảng VIP* giúp dọn sạch các khối gỗ đang làm kẹt bàn cờ.

#### 13. Nối Thú Onet Cổ Điển (`game-animal-connect`)
- [ ] Bảng thú cưng có số lượng chẵn theo từng cặp giống nhau, bấm chọn 2 hình giống nhau sẽ ăn điểm và làm trống 2 ô đó.
- [ ] Có nút tạo *Ván mới* khi muốn chơi lại.
- [ ] **Tính năng VIP cần test:** Nút *Tự Động Nối 1 Cặp Thú VIP* tự tìm và ăn ngay 1 cặp thú giống nhau trên bàn.

#### 14. Cờ Tào Cáo Dân Gian (`game-backgammon`)
- [ ] Bàn cờ đối xứng không cân bằng: 1 quân Cáo (`🦊`) đối đầu với đội quân Thợ săn (`⚪`).
- [ ] Chọn quân Thợ săn và bấm ô trống liền kề để di chuyển khép góc; sau mỗi bước đi của người chơi, Cáo tự động tìm ô trống xung quanh để lách. Khi Cáo hết ô trống để đi là người chơi Chiến thắng.
- [ ] **Tính năng VIP cần test:** Nút *Gọi Thêm Quân Vây Cáo VIP* bổ sung thêm quân cờ hỗ trợ trên bàn.

#### 15. Lật Hình Trí Nhớ (`game-memory-match`)
- [ ] Bàn cờ `4x4` (8 cặp biểu tượng xáo trộn ngẫu nhiên). Mỗi lượt chỉ cho phép lật tối đa 2 thẻ: giống nhau thì giữ mở vĩnh viễn, khác nhau thì tự động úp lại sau `650ms`.
- [ ] Đếm chính xác số lượt lật và số cặp đã mở (`/8`).
- [ ] **Tính năng VIP cần test:** Nút *Nhìn Xuyên Thấu Toàn Bảng* lật mở toàn bộ các lá bài trên bàn trong `2.5 – 3 giây` rồi úp lại.

---

## PHẦN 4: QUY TRÌNH 4 BƯỚC NGHIỆM THU TRƯỚC KHI MERGE CODE (DoD)

Mỗi Coder trước khi push code lên nhánh `main` bắt buộc thực hiện 4 bước sau:

1. **Bước 1 — Quét từ khóa cấm:**
   ```bash
   grep -rniE "miễn phí|mien phi|\bfree\b|0đ|0 đ" src/
   ```
   *(Kết quả trên các file giao diện khách hàng phải bằng 0).*

2. **Bước 2 — Kiểm tra Build & Type-check trong Docker:**
   ```bash
   docker build -t zeebee-qc-test .
   ```
   *(Phải đạt `FINISHED` với `exit code 0`, không có lỗi TypeScript).*

3. **Bước 3 — Test thực tế luồng Kiếm tiền (Monetization Flow):**
   - Mở game bất kỳ tại `/choi-game/<slug>` $\rightarrow$ Bấm vào nút tính năng có khóa `🔒` $\rightarrow$ Bấm chọn 1 nhiệm vụ đối tác $\rightarrow$ Chờ hết 5 giây $\rightarrow$ Xác nhận game mở khóa `VIP ĐÃ MỞ` và cộng thêm `+5 ❤️`.

4. **Bước 4 — Test thực tế luồng Đa người chơi (Multiplayer Flow):**
   - Mở tab 1 tại `/choi-game/<slug>`, chuyển sang chế độ **Phòng Online**, lấy mã phòng 4 số.
   - Mở tab 2 nhập mã phòng 4 số đó $\rightarrow$ Xác nhận thông báo *"Người chơi 2 đã vào phòng"* và đánh thử 3 nước đi liên tiếp.
