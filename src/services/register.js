import api from "../api/api";
class RegisterSevices {
    static async registerByEmailPassword(name, email, password) {
        try {
            const responData = await api.post("/auth/register", {
                name,
                email,
                password,
            });
            const verification_token = responData.data.token;
            // console.log(verfi)
            return 1
        } catch (error) {
            console.log(error);
            throw error; //Nem ra ben ngoai de ham cha nhan duoc
        }
    }
    static async verify(token) 
    {
        try {
            const responseData = await api.get('/auth/verify' , {
                params: {
                    token : token 
                }
            })
            return responseData
        } 
        catch (error) {
            console.log(error) 
            throw error 
        }
    }
}
export default RegisterSevices 