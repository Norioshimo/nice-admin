import { appRouter } from "./routes/app.router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "./admin/modulo/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { AuthGate } from "./admin/components/guards/AuthGate";
import { CustomFullScreenLoading } from "./admin/components/utils";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading, isFetching } = useQuery({
    queryKey: ["auth"], // Es un identificador unico para este query. Lo usa para cachear, invalidar etc. auth indica que tiene que ver con el estado de authencication.
    queryFn: checkAuthStatus, // Puede ser una llamada al backend para validar el token, o verificar el estado local en Zustand. React Query ejecuta esta función automáticamente y guarda el resultado en su cache.
    retry: false, // Por defecto, React Query reintenta queries fallidas automáticamente (3 veces). Aquí lo desactivas para que no haga reintentos automáticos.
    refetchInterval: 1000 * 60 * 5, // La query se refresca automáticamente cada cierto tiempo. 1000 * 60 * 5 → 300000 ms → 5 minuto. Útil para mantener el estado de autenticación actualizado.
    //staleTime: 1000 * 60 * 1, // 1 minutos
    refetchOnWindowFocus: true, // React Query vuelve a ejecutar la query cada vez que la ventana del navegador vuelve a estar activa. Esto asegura que si el usuario regresa a la pestaña, su estado de auth esté actualizado.
  });

  if (isLoading) return <CustomFullScreenLoading />; // Solo bloquear pantalla si todavía no tenemos datos

  // Si ya hay datos, podemos mostrar la UI y un pequeño spinner si se está refetchando
  return (
    <>
      {children}
      {isFetching && <h1>cargando...</h1>}
    </>
  );
};

export const AdminNice = () => {
  return (
    <>
      <AuthGate>
        <QueryClientProvider client={queryClient}>
          {/* Custom Provider */}
          <CheckAuthProvider>
            <RouterProvider router={appRouter} />
          </CheckAuthProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthGate>
    </>
  );
};
