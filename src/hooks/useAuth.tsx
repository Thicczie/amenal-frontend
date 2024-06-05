// import React, { useContext, useDebugValue } from "react";
// import { authType, useAuthContext } from "../contexts/AuthContextProvider";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

// const useAuth = () => {
//   const { auth } = useAuthContext();
//   useDebugValue(auth, (auth) => (auth?.token ? "Logged In" : "Logged Out"));
//   return useAuthContext();
// };

// export default useAuth;

// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContextProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default useAuth;
