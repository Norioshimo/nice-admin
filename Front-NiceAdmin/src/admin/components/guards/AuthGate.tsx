import { useEffect, type PropsWithChildren } from "react";
import { useAuthStore } from "../../modulo/auth/store/auth.store";

export const AuthGate = ({ children }: PropsWithChildren) => {
  console.log("AuthGate");
  const { authStatus, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (authStatus === "checking") {
    //return <div>Cargando sesión...</div>;
  }

  return children;
};
