import Cookies from "js-cookie";
function checkLogin() {
    const token = Cookies.get('user')
    console.log("User cookies: ", token)
    if (!token || token === "undefined")
        return false;
    return true;
} 
export default checkLogin