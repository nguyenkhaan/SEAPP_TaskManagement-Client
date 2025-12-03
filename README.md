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

### 5.7. Đăng nhập bằng Google 
#### **1. Set up Google** 
Truy cập trang web: `console.cloud.google.com`

Vào dashboard -> API & Services -> Credentials -> Create an Outh ID 

  Nếu đang localhost thì cập nhật 2 url: `http://localhost:5173` và `http://localhost`

Tạo ra một access token để truy cập -> Copy Client ID : *802852666161-o82mhq04404uckeqv9ctn8ub5fc12vug.apps.googleusercontent.com* 

**Một số chú ý**:

- Sang tab Audience. Trong development thì thêm email các teseter vào, chỉ những email trong danh sách teser mới có thể đăng nhập. Khi deploy public thì sửa audience thành public để ai cũng có thể đăng nhặp. 
- Nếu trong 6 tháng không dùng, client id sẽ bị xóa 

#### **2. Set up code** 

Cài đặt thư viện: `https://www.npmjs.com/package/@react-oauth/google`, document cũng ở trong đó 

Trước tiên, trong file main.jsx, ta phải bọc bên ngoài bằng một thẻ `GoogleOAuthProvider`

```js
const CLIENT_ID = '802852666161-o82mhq04404uckeqv9ctn8ub5fc12vug.apps.googleusercontent.com'  
//Sau nay deploy thi chuyen cai nay vao file .env, khong ne de nhu the nay 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </StrictMode>

  </BrowserRouter>
)
```

#### **3. Login Component** 
Di chuyển sang trang muốn tạo login. Dùng component `<GoogleLogin />` được cấp sẵn sẽ tạo một nút Login by Google

Nhận vào 2 tham số: 

```js
onSuccess = ((credentialResponse) => console.log(credentialResponse))  //Thanh cong 
onError = ((error) => console.log(error)) //That bai 
```

Nếu đăng nhập thành công sẽ trả về một object tên là credentialResponse. Sử dụng gói `jwt-decode`, decode jet token trong đó sẽ thu được thông tin người dùng

#### **4. Login Hook** 
Dùng khi muốn custom một nút Login của riêng mình 

```js
import {useGoogleLogin} from '@react-oauth/google'
```

```jsx
const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log(tokenResponse)
  }, 
  onError: (error) => {
    console.log(error) 
  }
})
<button onClick = {() => login}> Login </button>
```

Khi bấm button, sẽ chạy hàm login. Nếu thành công sẽ rơi vào onSuccess => Trả về 1 Bearer Token. Thất bại thì rơi vào onError 

**Lấy thông tin người dùng**  
Không dùng JWT Decode mà call API, thêm token vào headers của Request. 

Link call: `https://www.googleapis.com/oauth2/v3/userinfo` 

```js
async function loginSuccess(tokenResponse) 
{
    const usserInfo = axios.get('https://www.googleapis.com/oauth2/v3/userinfo' , {
      headers: {
        'Authorization': `Bearer ${tokenResponse.access_token}`
      }
    }).then(res => res.data) 

    console.log(userInfo) 
}
```

## 6. Tạo Rich Text Editor 

**Bước 1**: Tạo editor 
- Dùng component <Editor> cùng với ReactHook useEditor 

- Khai báo cấu hình cho Editor 

```js
const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-4'
                    }
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-4'
                    }
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,  //Khai bao cac extensions, co the search trong tip tap de tim cac extensions va thiet dat vao ben trong 
            Image.configure({
                allowBase64: true,
                resize: {
                    enabled: true,
                    alwaysPreserveAspectRatio: true
                }
            })
        ],
        content: '<p>Hello world</p>',
        editorProps: {
            attributes: {
                class: 'w-full h-[500px] border-2 overflow-y-auto rounded-md px-3 bg-slate-50 py-2 text-base border-slate-200  bg-white text-black outline-0'
            }
        }
    }) 
```

Cấu hình được khai báo bằng cách sử dụng Hook useEditor, bên trong cung cấp: 

+ Danh sách extensions (các extensiosn 
sẽ cung cấp thêm các chức năng cho Rich Text Editor, ví dụ: Highlight, Align, Order list, chèn hình ảnh...). Muốn cài đặt extensions nào thì tra mạng để xem cách cấu hinh cho extensions đó vào mảng 

+ content: Nội dung ban đầu dược hiển thị ra, viết 1 string gồm các thẻ HTML 

+ editorProps: Thêm các class (tailwind), CSS cho editor 

**Bước 2**: Cài đặt Menubar 

Sử dụng component Menubar được cung cấp, truyền thuộc tính editor vào 

Bên trong Menubar, cung cấp cho nó các options (các nút bấm) để thao tác được với editor truyền vào (Highlight, bôi đậm, in nghiêng...) 

`https://tiptap.dev/docs/examples/basics/formatting`

Xem cách cài đặt các nút bấm ở đường link trên 

**Bước 3** Làm cho Menubar đẹp lên 
Sau Bước 2, nút bấm đã có nhưng còn rất xấu 

Để làm dược đẹp, dùng thêm gói shadcn => tạo button với các icon đẹp 

`https://ui.shadcn.com/docs/components/toggle` 

Truy cập đường link và cài đặt gói shadcn theo hướng dẫn 

Lưu ý: Trước khi cài đặt phải cấu hình lại dự án: tạo file config.json, khai báo thêm paths bên trong ts-config và import path vào bên trong file vite.config.js 

Lấy mảng các icon tại đường link: 

`https://github.com/candraKriswinarto/my-rich-text-editor`

```js 
return (
      <div className="w-full border-2 border-slate-200 rounded-md space-x-3 p-1 mb-1 z-50">
          {
              Options.map((option , index) => {
                  return <Toggle key={index} onPressedChange={option.onClick} pressed={true}>{option.icon}</Toggle>
              })
          }
      </div>
  )
```   

## 7. Cài đặt React-Query 

## 8. Một số gói hỗ trợ dự án 
BE: 
- React Query 
- Axios API 
- CookiesJS 
- OAuth-google 
- react-confirm-alert

- Cac component can: 
+ MessageLog: Thong bao trang thai chay duoc hay la khong 
+ LoadingModal: Trang Modal toan man hinh dung de Loading trong khi cho tai du lieu 
+ Dialog Box: Hop thoai thong bao xac nhan 
FE:
- PyJWT 
- SQLAlchemy_flask 
- Flask_restful 
- CORS: Chống CORS 



## 9. Mot so chu y ve React Query 
- React Query cache dua tren co che key -> Nhung ham cache co cung key thi se chia se chyung nguon du lieu duoc cached 
  + queryKey: Key dung de quan li viec cache 
  + queryFn: Ham bat dong bo, thuc hien viec lay du lieu cho bien data. Thuong ket hop voi Axios API 
  + data: Bien cua react query, chua du lieu call duoc tu API 
  + isPending (boolean): Xac dinhx em du lieu da duoc 
- Mutation: 
  - Dung de thuc hie viec update du lieu, delete , insert 
  - Co che: Chay ham va se cap nhat lai cache cho cac query co key tuong ung duoc khai bao 
  - mutationFn: Ham bat dong bo de chay insert (chi nhan 1 tham so duy nhat)
  - onSuccess(): Ham se chay khi mutationFn thanh cong 
  - onError(): Ham se chay khi mutationFn that bai 
  - queryClient.valite([])...: Dungde quyet dinh xem key nao se duoc refetch (lam moi) du lieu sau khi update. Thuowng dat cac nay trong onSuccess() 