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
} 

export default ParamServices 