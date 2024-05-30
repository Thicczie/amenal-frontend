
import apiClient from "../apiClient";

type login={

        email:string,
        password:string
    
}

type register={
    
        email:string,
        password:string,
        firstName:string,
        lastName:string
    
}


export const login = (data:login) => apiClient.post("/auth/authenticate", data , {
    headers: {
        Authorization:null,
    }});
export const register = (data:register) => apiClient.post("/auth/register", data , {
    headers: {
        Authorization:null,
    }});
export const refreshToken = (refreshToken:string) => apiClient.post("/auth/refresh-token", {
    headers: {
        Authorization:`Bearer ${refreshToken}`,
    }});