# PAT LED Sign (PWA)

6 file đặt ngang hàng ở thư mục gốc repo: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`.

## Đưa lên GitHub Pages
1. Tạo repo mới (ví dụ `pat-led-sign`), đẩy 6 file lên thư mục gốc, không đặt trong thư mục con.
2. Settings → Pages → Branch `main`, thư mục `/ (root)` → Save.
3. Mở `https://<username>.github.io/<ten-repo>/`. Đường dẫn trong manifest và sw.js đều tương đối nên không cần sửa gì.

## Cài thử
- Android: mở link bằng Chrome → menu ⋮ → "Cài đặt ứng dụng" hoặc "Thêm vào Màn hình chính".
- Windows 11: mở link bằng Edge/Chrome → biểu tượng Cài đặt trên thanh địa chỉ (hoặc menu → Ứng dụng → Cài đặt trang này như một ứng dụng).
- Kiểm tra nhanh: DevTools → Lighthouse → chọn Progressive Web App → Analyze.
- Vẫn mở được như cũ bằng cách bấm đúp `index.html` (file://), service worker tự bỏ qua.

## Cập nhật phiên bản
Chỉ đổi `v1` → `v2` trong `CACHE_NAME` của `sw.js` và thay nội dung `index.html`. Không đổi `id`, `name`, `start_url`, `scope` và tên file icon.

## Quy tắc cùng domain
Mỗi app cài riêng đặt ở một repo riêng (scope anh em, không lồng nhau). Portal không đặt ở repo `<user>.github.io`. `id` của app này là `pat-led-sign`, cache có tiền tố `pat-led-sign-cache-`.

## Báo "Ứng dụng này đã được cài đặt rồi" nhưng không mở được
1. Xuất/sao lưu mẫu trong app trước (nút "Xuất mẫu"), không bấm nút đặt lại.
2. Cài đặt → Ứng dụng: gỡ mục "PAT LED Sign" (và portal nếu có).
3. Đóng hẳn Chrome rồi mở lại link.
4. Nếu vẫn không thấy "Cài đặt ứng dụng": kiểm tra scope và id theo mục "Quy tắc cùng domain".
5. Chỉ khi vẫn kẹt mới xoá dữ liệu Chrome hoặc cài lại Chrome. Cách này xoá luôn dữ liệu IndexedDB/localStorage của mọi app trên domain, nên bắt buộc sao lưu trước.
