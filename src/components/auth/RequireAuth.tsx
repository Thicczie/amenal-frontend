import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowedRoles?: string[] | string;
};

const RequireAuth = (props: Props) => {
  const { AuthToken, userCredentials } = useAuth();
  const userRole = userCredentials?.role || "";
  console.log("userRole", userCredentials);

  if (!AuthToken) {
    return <Navigate to="/signin" replace />;
  }

  if (props.allowedRoles == "all") return <Outlet />;
  // if (props.allowedRoles && !props.allowedRoles.includes(userRole)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }
};

export default RequireAuth;
