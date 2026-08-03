import { isCurrentPublicRoute } from "@/lib/utils";
import axios from "axios";
import refreshUserToken from "./refreshToken";


export const api = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:8080/api/v1/',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

api.interceptors.response.use(
  (response) => {
    // Return just the data for successful responses
    return response;
  },
  async (error) => {

    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside of the 2xx range
      if (error.response.status === 401) {
        if(!isCurrentPublicRoute() && error.config.url !== '/auth/refresh'){
          const originalRequest = error.config;
           await refreshUserToken()
           return axios.request(originalRequest)
        }
        else {
              console.error('Unauthorized! Redirecting to login...');
        }
      } else if (error.response.status === 404) {
        console.error('Requested resource not found.');
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    
    // Always reject the promise so your component's catch block can still run
    return Promise.reject(error);
  }
);

export default api;