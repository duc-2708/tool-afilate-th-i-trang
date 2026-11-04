# AGENTS.md

## 1. Dự án
- VideoStudio: Ứng dụng tạo video thời trang AI từ ảnh và prompt (Vue 3, Node/Express, SQLite).

## 2. Lệnh vận hành
- Cài đặt: `npm install`
- Chạy dev: `npm run dev` (chạy song song server và web)
- Build: `npm run build`
- Kiểm thử: `npm run test`

## 3. Quy ước cốt lõi
- Chuẩn module: ESM (`"type": "module"`), JavaScript + JSDoc rõ ràng, không dùng TypeScript.
- Đặt tên: kebab-case cho folder, camelCase/PascalCase cho file; tên rõ vai trò (vd: `videos.repo.js`).
- Cấu trúc file: dòng đầu bắt buộc `// @purpose: <mô tả ngắn>`, mỗi file ≤ 150 dòng (tối đa 200).
- Mã lỗi API: `{ "success": false, "code": "ERR_CODE", "message": "Chi tiết" }`.
- Dùng chung: schema/constant chỉ để ở `packages/shared`, cấm copy sang web/server.

## 4. Cách tìm code
- BẮT BUỘC đọc `docs/CODEMAP.md` trước để định vị file, KHÔNG quét cả repo hay đọc cả thư mục.
- Tra cứu danh sách và đặc tả endpoint API tại `docs/API.md`.

## 5. Luật làm việc cho Agent
1. Bắt đầu: đọc AGENTS.md rồi docs/CODEMAP.md. KHÔNG liệt kê/đọc cả thư mục.
2. Cần tìm gì thì grep trước, chỉ mở đúng file/đoạn liên quan, ưu tiên đọc theo dải dòng.
3. Không đọc lại file đã đọc trong cùng phiên nếu chưa bị sửa.
4. Sửa bằng patch nhỏ (edit đúng đoạn), không viết lại cả file nếu chỉ đổi vài dòng.
5. Không bao giờ mở: node_modules, dist, storage, lockfile, *.sqlite, file video/ảnh.
6. Thêm/xóa/đổi vai trò file thì cập nhật docs/CODEMAP.md; đổi endpoint thì cập nhật docs/API.md.
7. Báo cáo cuối mỗi bước: ≤ 10 dòng (đã sửa file nào, cách chạy thử). Không dán lại code đã viết.
8. Thấy file > 200 dòng thì tách ngay trước khi thêm code mới.
