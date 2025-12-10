import axios from "axios";

const BASE_URL = 'https://seapptaskmanagement-server-production.up.railway.app' 
// const BASE_URL = 'http://localhost:6869' 
const api = axios.create({
    baseURL: BASE_URL, 
    timeout: 30000
}) 

export default api 