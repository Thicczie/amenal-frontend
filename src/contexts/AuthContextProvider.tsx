import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { login, refreshToken as RefreshToken } from "../api/auth/auth_api";
import apiClient from "../api/apiClient";
import { isPlatform } from "@ionic/react";
import { CapacitorCookies } from "@capacitor/core";
import { useCookies } from "react-cookie";

interface AuthContextType {
  authTokens: string | null;
  userCredentials: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null;
  Login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  // const [authTokens, setAuthTokens] = useState<string | null>(() => {
  //   const token =  getDeviceCookie("access_token");
  //   return token;
  // });

  // const [refreshToken, setRefreshToken] = useState<string | null>(() => {
  //   const token = getDeviceCookie("access_token");
  //   return token;
  // });

  const [authTokens, setAuthTokens] = useState<string | null>(null);

  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [userCredentials, setUserCredentials] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null>();

  // useEffect(() => {
  //   const checkTokenExpiry = async () => {
  //     try {
  //       const accessToken = await getDeviceCookie("access_token");
  //       if (!accessToken) {
  //         throw new Error("Access token not found");
  //       }

  //       const decodedToken = parseJwt(accessToken);
  //       console.log(
  //         "Decoded token:",
  //         decodedToken,
  //         "\n before decode ",
  //         accessToken
  //       );

  //       const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds

  //       const timeToExpiry = expiryTime - Date.now();
  //       const refreshTime = 1 * 60 * 1000; // 5 minutes before expiry
  //       // console.log(
  //       //   "Decoded token:",
  //       //   decodedToken,
  //       //   "timeToExpiry",
  //       //   timeToExpiry,
  //       //   "refreshTime",
  //       //   refreshTime
  //       // );

  //       if (timeToExpiry < refreshTime) {
  //         const response = await refreshAccessToken();
  //         console.log("Refreshed access token:", response);
  //       }
  //     } catch (error) {
  //       console.error("Error checking token expiry:", error);
  //     }
  //   };

  //   fetchDeviceTokens();

  //   //const interval2 = setInterval(fetchAuthTokens, 5 * 1000);
  //   const interval = setInterval(checkTokenExpiry, 5 * 1000); // Check every minute for token expiry
  //   return () => {
  //     clearInterval(interval);
  //     //clearInterval(interval2);
  //   };
  // }, []);

  const fetchTokens = async () => {
    try {
      console.log("fetchingTokens...");

      const accessToken = await getDeviceCookie("access_token");
      const refreshToken = await getDeviceCookie("refresh_token");
      setAuthTokens(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  const fetchDeviceTokens = async () => {
    await fetchTokens();
  };

  const Login = async (email: string, password: string) => {
    const response = await login({ email: email, password: password });
    if (response.ok) {
      console.log("Login successful:", response);

      const data: any = response?.data;
      const decodedAccessToken = parseJwt(data?.access_token);
      setAuthTokens(data?.access_token);
      setRefreshToken(data?.refresh_token);
      setUserCredentials((prev) => ({
        ...prev,
        email: decodedAccessToken?.sub, // replace with email
        firstName: decodedAccessToken?.firstName,
        lastName: decodedAccessToken?.lastName,
        role: decodedAccessToken?.role,
      }));
      //replace with cookies
      // localStorage.setItem("access_token", data?.access_token);
      // localStorage.setItem("refresh_token", data?.refresh_token);
      setDeviceCookie("access_token", data?.access_token);
      setDeviceCookie("refresh_token", data?.refresh_token);

      apiClient.setHeaders({
        Authorization: `Bearer ${data?.access_token}`,
      });
      return true;
    } else {
      console.error("Login failed:", response);
      return false;
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setRefreshToken(null);
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
    removeDeviceCookie("access_token");
    removeDeviceCookie("refresh_token");
    apiClient.deleteHeader("Authorization");
    //refreshAccessToken();
  };

  const setDeviceCookie = async (
    name: string,
    value: string,
    options?: any
  ) => {
    const tokenExists = await getDeviceCookie(name);
    if (tokenExists) {
      setAuthTokens(value);
      setRefreshToken(value);
    }
    if (isPlatform("hybrid")) {
      await CapacitorCookies.setCookie({
        url: "/",
        key: name,
        value: value,
      });
    } else {
      setCookie(name, value, options);
    }
  };

  const getDeviceCookie = async (name: string): Promise<string | null> => {
    if (isPlatform("hybrid")) {
      const cookie = await CapacitorCookies.getCookies();

      return cookie[name] || null;
    } else {
      return cookies[name] || null;
    }
  };

  const removeDeviceCookie = async (name: string) => {
    if (isPlatform("hybrid")) {
      await CapacitorCookies.deleteCookie({
        url: "/",
        key: name,
      });
    } else {
      removeCookie(name);
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    try {
      const oldRefreshToken = await getDeviceCookie("refresh_token");
      if (!oldRefreshToken) {
        throw new Error("Refresh token not found");
      }
      //console.log("Refreshing access token...", oldRefreshToken);

      const response = await RefreshToken(oldRefreshToken);

      if (response?.ok) {
        console.log("Refreshed access token:", response);
        const data: any = response?.data;
        setAuthTokens(data?.access_token);
        setRefreshToken(data?.refresh_token);
        //replace with cookies
        // localStorage.setItem("access_token", data?.access_token);
        // localStorage.setItem("refresh_token", data?.refresh_token);
        setDeviceCookie("access_token", data?.access_token);
        setDeviceCookie("refresh_token", data?.refresh_token);
        apiClient.setHeaders({
          Authorization: `Bearer ${data?.access_token}`,
        });
      } else {
        // Handle refresh token failure
        throw new Error("Failed to refresh access token");
      }
    } catch (error) {
      // Handle token refresh error
      console.error("Token refresh failed:", error);
      logout(); // Log out the user if token refresh fails
    }
  };

  const contextValue = {
    authTokens,
    userCredentials: userCredentials ?? null,
    Login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

function parseJwt(token: string) {
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
