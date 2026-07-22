import axios from "axios";


export const api = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:8080/',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})