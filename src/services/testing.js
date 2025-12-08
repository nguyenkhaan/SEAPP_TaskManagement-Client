import api from "../api/api";
async function testing() 
{
    const res = await api.get('/my-testing') 
    console.log('Thong tin testing: ' , res) 

} 
export default testing