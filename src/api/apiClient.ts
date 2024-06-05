


import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import apisauceClient from './auth/apisauceClient';
import useAuthApi from './auth/auth_api';
import useDeviceCookies from '../hooks/useDeviceCookies';
import { parseJwt } from '../hooks/useAuthMethods';




function useApiClient  ()  {

  const api = apisauceClient;

const { AuthToken , RefreshToken , setAuthTokens, setRefreshToken ,userCredentials, setUserCredentials }=useAuth();

    const {refreshToken}=useAuthApi(api);
    const {setDeviceCookie}=useDeviceCookies()


    function setTokens({accessToken , refreshToken}:{accessToken: string|undefined, refreshToken?: string|undefined}) {
        if(!accessToken) return
        console.log("setting tokens...");
        
        const decodedAccessToken = parseJwt(accessToken);
        setAuthTokens(accessToken);
        setUserCredentials({
          email: decodedAccessToken?.sub, // replace with email
          firstname: decodedAccessToken?.firstName,
          lastname: decodedAccessToken?.lastName,
          role: decodedAccessToken?.role,
        });
        console.log("set user" , userCredentials);
        
        localStorage.setItem("access_token", accessToken);
        if(refreshToken){
            setRefreshToken(refreshToken);
            setDeviceCookie("refresh_token", refreshToken);}


    }



    



    useEffect(() => {
        //Request Interceptor
        const requestInterceptor = api.axiosInstance.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    if(!AuthToken){
                        return config;
                    }
                    config.headers['Authorization'] = `Bearer ${AuthToken}`;
                    setTokens({accessToken:AuthToken});

                }
                return config;
            },
            (error) => Promise.reject(error)
        );

       // Response Interceptor
        const responseInterceptor = api.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    console.log("refreshing token");
                    
                    prevRequest.sent = true;
                    const newAccessToken = await refreshToken().then((resp:any) => {
                        var data=resp?.data;
                        return data?.access_token
                    })
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    setTokens({accessToken:newAccessToken});
                    return api.axiosInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        // Cleanup function to eject interceptors
        return () => {
           api.axiosInstance.interceptors.request.eject(requestInterceptor);
        api.axiosInstance.interceptors.response.eject(responseInterceptor);

        };



}, [AuthToken,RefreshToken]);


    
return api;
};

export default useApiClient;



