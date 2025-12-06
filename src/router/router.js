import Landing from "../pages/Landing"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage"
import Dashboard from "../pages/Dashboard"
import Team from "../pages/Team"
import CreateTask from "../pages/CreateTask"
import ViewTask from "../pages/ViewTask"
import MyTask from "../pages/MyTask"
import ViewTeam from "../pages/ViewTeam"
import CreateTeam from "../pages/CreateTeam"
import Setting from "../pages/Setting"
import Verify from "../pages/Verify"
import UpdateTeam from "../pages/UpdateTeam"
import UpdateTask from "../pages/UpdateTask"
import UrlError from "../pages/URLError"
const routes = [
    {
        path: '/',
        element: Landing, //Da responsive cho laptop,tablet, phone 
        desc: 'Trang mo dau'
    },
    {
        path: '/login', 
        element: LoginPage, //Da responsive cho laptop, tablet, phone? 
        desc: 'Trang dang nhap', 
    }, 
    {
        path: '/register', //Da responsive cho laptop, tablet, phone? 
        element: SignUpPage, 
        desc: 'Trang dang nhap', 
    }, 
    {
        path: '/app/teams',   //Da responsive cho tablet, phone, laptop 
        element: Team, 
        desc: 'Trang team'
    }, 
    {
        path: '/app/dashboard', //Da responsive cho mobile, tablet, laptop 
        element: Dashboard, 
        desc: 'Trang dashboard'
    },  
    { 
        path: '/app/create-task',   //Da responsive cho phone, tablet, laptop 
        element: CreateTask, 
        desc: 'Trang tao them task moi'
    }, 
    {
        path: '/app/my-tasks',    //Da responsive cho phone, tablet, laptop 
        element: MyTask, 
        desc: 'Trang hien thi thong tin ve cac task'
    }, 
    {
        path: '/app/view-task',   //Da responsive cho phone, tablet, laptop 
        element: ViewTask, 
        desc: 'Trang xem chi tiet noi dung ve task'
    }, 
    {
        path: '/app/view-team',   //Da responsive 
        desc: 'Trang xem thong tin ve 1 nhom cu the', 
        element: ViewTeam
    }, 
    {
        path: '/app/create-team', // da responsive laptop, tablet, phone 
        desc: 'Trang dùng để tạo ra 1 team', 
        element: CreateTeam
    }, 
    {
        path: '/app/settings', //Da responsive laptop, tablet, phone 
        desc: 'Trang cài đặt', 
        element: Setting 
    }, 
    {
        path: '/verify', 
        desc: 'Trang dung de verify email', 
        element: Verify 
    }, 
    {
        path: '/app/update-team', 
        desc: 'Trang dung de update thong tin cho team', 
        element: UpdateTeam
    }, 
    {
        path: '/app/update-task', 
        desc: 'Trang dung de update task', 
        element: UpdateTask
    }, 
    {
        path: '/url/error', 
        desc: 'Mia may', 
        element: UrlError
    }
    //my-task , setting ... 
]
export default routes 