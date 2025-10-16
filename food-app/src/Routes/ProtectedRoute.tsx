import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserAuth } from "@/Context/UserContext";
import config from "@/Config";
type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = UserAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to={config.routes.login} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
