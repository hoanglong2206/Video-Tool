# Video AI Studio - Vibe Coding & UI Standards

Tài liệu này định nghĩa các nguyên tắc cốt lõi ("Vibe Coding Guidelines") bắt buộc tuân thủ cho toàn bộ dự án Video AI Demo. Bất kỳ Agent hoặc Developer nào khi phát triển giao diện (UI) hoặc logic đều phải tuân thủ các quy tắc dưới đây.

---

## 1. Nguyên tắc Khung hình (Full-Screen Viewport - Không Scroll Ngoài)
* **Khóa cuộn trang toàn cục**: Tất cả các màn hình chính (Dashboard, Studio Pipeline, Tạo mới dự án, Settings) phải vừa khít chính xác `h-screen w-screen overflow-hidden` (100% viewport). Tuyệt đối **không được để xuất hiện thanh cuộn dọc hoặc ngang ở cấp độ toàn trang (body/window)**.
* **Cố định thanh điều hướng**: Sidebar và Header phải có chiều cao/rộng cố định (`shrink-0`), ví dụ `h-12` (48px) cho header và `w-64` / `w-16` cho sidebar.
* **Khu vực nội dung chính**: Khung chứa chính luôn sử dụng công thức:
  ```tsx
  <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
  ```
* **Cuộn cục bộ (Internal Scroll Only)**: Khi danh sách dữ liệu dài ra (danh sách cảnh storyboard, gallery tài liệu upload, log render, lịch sử), **chỉ cho phép cuộn nội bộ bên trong thẻ đó**:
  ```tsx
  <div className="flex-1 min-h-0 overflow-y-auto pr-1">
  ```
  Sử dụng thanh cuộn mỏng (custom scrollbar), không làm xê dịch khung bao bên ngoài.

---

## 2. Chống Nhảy Chữ & Tràn Giao Diện (No Layout Shift / No Overflow)
* **Chống vỡ bố cục khi Hover**:
  * **Tooltip / Popover**: Tuyệt đối không dùng `absolute top-full` bên trong các flex container có `overflow-x-auto`. Luôn sử dụng Radix UI Portal (`<TooltipPrimitive.Portal>`) để render tooltip ra ngoài body DOM layer.
  * **Không biến đổi kích thước hộp**: Không dùng `scale-[1.05]` hoặc tăng border thickness làm thay đổi kích thước hộp (box-sizing) của các phần tử xung quanh trong flex/grid row. Dùng `shadow`, `ring`, hoặc đổi màu nền (`transition-colors`) để tạo hiệu ứng hover mượt mà.
* **Cố định chiều cao / chiều rộng thẻ**: Các bước pipeline, thẻ cảnh, button phải có `h-*` hoặc `min-h-*` cố định (ví dụ `h-12`, `h-14`) để khi click active hoặc hover không làm giật hàng xung quanh.
* **Phòng chống tràn chữ (Text Truncation)**:
  * Mọi tiêu đề, tên file, mô tả ngắn trong thẻ flex/grid phải đi kèm `truncate` (hoặc `line-clamp-1` / `line-clamp-2`) và container cha phải có `min-w-0`.
* **Chống giật số (Tabular Numbers)**: Các đồng hồ đếm ngược, phần trăm render, số giây phải dùng font monospace hoặc `tabular-nums` (`font-mono`) để độ rộng chữ số không bị co giãn khi thay đổi giá trị.

---

## 3. Trải Nghiệm Tương Tác 1-Click (Zero-Manual Typing)
* **Ưu tiên Click hơn Gõ phím**:
  * Thay vì bắt người dùng gõ các thông số kỹ thuật (độ phân giải, tỷ lệ, thời lượng, tên model AI, GPU, codec), luôn thiết kế dạng **Radio Cards**, **Radio Chips**, **Select Dropdowns** hoặc **Pills bấm nhanh**.
  * Cung cấp sẵn các Presets tiêu chuẩn (ví dụ 15s/30s/60s, 16:9/9:16/1:1, 1080p/4K, H.264/HEVC/ProRes). Chỉ giữ ô input nhỏ làm tùy chọn phụ nếu người dùng muốn gõ custom.
* **Toggle Switches cho tính năng Bật/Tắt**: Sử dụng Radix UI Switch cho các tùy chọn nhị phân (tự động lưu draft, chuông thông báo, tự dọn cache).

---

## 4. Bắt Buộc Hiển Thị Trỏ Chuột Tương Tác (`cursor-pointer`)
* Tất cả các phần tử có thể tương tác (Button, Card bấm được, Tab, Checkbox, Radio, Switch, Pill, Swatch màu, Dropzone, Icon xóa, Accordion) **bắt buộc phải có class `cursor-pointer`**.
* Trạng thái disabled phải có `cursor-not-allowed` và `opacity-50`.

---

## 5. Bố Cục Đa Cột Cân Đối (Balanced Studio Grid)
* Màn hình Studio và Settings ưu tiên chia lưới 2 cột (`grid grid-cols-1 lg:grid-cols-2 gap-4`) để tối ưu hóa không gian hiển thị trên màn hình 1080p / 2K / 4K.
* Cột trái dành cho nghiệp vụ nhập liệu / kịch bản; Cột phải dành cho AI Insights / Cấu hình kỹ thuật.

---

## 6. Ngân Sách Dòng Code & Tiêu Chuẩn Commit (Coding Standard)
* **Ngân sách file**: Mục tiêu $\le 200$ dòng code mỗi file, giới hạn cứng tuyệt đối là 300 dòng. Khi một view vượt quá 200 dòng, lập tức tách thành các subcomponent module nhỏ (Section, Panel, Selector).
* **Quy chuẩn Git Commit**: Bắt buộc tuân theo định dạng Conventional Commits:
  * `feat(...)`: Tính năng mới
  * `fix(...)`: Sửa lỗi giao diện / logic
  * `style(...)`: Tinh chỉnh CSS / Cursor / Token màu
  * `refactor(...)`: Tái cấu trúc mã nguồn

