import { Navigate, useLocation } from "react-router-dom";
import checkLogin from "../services/checkLogin";

function ProtectedRoute({ children }) {
    const isLogin = checkLogin();
    const location = useLocation();

    // 1. Kiểm tra đăng nhập
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }
    const params = new URLSearchParams(location.search);
    const keys = [...params.keys()];

    // Trường hợp 1: Không có param → CHO QUA
    if (keys.length === 0) {
        return children;
    }

    // Trường hợp 2: Có param nhưng chỉ được phép có duy nhất "id"
    if (keys.length === 1 && (keys[0] === "id" || keys[0] === "search-result")) {
        return children;
    }

    // Trường hợp 3: Sai quy tắc → điều hướng về trang lỗi
    return <Navigate to="/url/error" replace />;
}

export default ProtectedRoute;
