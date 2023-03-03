import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, useUserAdmin } from "../hooks/use-auth";

const PrivateRoutes = ({ children, ...rest }) => {
  const { isAuth } = useAuth();
  const { adminLogin } = useUserAdmin();
  return isAuth && adminLogin ? <Outlet /> : <Navigate to="*" />;
};

export default PrivateRoutes;
