import type { PropsWithChildren } from "react";
import { useAuthStore } from "../store/auth.store"; 
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: PropsWithChildren) => {
  console.log("PublicRoute");
  const { authStatus } = useAuthStore();

  if (authStatus === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return children;
};
