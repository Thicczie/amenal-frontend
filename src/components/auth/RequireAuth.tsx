import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};

const RequireAuth = (props: Props) => {
  const { authTokens } = useAuth();
  useEffect(() => {
    console.log("RequireAuthAAAAAAAAAAAAAAAAAAAAAAAAAAaa", authTokens);
  }, []);
  return authTokens ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default RequireAuth;
