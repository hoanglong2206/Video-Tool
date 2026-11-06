# Video AI Studio (`video-ai-demo`)

> **Hệ thống Sản xuất Video Quảng cáo Tự động bằng AI (AI-Native Video Production Studio)**  
> *Chuyển đổi yêu cầu kịch bản & hình ảnh/video của khách hàng thành video giới thiệu sản phẩm chuẩn điện ảnh 4K.*

---

## 🌟 Tổng quan Dự án

**Video AI Studio** là nền tảng sản xuất video ứng dụng AI toàn diện, tự động hóa từ khâu tiếp nhận brief, phân tích hình ảnh, tạo storyboard, bố cục phân cảnh 3D/2D, cho đến render xuất bản video hoàn thiện:
* **LLM & Prompt Builder:** Phân tích yêu cầu, bóc tách thông điệp cốt lõi, khách hàng mục tiêu và chuẩn hóa prompt sản xuất.
* **Vision AI:** Nhận diện đối tượng từ ảnh/logo khách hàng tải lên, phát hiện phong cách ánh sáng và trích xuất bảng màu thương hiệu.
* **JSON Schema Validator:** Kiểm định cấu trúc dữ liệu đầu ra đạt chuẩn 100% trước khi chuyển sang khâu dựng.
* **Pipeline Sản xuất 10 bước (Story ➔ Export):** Hỗ trợ 2 chế độ:
  1. *Phê duyệt thủ công (Human Approval)* cho từng khâu.
  2. *Tự động chuyển bước (Always Proceed)* theo đồng hồ đếm ngược.
* **Giao diện Vibe Coding chuẩn Studio:** Khóa tràn viewport (không scroll toàn trang, cuộn nội bộ), zero-typing (ưu tiên radio cards, select dropdowns, toggles) và 100% `cursor-pointer`.

---

## 📋 Yêu cầu Hệ thống (Prerequisites)

Trước khi cài đặt, hãy đảm bảo máy tính đã cài:
1. **Node.js** $\ge$ 20.x hoặc **Bun** $\ge$ 1.1
2. **Python** $\ge$ 3.11 hoặc 3.12 (khuyên dùng kèm môi trường ảo `.venv`)
3. **Git**
4. *(Tùy chọn)* **FFmpeg** & **NVIDIA GPU** (nếu render Remotion tăng tốc phần cứng)

---

## ⚙️ Hướng dẫn Cài đặt (Installation)

### Bước 1: Clone mã nguồn
```bash
git clone https://github.com/your-org/video-ai-demo.git
cd video-ai-demo
```

### Bước 2: Thiết lập file môi trường
Tạo file `.env` từ file mẫu:
```bash
cp .env.example .env
```
> **Lưu ý:** Điền chuỗi kết nối cơ sở dữ liệu `DATABASE_URL` (Supabase PostgreSQL hoặc PostgreSQL local) trong file `.env`.

### Bước 3: Cài đặt Backend (FastAPI Python)
Tạo môi trường ảo và cài đặt các thư viện phụ thuộc:

**Trên Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r server/backend/requirements.txt
```

**Trên macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r server/backend/requirements.txt
```

### Bước 4: Cài đặt Frontend (Next.js 16 Studio)
```bash
cd apps/web
bun install
# hoặc nếu dùng npm:
# npm install
cd ../..
```

---

## 🚀 Hướng dẫn Khởi chạy Dự án (Running the Studio)

### Cách 1: Khởi chạy 1-Click (Khuyên dùng)
Chạy đồng thời cả **Frontend Web Studio** và **Backend API Server**:

```bash
bun run dev
# hoặc dùng npm:
npm run dev
```

Lệnh này sẽ khởi động:
- **Frontend Studio:** `http://localhost:3000`
- **FastAPI Backend:** `http://localhost:8000`

---

### Cách 2: Khởi chạy riêng lẻ từng dịch vụ (Dành cho Debug)

#### Terminal 1: Backend API Gateway (Port 8000)
**Windows PowerShell:**
```powershell
.\.venv\Scripts\python.exe -m uvicorn server.backend.src.main:app --host 0.0.0.0 --port 8000 --reload
```

**macOS / Linux:**
```bash
source .venv/bin/activate
python -m uvicorn server.backend.src.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Terminal 2: Frontend Studio (Port 3000)
```bash
npm --prefix apps/web run dev
# hoặc:
# cd apps/web && bun run dev
```

---

## 🧹 Làm sạch Dữ liệu Database (Reset Data)

Dự án **không sử dụng mockdata/seed cứng**. Dữ liệu được tạo thực tế khi người dùng khởi tạo dự án mới trên giao diện.

Nếu bạn muốn dọn sạch toàn bộ database và cache video để bắt đầu lại từ đầu:
```bash
npm run db:clean
# hoặc chạy trực tiếp bằng python:
.\.venv\Scripts\python.exe server/backend/src/infrastructure/database/clean.py
```

---

## 🌐 Các Địa chỉ Truy cập (Endpoints)

| Dịch vụ | URL | Mô tả |
| :--- | :--- | :--- |
| **Studio Web UI** | [http://localhost:3000](http://localhost:3000) | Giao diện chính: Dashboard, Tạo dự án, Pipeline Studio |
| **Tạo mới Dự án** | [http://localhost:3000/projects/new](http://localhost:3000/projects/new) | Form nhập Brief 2 cột, chọn phong cách & phân tích AI |
| **Cài đặt Hệ thống** | [http://localhost:3000/settings](http://localhost:3000/settings) | Cấu hình chế độ duyệt, AI Models, GPU & Codec |
| **FastAPI Swagger Docs** | [http://localhost:8000/docs](http://localhost:8000/docs) | Tài liệu API tương tác trực tiếp |
| **API Health Check** | [http://localhost:8000/health](http://localhost:8000/health) | Kiểm tra trạng thái máy chủ backend |

---

## 📐 Tiêu chuẩn Giao diện & Vibe Coding

Mọi trang và component được phát triển tuân thủ nghiêm ngặt các nguyên tắc trong [GEMINI.md](GEMINI.md) và [AGENTS.md](AGENTS.md):
1. **Không scroll cửa sổ (No Global Scroll):** Khóa `overflow-hidden` cấp trang; cuộn nội bộ mượt mà ở các card con (`flex-1 min-h-0 overflow-y-auto`).
2. **Không nhảy layout (No Layout Shift):** Tooltip render qua Radix Portal; số đếm sử dụng `font-mono tabular-nums`.
3. **Thao tác 1-Click (Zero-Manual Typing):** Ưu tiên Radio Cards, Dropdown Selects và Switches thay vì nhập text.
4. **Trỏ chuột tương tác:** 100% nút bấm, thẻ và switch có `cursor-pointer`.
5. **Ngân sách file:** $\le 200$ dòng code mỗi file (tối đa 300 dòng).

---

## 📄 License

Dự án phát hành theo giấy phép **MIT License**.
