import axios from "axios";


// creating baseUrl
export const api = axios.create({
    baseURL:"http://localhost:3000"
});

