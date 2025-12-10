import api from "../api/api";
import Cookies from "js-cookie";

class AssignServies 
{
    static getUserToken() {
        return Cookies.get('user') 
    } 
    static async getUserDoTask(taskID) {
        const token = this.getUserToken() 
        try {
            const responseData = await api.get(`/tasks/users/${taskID}` , {
                headers: {
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
    static async getAllUserToAssign(teamID) 
    {
        const token = this.getUserToken() 
        try {
            const responseData = await api.get(`/teams/user/assign/${teamID}` , {
                headers: {
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
    static async getAllUserToAssignByTaskID(taskID) 
    {
        const token = this.getUserToken() 
        try {
            const responseData = await api.get(`/teams/user/assign/task/${taskID}` , {
                headers: {
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
}

export default AssignServies