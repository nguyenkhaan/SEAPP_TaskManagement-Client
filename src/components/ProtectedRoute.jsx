import { Navigate } from "react-router-dom";
import checkLogin from "../services/checkLogin";

function ProtectedRoute({ children }) {
    const chk = checkLogin() 

    if (!chk) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
