import axios from "axios"
async function loginGoogleSuccess(tokenResponse) 
{
    console.log('Log from services/loginGoogleSuccess') //Dong log de thong bao cho da log ra noi dung 
    console.log('Thanh cong' , tokenResponse) 
    console.log('Dang tai thong tin nguoi dung') 
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo' , { //Phai dung duong link nay 
        headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
        }
    }).then(res => res.data) 

    console.log('Thong tin nguoi dung: ' , userInfo)
}

async function loginGoogleFailed(error) 
{
    console.log('Log from services/loginGoogleSuccess') 
    console.log('Dang nhap tu google that bai' , error) 
}

export {loginGoogleSuccess , loginGoogleFailed}