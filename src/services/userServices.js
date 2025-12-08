import api from "../api/api";
import checkLogin from "./checkLogin";
import Cookies from "js-cookie";

class UserService {
    static getUserToken() {
        return Cookies.get('user');
    }

    static async getUserInfo() {
        const token = this.getUserToken();
        const res = await api.get('/user/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.data.user 
    } // 
    static async updateUserAvatar(file) {
        const token = this.getUserToken();
        const formData = new FormData();
        formData.append('avatar', file);

        const res = await api.patch('/user/upload-avatar', formData, {
            headers: {
                Authorization: `Bearer ${token}`
                // KHÔNG set Content-Type → axios tự generate boundary cho FormData
            }
        });

        return res.data;
    }

    static async updateUserInfo(info) {
        const token = this.getUserToken();
        const res = await api.post('/user/', info, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    }
    static async updateEmail(email , password) 
    {
        const token = this.getUserToken() 
        try {
            const responseData = await api.patch('/user/change-email' , {
                new_email: email , password
            } , {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            return responseData
        }
        catch (err) {
            console.log(err) 
            throw err
        }
    }
    static async changePassword(oldPassword , newPassword) 
    {
        const token = this.getUserToken() 
        try {
            const responseData = await api.patch('/user/reset-password' , {
                old_password: oldPassword , 
                new_password: newPassword
            } , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return responseData
        } 
        catch (err) {
            console.log(err) 
        }
    }
}

export default UserService;
