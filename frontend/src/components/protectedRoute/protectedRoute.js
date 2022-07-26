import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  user,
  permissions,
  redirectTo = "/",
  children,
}) => {
  if (!permissions.includes(user.permissions)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};