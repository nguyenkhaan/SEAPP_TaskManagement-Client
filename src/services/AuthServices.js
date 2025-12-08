import api from "../api/api";
import checkLogin from "./checkLogin";
import Cookies from "js-cookie";
class AuthServices {
    static getUserToken() {
        return Cookies.get("user");
    }
    static async logOut() 
    {
        const token = this.getUserToken() 
        try {
            const responseData = await api.post('/auth/logout' , {} , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return responseData
        } 
        catch (err) {
            console.log(err) 
            throw err 
        }
    }
    static async setNewPassword(token , password) 
    {
        try {
            const responseData = await api.post('/auth/set-new-password' , {
                reset_password_token : token, 
                new_password: password
            })
            return responseData 
        } 
        catch (err) { 
            console.log(err) 
            throw err 
        }
    }
    static async forgotPassword(email) 
    {
        try {
            const responseData = await api.post('/auth/forgot-password' , {
                email
            })
            return responseData
        }
        catch (err) { 
            console.log(err) 
            throw err 
        }
    }
}
export default AuthServices;
