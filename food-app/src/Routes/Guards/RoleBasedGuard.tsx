import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserAuth } from "@/Context/UserContext";
import config from "@/Config";

export interface RoleBasedGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({
  children,
  allowedRoles,
}) => {
  const location = useLocation();
  const { isLoggedIn, user } = UserAuth();
  if (!isLoggedIn()) {
    return (
      <Navigate to={config.routes.login} state={{ from: location }} replace />
    );
  }
  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }
  return <Navigate to={config.routes.login} replace />;
};

export default RoleBasedGuard;
