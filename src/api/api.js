import axios from "axios";

const BASE_URL = 'http://localhost:6869'
const api = axios.create({
    baseURL: BASE_URL, 
    timeout: 3000
}) 

export default api 