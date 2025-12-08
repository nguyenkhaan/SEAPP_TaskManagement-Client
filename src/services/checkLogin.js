import Cookies from "js-cookie";
function checkLogin() {
    const token = Cookies.get('user')
    if (!token || token === "undefined")
        return false;
    return true;
} 
export default checkLogin