class ParamServices 
{
    static getID() 
    {
        const params = new URLSearchParams(window.location.search) 
        const id = params.get('id') 
        if (id !== null) {
            window.history.replaceState({}, "", `?id=${id}`);
        }
        
        return id 
    }
    static getResetPasswordToken() 
    {
        const params = new URLSearchParams(window.location.search) 
        const token = params.get('reset_password_token') 
        if (token !== null) {
            window.history.replaceState({}, "", `?reset_password_token=${token}`);
        }
        
        return token 
    }
} 

export default ParamServices 