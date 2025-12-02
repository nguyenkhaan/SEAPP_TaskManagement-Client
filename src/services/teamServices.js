import api from "../api/api";
import Cookies from "js-cookie";

class TeamServies 
{
    static getUserToken() 
    {
        return Cookies.get('user') 
    }
    static async getTeamInfoFromId(id) 
    //Lay thong tin ve 1 team cu the 
    {
        try {
            const token = this.getUserToken() 
            const responseData = await api.get(`/teams/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }) 
            return responseData
        }
        catch (error) {
            console.log(error) 
            throw error 
        }
    }
    static async getAllTeamInfo() 
    {
        try {
            const token = this.getUserToken() 
            const responseData = await api.get('/teams/user' , {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            return responseData 
        } 
        catch (error) {
            console.log(error) 
            throw error 
        } 
    } 
    static async createTeam(teamName = 'Cloudian Team' , icon = null , banner = null , description = '') 
    {
        try {
            const token = this.getUserToken() 
            const formData = new FormData() 

            formData.append('teamName' , teamName)  
            formData.append('description' , description) 
            if (icon) formData.append('icon' , icon) 
            if (banner) formData.append('banner' , banner) 
            console.log(formData) 
            const responseData = await api.post('/teams/' , formData , {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            console.log(responseData)
            return responseData
        } 
        catch (error) {
            console.log(error) 
            throw error 
        }
    }
}
export default TeamServies