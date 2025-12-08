import axios from "axios";

const BASE_URL = 'https://seapptaskmanagement-server-production.up.railway.app' 
const api = axios.create({
    baseURL: BASE_URL, 
    timeout: 3000
}) 

export default api 