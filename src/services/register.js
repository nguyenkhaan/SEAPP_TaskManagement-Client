import api from "../api/api";
async function registerByEmailPassword(name , email , password) {
    try {
        const responData = await api.post('/auth/register' , {
            name , email , password 
        })
        const verification_token = responData.data.token 
        // console.log(verfi)
        const loginSession = await api.get('/auth/verify' , {
            params: {
                token: verification_token
            }
        })
        return loginSession
    }
    catch (error) {
        console.log(error) 
        throw error //Nem ra ben ngoai de ham cha nhan duoc 
    }
}

export default registerByEmailPassword