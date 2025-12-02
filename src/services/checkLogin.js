import Cookies from "js-cookie";
function checkLogin() {
    if (Cookies.get('user')) return 1; 
    return false; 
} 
export default checkLogin