import api from "../api/api";
import checkLogin from "./checkLogin";
import Cookies from "js-cookie";
async function getUserInfo() {
    const token = Cookies.get('user') //Lay Cookies user 
    const responseData = await api.get('/user/' , {
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })
    console.log(responseData.data) 
    return responseData.data
}

export {getUserInfo}