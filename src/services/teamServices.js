import api from "../api/api";
import Cookies from "js-cookie";

class TeamServies 
{
    getUserToken() 
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
    static async createTeam(teamName = '' , icon = null , banner = null , description = '') 
    {
        try {
            const token = this.getUserToken() 
            const formData = new FormData() 

            formData.append('teamName' , teamName)  
            formData.append('description' , description) 
            formData.banner('icon' , icon) 
            formData.append('banner' , banner) 
        } 
        catch (error) {
            console.log(error) 
            throw error 
        }
    }
}
export default TeamServies