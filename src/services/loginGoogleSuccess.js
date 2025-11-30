import api from "../api/api"

async function loginGoogleSuccess(tokenResponse) 
{   
    const responseData = await api.get('/auth/verify' , {
        params: {
            token: tokenResponse.code //Gui ma code ve cho BE 
        }
    })
    console.log('Token: ' , tokenResponse) 
    //Tien hanh xu li viec dang nhap thanh cong 
    //Khoi tao phien dang nhap 
    return responseData
}

async function loginGoogleFailed(error) 
{
    console.log('Log from services/loginGoogleSuccess') 
    console.log('Dang nhap tu google that bai' , error) 
}


async function initLoginSession() 
{

}
async function logout() 
{
    
}


export {loginGoogleSuccess , loginGoogleFailed}