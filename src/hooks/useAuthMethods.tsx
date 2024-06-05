import React from "react";
import useAuth from "./useAuth";
import useDeviceCookies from "./useDeviceCookies";
import useAuthApi from "../api/auth/auth_api";
import useApiClient from "../api/apiClient";

type Props = {};

type user = {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
};

const useAuthMethods = () => {
  const { setAuthTokens, setRefreshToken, setUserCredentials } = useAuth();
  const apiClient = useApiClient();
  const { login } = useAuthApi(apiClient);
  const { removeDeviceCookie, setDeviceCookie, getDeviceCookie } =
    useDeviceCookies();
  const Login = async (email: string, password: string) => {
    const response = await login({ email: email, password: password });
    if (response.ok) {
      console.log("Login successful:", response);

      const data: any = response?.data;
      const decodedAccessToken = parseJwt(data?.access_token);
      setAuthTokens(data?.access_token);
      setRefreshToken(data?.refresh_token);
      setUserCredentials({
        email: decodedAccessToken?.sub, // replace with email
        firstname: decodedAccessToken?.firstName,
        lastname: decodedAccessToken?.lastName,
        role: decodedAccessToken?.role,
      });
      //replace with cookies
      localStorage.setItem("access_token", data?.access_token);
      // localStorage.setItem("refresh_token", data?.refresh_token);
      //setDeviceCookie("access_token", data?.access_token);
      setDeviceCookie("refresh_token", data?.refresh_token);

      // apiClient.setHeaders({
      //   Authorization: `Bearer ${data?.access_token}`,
      // });

      return true;
    } else {
      console.error("Login failed:", response);
      return false;
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setRefreshToken(null);
    setUserCredentials({
      email: "",
      firstname: "",
      lastname: "",
      role: "",
    });
    localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
    // removeDeviceCookie("access_token");
    removeDeviceCookie("refresh_token");

    //refreshAccessToken();
  };

  return {
    Login,
    logout,
  };
};

export default useAuthMethods;

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
