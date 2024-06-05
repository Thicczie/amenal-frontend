import React, { createContext, useState, useEffect, ReactNode } from "react";
type userCredentials = {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
};

interface AuthContextType {
  AuthToken: string | null;
  RefreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  setAuthTokens: (token: string | null) => void;
  setUserCredentials: (userCredentials: userCredentials) => void;
  userCredentials: userCredentials | null;
  isReady: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [AuthToken, setAuthTokens] = useState<string | null>(
    localStorage.getItem("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] = useState<{
    email: string;
    firstname: string;
    lastname: string;
    role: string;
  } | null>();

  // useEffect(() => {
  //   //fetch token stored in cookies and set it in state if available
  //   async function fetchDeviceTokens() {
  //     setIsFetchingtokens(true);
  //     var tkns;
  //     return await fetchTokens();
  //     //then((data) => {
  //     //   tkns = data;
  //     //   // setAuthTokens(tkns?.accToken);
  //     //   // setRefreshToken(tkns?.refToken);
  //     //   setAuthTokens(tkns?.accToken);
  //     //   setRefreshToken(tkns?.refToken);
  //     // });
  //   }
  //   fetchDeviceTokens().then((data) => {
  //     setAuthTokens(data?.accToken);
  //     setRefreshToken(data?.refToken);
  //     setIsFetchingtokens(false);
  //   });
  //   console.log("bachirex", AuthToken);
  // }, [AuthToken]);

  // useEffect(() => {
  //   // Fetch tokens stored in cookies and set them in state if available
  //   async function fetchDeviceTokens() {
  //     try {
  //       const tokens = await fetchTokens();
  //       setAuthTokens(tokens?.accToken ?? null);
  //       setRefreshToken(tokens?.refToken ?? null);
  //       const decodedAccessToken = parseJwt(tokens?.accToken ?? "");
  //       setUserCredentials((prev) => ({
  //         ...prev,
  //         email: decodedAccessToken?.sub, // replace with email
  //         firstname: decodedAccessToken?.firstname,
  //         lastname: decodedAccessToken?.lastname,
  //         role: decodedAccessToken?.role,
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching tokens:", error);
  //     } finally {
  //       setIsReady(true);
  //     }
  //   }
  //   fetchDeviceTokens();
  // }, []);

  // useEffect(() => {
  //   checkTokenExpiry();
  //   const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000); // Check every 5 minutes for token expiry
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // useEffect(() => {
  //   apiClient.addResponseTransform((response) => {
  //     if (response.status === 403) {
  //       refreshAccessToken();
  //     }
  //   });
  // }, []);

  // const checkTokenExpiry = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("access_token");
  //     var refToken;
  //     if (!accessToken) {
  //       refToken = await getDeviceCookie("refresh_token");
  //       if (!refToken)
  //         throw new Error("No access token or refresh token found");
  //       else {
  //         refreshAccessToken();
  //         return;
  //       }
  //     }

  //     const decodedToken = parseJwt(accessToken);
  //     // console.log(
  //     //   "Decoded token:",
  //     //   decodedToken,
  //     //   "\n before decode ",
  //     //   accessToken
  //     // );

  //     const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds

  //     const timeToExpiry = expiryTime - Date.now();
  //     const refreshTime = 1 * 60 * 1000; // 5 minutes before expiry
  //     // console.log(
  //     //   "Decoded token:",
  //     //   decodedToken,
  //     //   "timeToExpiry",
  //     //   timeToExpiry,
  //     //   "refreshTime",
  //     //   refreshTime
  //     // );

  //     if (timeToExpiry < refreshTime) {
  //       const response = await refreshAccessToken();
  //       console.log("Refreshed access token:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error checking token expiry:", error);
  //   }
  // };

  // const refrehAccessToken = async (): Promise<void> => {
  //   try {
  //     const oldRefreshToken = await getDeviceCookie("refresh_token");
  //     if (!oldRefreshToken) {
  //       throw new Error("Refresh token not found");
  //     }
  //     //console.log("Refreshing access token...", oldRefreshToken);

  //     const response = await RefreshToken(oldRefreshToken);

  //     if (response?.ok) {
  //       console.log("Refreshed access token:", response);
  //       const data: any = response?.data;
  //       setAuthTokens(data?.access_token);
  //       setRefreshToken(data?.refresh_token);
  //       //replace with cookies
  //       localStorage.setItem("access_token", data?.access_token);
  //       // localStorage.setItem("refresh_token", data?.refresh_token);
  //       //setDeviceCookie("access_token", data?.access_token);
  //       setDeviceCookie("refresh_token", data?.refresh_token);
  //       apiClient.setHeaders({
  //         Authorization: `Bearer ${data?.access_token}`,
  //       });
  //     } else {
  //       // Handle refresh token failure
  //       throw new Error("Failed to refresh access token");
  //     }
  //   } catch (error) {
  //     // Handle token refresh error
  //     console.error("Token refresh failed:", error);
  //     logout(); // Log out the user if token refresh fails
  //   }
  // };

  const contextValue = {
    AuthToken: AuthToken ?? null,
    RefreshToken: refreshToken ?? null,
    userCredentials: userCredentials ?? null,
    setAuthTokens,
    setRefreshToken,
    setUserCredentials,
    isReady,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
