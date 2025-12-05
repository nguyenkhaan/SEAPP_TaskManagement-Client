import { ThermometerSnowflake } from "lucide-react";
import api from "../api/api";
import Cookies from "js-cookie";

class TaskServices {
    static getUserToken() {
        return Cookies.get("user");
    }
    static async getTaskStatisticByTeam(teamID) {
        const token = this.getUserToken();
        try {
            const responseData = await api.get(
                `/tasks/statistics/teams/${teamID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return responseData; //data : teamId , teamName , totalTasks, completedPercentage , inProgressPercentage , toDoPercentage
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async getTaskStatisticByUser() {
        const token = this.getUserToken();
        try {
            const responseData = await api.get(`/tasks/statistics`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.log(err);
            throw err;
        } //data : totalTasks , completedPercentage , inProgressPercentage , toDoPercentage
    }
    static async createTask(
        teamID,
        title,
        description,
        dueTime,
        important,
        urgent
    ) {
        const token = this.getUserToken();
        try {
            const responseData = await api.post(
                `/tasks/teams/${teamID}/tasks`,
                {
                    title,
                    description,
                    dueTime,
                    important,
                    urgent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return responseData;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async getTeamTask(teamID) {
        const token = this.getUserToken();
        try {
            const responseData = await api.get(`/tasks/teams/${teamID}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return responseData;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async getTaskDetail(taskID) {
        const token = this.getUserToken();
        console.log(taskID);
        try {
            const responseData = await api.get(`/tasks/${taskID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return responseData;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async updateTask(taskID , title , description , dueTime , important , urgent , status) {
        const token = this.getUserToken() 
        console.log(taskID) 
        try {
            const responseData = await api.put(`/tasks/${taskID}` , {
                title , description , dueTime , important , urgent , status
            } , {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            return responseData
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteTask(taskID) 
    {
        const token = this.getUserToken() 
        try {
            const responseData = await api.delete(`/tasks/${taskID}` , {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            return responseData
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
export default TaskServices;
