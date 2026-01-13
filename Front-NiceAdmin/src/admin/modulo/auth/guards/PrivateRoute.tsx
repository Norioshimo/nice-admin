import { Navigate } from "react-router";
import type { PropsWithChildren } from "react";
import { useAuthStore } from "../store/auth.store";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  console.log("PrivateRoute");
  const { authStatus } = useAuthStore();

  if (authStatus !== "authenticated") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
