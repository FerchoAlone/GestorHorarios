import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  children,
  redirectTo = "/login",
}) => {
  if (!isAllowed) {
    console.log("Redirecting to ", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }
  return children ? children : <Outlet />;
};
