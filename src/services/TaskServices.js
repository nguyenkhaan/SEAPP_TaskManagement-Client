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
    static async createTask(teamID, title, description, dueTime) {
        const token = this.getUserToken();
        try {
            const responseData = await api.post(
                `/tasks/teams/${teamID}/tasks`,
                {
                    title,
                    description,
                    dueTime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return responseData
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
export default TaskServices;
