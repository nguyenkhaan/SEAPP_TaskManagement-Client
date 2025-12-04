import api from "../api/api";
import Cookies from "js-cookie";

class TeamServies {
    static getUserToken() {
        return Cookies.get("user");
    }
    static async getTeamInfoFromId(
        id //Lay thong tin ve 1 team cu the
    ) {
        try {
            const token = this.getUserToken();
            const responseData = await api.get(`/teams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return responseData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getAllTeamInfo() {
        //Da xu li thanh cong
        try {
            const token = this.getUserToken();
            const responseData = await api.get("/teams/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return responseData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async createTeam(
        teamName = "Cloudian Team",
        icon = null,
        banner = null,
        description = "" //Da xu li thanh cong
    ) {
        try {
            const token = this.getUserToken();
            const formData = new FormData();

            formData.append("teamName", teamName);
            formData.append("teamDescription", description);
            if (icon) formData.append("icon", icon);
            if (banner) formData.append("banner", banner);
            console.log(formData);
            const responseData = await api.post("/teams/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(responseData);
            return responseData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async joinTeamWithCode(
        code //Da check
    ) {
        if (!code) return;
        try {
            const token = this.getUserToken();
            const responseData = await api.post(
                "/teams/join",
                {
                    code,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(responseData);
            return responseData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async leaveGroup(teamID) {
        //Da check
        try {
            const token = this.getUserToken();

            const responseData = await api.delete("/teams/user", {
                data: { teamID: teamID },
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
    static async getTeamRole(teamID) {
        try {
            const token = this.getUserToken();
            const responseData = await api.get("/teams/role", {
                params: {
                    teamID,
                },
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
    static async updateLeader(teamID, newLeaderID) {
        try {
            const token = this.getUserToken();
            const dataSend = new FormData();
            dataSend.append("leaderID", newLeaderID);
            const responseData = await api.put(`/teams/${teamID}`, dataSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return responseData;
        } catch (err) {}
    }
    static async updateViceLeader(teamID, newViceLeaderID) {
        try {
            const token = this.getUserToken();
            const dataSend = new FormData();
            dataSend.append("viceLeaderID", newViceLeaderID);
            const responseData = await api.put(`/teams/${teamID}`, dataSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return responseData;
        } catch {}
    }
    static async deleteTeam(teamID) {
        const token = this.getUserToken();
        try {
            const responseData = await api.delete(`/teams/${teamID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return responseData;
        } catch (err) {}
    }
    static async updateTeam(teamID, name, icon, description) {
        const token = this.getUserToken();
        try {
            const formData = new FormData();
            console.log(teamID , name , icon , description)
            if (name) formData.append("teamName", name);
            if (icon) formData.append("icon", icon);
            if (description) formData.append("teamDescription", description);
            const responseData = await api.put(`/teams/${teamID}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(responseData)
            return responseData;
        } catch (err) {}
    }
}
export default TeamServies;
