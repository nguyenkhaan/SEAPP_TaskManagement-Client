import Landing from "../pages/Landing"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage"
import Dashboard from "../pages/Dashboard"
import Team from "../pages/Team"
import CreateTask from "../pages/CreateTask"
import ViewTask from "../pages/ViewTask"
import MyTask from "../pages/MyTask"
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
        path: 'app/teams', 
        element: Team, 
        desc: 'Trang team'
    }, 
    {
        path: '/app/dashboard', 
        element: Dashboard, 
        desc: 'Trang dashboard'
    }, 
    {
        path: '/app/create-task', 
        element: CreateTask, 
        desc: 'Trang tao them task moi'
    }, 
    {
        path: '/app/my-tasks', 
        element: MyTask, 
        desc: 'Trang hien thi thong tin ve cac task'
    }, 
    {
        path: '/app/view-task', 
        element: ViewTask, 
        desc: 'Trang xem chi tiet noi dung ve task'
    }
    //my-task , setting ... 
]
export default routes 