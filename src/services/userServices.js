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
    // console.log(responseData.data.data.user)  
    return responseData.data.data.user 
}

async function updateUserInfo(info) {
    //Tien hanh update thong tin cho user 
    const token = Cookies.get('user') 
    const responseData = await api.post('/user' , info , {
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })
    return responseData 
}

export {getUserInfo}