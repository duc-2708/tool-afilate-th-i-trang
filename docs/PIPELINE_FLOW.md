# QUY TRÌNH MULTI-AGENT FASHION VIDEO PIPELINE

> **Mục tiêu**: Xây dựng quy trình tự động hóa sản xuất video thời trang AI theo cơ chế Multi-Agent có trạm kiểm duyệt chất lượng (Quality Gate) và cơ chế chống lặp lỗi / kiểm soát chi phí.

---

## 1. QUY ƯỚC LÀM VIỆC & DUYỆT TIẾN ĐỘ

1. **Tuần tự từng bước**: Thực hiện từng Task cụ thể theo thứ tự, không nhảy cóc hay gộp nhiều task lớn cùng lúc.
2. **Nghiệm thu từng chặng**: Mỗi khi hoàn thành xong 1 Task, dừng lại báo cáo kết quả kiểm thử cho User.
3. **Tick hoàn thành**: Chỉ khi User kiểm tra, xác nhận "OK/Duyệt" thì mới đánh dấu tick `[x]` vào checklist tài liệu này và chuyển sang Task tiếp theo.
4. **Không xung đột**: Mỗi module code viết đúng trách nhiệm, ≤ 150 dòng/file, có `// @purpose:` ở dòng 1.

---

## 2. CHECKLIST TIẾN ĐỘ THỰC HIỆN

### PHẦN 1: NỀN TẢNG CƠ SỞ DỮ LIỆU & STATE MACHINE ENGINE (BACKEND)
- [x] **Task 1.1**: Nâng cấp SQLite `schema.sql` (thêm các trường: `stage`, `keyframe_url`, `critic_verdict`, `critic_feedback`, `retry_count`, `error_code`, `error_detail`).
- [x] **Task 1.2**: Định nghĩa hằng số luồng (`PIPELINE_STAGES`, `CRITIC_VERDICTS`, `ERROR_CODES`) trong `packages/shared`.
- [x] **Task 1.3**: Thiết kế bộ điều phối trạng thái State Machine trong `apps/server/src/modules/queue/worker.js` chuyển tiếp mượt mà qua các chặng.

### PHẦN 2: BỘ BA AGENT LOGIC (SCOUT - PROMPTER - CRITIC)
- [x] **Task 2.1**: Module `trend.scout.js` (Agent 1: Thu thập & phân tích mẫu pose/nhịp catwalk từ video thịnh hành TikTok/Douyin).
- [x] **Task 2.2**: Module `fashion.prompter.js` (Agent 2: Soạn prompt sinh ảnh keyframe giữ nét trang phục và prompt video 8s chuyển động).
- [x] **Task 2.3**: Module `fashion.critic.js` (Agent 4: Kiểm duyệt 3 lớp: Soi ảnh -> Soi clip 8s -> Soi video tổng; cơ chế auto-retry tối đa 2 lần).

### PHẦN 3: ENGINE SINH ẢNH, VIDEO & DỰNG PHIM (GENERATOR & EDITOR)
- [x] **Task 3.1**: Module `image.provider.js` (Agent 3: Sinh ảnh Keyframe người mẫu mặc trang phục chuẩn tỷ lệ).
- [x] **Task 3.2**: Module `veo.provider.js` (Agent 5: Sinh clip chuyển động 8s theo prompt camera và chuyển động dáng).
- [x] **Task 3.3**: Module `video.editor.js` (Agent 6: Ghép nối phân cảnh, chèn nhạc catwalk BGM, hòa âm và xuất MP4).

### PHẦN 4: HỆ THỐNG XỬ LÝ LỖI, HẠN MỨC & TẠM DỪNG (BUDGET & ERROR SHIELD)
- [x] **Task 4.1**: Bộ bắt lỗi chi tiết (hết token, tài khoản cạn số dư, lỗi provider) và chuyển trạng thái `paused_needs_action`.
- [x] **Task 4.2**: API tương tác tiếp tục luồng (`/api/videos/:id/resume`, `/api/videos/:id/override`).

### PHẦN 5: GIAO DIỆN AGENT TIMELINE & ĐIỀU KHIỂN (FRONTEND)
- [x] **Task 5.1**: Nâng cấp UI Form: khu vực nạp tài nguyên người mẫu + trang phục và tùy chọn link video mẫu TikTok/Douyin.
- [x] **Task 5.2**: Xây dựng Timeline Stepper trực quan hiển thị hoạt động thời gian thực của từng Agent qua từng chặng.
- [x] **Task 5.3**: Bảng hiển thị kết quả kiểm duyệt của Agent Critic (Lý do đạt/chưa đạt, ảnh so sánh lỗi) & Nút điều khiển tương tác.
- [x] **Task 5.4**: Modal Cài đặt API Tokens (Google Gemini, Veo 3, Banana Pro...) kèm tính năng Kiểm tra kết nối (Test connection).

### PHẦN 6: KIỂM THỬ TÍCH HỢP ĐẦU CUỐI (END-TO-END VERIFICATION)
- [x] **Task 6.1**: Chạy kiểm thử luồng hoàn chỉnh từ lúc nhập ảnh -> duyệt ảnh -> sinh clip 8s -> duyệt video -> xuất file hoàn thiện.
- [x] **Task 6.2**: Kiểm thử ca tự sửa lỗi (Critic từ chối và AI tự render lại kịch bản sát hơn) và ca báo lỗi cho user khi hết hạn mức.

---

## 3. BẢNG MÃ LỖI & PHẢN HỒI HỆ THỐNG

| Mã lỗi | Nguyên nhân | Hành vi hệ thống | Hướng xử lý của User |
| :--- | :--- | :--- | :--- |
| `ERR_INSUFFICIENT_FUNDS` | Tài khoản API hết tiền | Tạm dừng pipeline, bảo toàn ảnh/clip đã xong | Nạp tiền vào API rồi nhấn "Tiếp tục" |
| `ERR_TOKEN_EXCEEDED` | Prompt hoặc ngữ cảnh vượt token | Tự động tóm tắt hoặc báo lỗi | Rút ngắn mô tả hoặc tiếp tục |
| `ERR_CRITIC_REJECTED_MAX` | Critic từ chối 2 lần liên tiếp | Dừng lại xin chỉ thị user | Duyệt ép buộc (Override) hoặc sửa prompt |
| `ERR_RENDER_FAILED` | Lỗi máy chủ sinh video | Ghi nhận log chi tiết | Bấm Thử lại (Retry) chặng đó |
