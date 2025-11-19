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
### 5.3. File layout 
- Layout là file để các page có thể sử dụng trong trường gợp 1 cấu trúc dược tái sử dụng nhiều lần 

Cách làm file layout: 
- Tạo một file layout.jsx, hàm đó nhận vào 1 tham số chilren chính là page mà ta muốn hiển thị 
```js
function Layout({children}) 
{
    return (
        <Navbar /> 
            {children} 
        <Footer />
    )
}
```

- Sau này nếu page nào muốn dùng layout này thì ta gọi Layout và truyền children vào 

```js 
<Layout>
    {component....} 
<Layout />
```



### 5.4. Cách làm lightmode và darkmode 
B1. Tải cái toggle Button về và viết thêm hàm. Khi button đổi thì set Attribute trong thẻ body lại thành light. Khi button 
tắt thì set Settribute trong thẻ body lại thành dark 


```css
.for_light_theme {
  --primary-color: #302ae6; 
  --secondary-color: #536390; 
  --font-color: #424242; 
  --bg-color: #fff; 
  --heading-color: #292922; 
}
.for_dark_theme {
  --primary-color: #9a97f3; 
  --secondary-color: #818cab; 
  --font-color: #e1e1ff; 
  --bg-color: #161625; 
  --heading-color: #818cab; 
}
```

### 5.5. Nguyên tắc viết path tối ưu cho trang web  

**Về hình thức:** 

#### 1. URL ngắn nhưng đầy đủ ngữ nghĩa 
- URL càng dài thì Google càng hạn chế đọc      
**Ví dụ**: /category/12345/product?id=67890 

- URL cần đẩy đù, ngắn gọn và tự nhiên như cách người dùng tìm kiếm   
**Ví dụ**: /hoc-react-co-ban 
#### 2. Dùng dấu gạch -, tránh _ 
- Nên tránh dấu _, cùng với các kí tự encode dài dòng: %20, &ref=abc...  
- Hạn chế sử dụng các kí tự id vô nghĩa nếu không cần thiết 
#### 3. Giữ URL đủ sâu ổn định 
- Không nên để đường dẫn sâu quá, nên giữ ổn định 2 - 3 cấp  
- Đừng để 1 nội dung mà có 2 - 3 đường dẫn khác nhau. Ví dụ: /dien-thoai/iphone-13 và /mobile/inphone-13 sẽ làm google hiểu thành duplicate 
#### 4. Dùng chữ thường 

**Về hệ thống** 

- Không để lộ cấu trúc hệ thống qua URL  
**Ví dụ**: `/index.php?page=product&id=123` (NOT)
`/san-pham/ban-phim-co-akko-3098` (GOOD)

- Không để thông tin người dùng (Ví dụ id, email) ngay trên thanh địa chỉ 

### 5.6. CSS Động 
Tailwind không nhận css động => Dùng thuộc tính style trong the JSX, truyền tham số vào component là các style muốn chính 

Có thể truyền nguyên 1 object styles, bên trong JSX component nhận vào và giải objec styles vào trong thuộc tính style 

Thầy nhiều component được bọc bên trong 1 layout chung (1 thẻ div) => Tạo một component layout 