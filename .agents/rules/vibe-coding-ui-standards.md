---
name: vibe-coding-ui-standards
description: Enforce zero-shift, no-overflow, full-screen viewport, zero-typing selects, and cursor-pointer standards for all frontend UI components.
trigger: always_on
---

# Vibe Coding & UI Stability Standards

Tất cả các frontend components trong dự án Video AI Demo phải tuân thủ nghiêm ngặt các quy tắc sau:

1. **Khóa tràn Viewport (No Page Overflow Scroll)**:
   - Toàn bộ trang studio, dashboard, editor phải dùng `h-screen w-screen overflow-hidden`.
   - Không cho phép thanh cuộn ở `<body>` hoặc `window`.
   - Các danh sách dài (cảnh, file upload, log) chỉ cuộn nội bộ: `flex-1 min-h-0 overflow-y-auto pr-1`.

2. **Chống Nhảy Giao Diện & Giật Chữ (No Layout Shift)**:
   - Tooltip & Popover bắt buộc dùng Radix Portal, không dùng relative/absolute nội bộ gây phình container.
   - Thẻ và nút bấm phải cố định chiều cao (`h-*`), không dùng `scale-[1.05]` gây xê dịch phần tử bên cạnh.
   - Dùng `truncate` và `min-w-0` để ngăn text đẩy tràn flex row.
   - Các con số đếm ngược / phần trăm phải dùng `font-mono tabular-nums`.

3. **Tương tác 1-Click (Zero-Manual Typing)**:
   - Ưu tiên Radio Cards, Radio Chips, Select Dropdowns, Quick-Pills, và Switches thay cho ô nhập text tự do.
   - Cung cấp sẵn Presets tiêu chuẩn 1-click.

4. **Trỏ chuột tương tác (Cursor Pointer)**:
   - Bắt buộc gắn `cursor-pointer` lên tất cả các phần tử có thể tương tác.

5. **Ngân sách mã nguồn**:
   - $\le 200$ dòng code mỗi file (tối đa 300 dòng). Tách module nhỏ khi vượt quá.

