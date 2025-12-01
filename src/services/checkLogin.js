import Cookies from "js-cookie";
function checkLogin() {
    console.log(Cookies.get('user')) 
    if (Cookies.get('user')) return 1; 
    return false; 
} 
export default checkLogin