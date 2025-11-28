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
const routes = [
    {
        path: '/',
        element: Landing, 
        desc: 'Trang mo dau'
    },
    {
        path: '/login', 
        element: LoginPage, 
        desc: 'Trang dang nhap', 
    }, 
    {
        path: '/register', 
        element: SignUpPage, 
        desc: 'Trang dang nhap', 
    }, 
    {
        path: 'app/teams',   //Da responsive 
        element: Team, 
        desc: 'Trang team'
    }, 
    {
        path: '/app/dashboard', //Da responsive 
        element: Dashboard, 
        desc: 'Trang dashboard'
    }, 
    { 
        path: '/app/create-task',   //Da responsive 
        element: CreateTask, 
        desc: 'Trang tao them task moi'
    }, 
    {
        path: '/app/my-tasks',   //Da responsive 
        element: MyTask, 
        desc: 'Trang hien thi thong tin ve cac task'
    }, 
    {
        path: '/app/view-task',   //Da responsive 
        element: ViewTask, 
        desc: 'Trang xem chi tiet noi dung ve task'
    }, 
    {
        path: '/app/view-team',   //Da responsive 
        desc: 'Trang xem thong tin ve 1 nhom cu the', 
        element: ViewTeam
    }, 
    {
        path: '/app/create-team', 
        desc: 'Trang dùng để tạo ra 1 team', 
        element: CreateTeam
    }, 
    {
        path: '/app/settings', 
        desc: 'Trang cài đặt', 
        element: Setting 
    }
    //my-task , setting ... 
]
export default routes 