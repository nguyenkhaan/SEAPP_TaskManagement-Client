# TỔNG QUAN DỰ ÁN 
## 1. Cấu trúc thư mục 
# 🗂️ Cấu trúc thư mục dự án React

```md
project/
├── index.html               # 🔹 File HTML chính
├── src/                     # 📁 Thư mục chứa mã nguồn
│   ├── assets/              # 🖼️ Hình ảnh, logo, icon tĩnh của UI
│   ├── components/          # ⚙️ Component tái sử dụng, chia theo loại (button, card, menu,...)
│   ├── hooks/               # 🪝 Custom hooks
│   ├── layouts/             # 🧩 Các layout component (vd: Header + Footer bọc quanh các trang)
│   ├── lib/                 # 📚 Cấu hình / dữ liệu cần khi sử dụng thư viện ngoài
│   ├── pages/               # 🖥️ Code riêng cho từng trang (home, dashboard, blog,...)
│   │   └── components/      # 🔸 Component chỉ dùng trong trang cụ thể
│   ├── router/              # 🗺️ Cấu hình React Router
│   ├── services/            # 🔌 Hàm giao tiếp với server (API service)
│   ├── styles/              # 🎨 File CSS / SCSS / Tailwind config
│   └── utils/               # 🧮 Các hàm tiện ích (pure function)
```

## 2. Khởi động dự án 
- Chạy lệnh `npm run dev`

## 5. Note trong quá trình làm 
### 5.1. 
Chỉnh sửa lại bố cục của thẻ body và thẻ root (Nếu khởi tạo theo cách này thì thẻ root mặc định căn giữa, nền thẻ body màu đen...). Vào file `App.css` và `index.css` để chỉnh sửa 
### 5.1. Gói hỗ trợ làm biểu đồ
`npm install @mui/x-charts`
### 5.2. Làm cho phần viền tràn landing page 
``