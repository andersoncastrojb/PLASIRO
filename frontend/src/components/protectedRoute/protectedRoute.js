import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  user,
  permissions,
  redirectTo = "/",
  children,
}) => {
  if (!user.permissions.includes(permissions)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};