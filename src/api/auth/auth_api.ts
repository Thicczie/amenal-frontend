
import { ApisauceInstance } from "apisauce";
import useApiClient from "../apiClient";

type login={

        email:string,
        password:string
    
}

type register={
    
        email:string,
        password:string,
        firstname:string,
        lastname:string
    
}


import React from 'react'



const useAuthApi = (apiClient:ApisauceInstance) => {


     const login = (data:login) => apiClient.post("/auth/authenticate", data , {
        headers: {
            Authorization:null,
        }});
     const register = (data:register) => apiClient.post("/auth/register", data , {
        headers: {
            Authorization:null,
        }});
    const refreshToken = () => apiClient.post("/auth/refresh-token", {
        headers: {
            //Authorization:`Bearer ${refreshToken}`,
        }});

        return {
            login,
            register,
            refreshToken
        }

}

export default useAuthApi;

