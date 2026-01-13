import { lazy } from "react";
import { createHashRouter } from "react-router";
import { LoginPage } from "./admin/modulo/auth/pages/login/LoginPage";
import { UsuariosPage } from "./admin/modulo/seguridad/pages/usuarios/UsuariosPage";

import { NotFount } from "./admin/error/NotFount";
import { ProductoPage } from "./admin/modulo/mantenimiento/pages/productos/ProductoPage";
import { HomePage } from "./admin/modulo/home/HomePage";
import { ProgramaPage } from "./admin/modulo/mantenimiento/pages/programas/ProgramaPage";  
import { PrivateRoute, PublicRoute } from "./admin/modulo/auth/guards";

const AdminLayout = lazy(() => import("./admin/modulo/layouts/AdminLayout"));
const AuthLayout = lazy(() => import("./admin/modulo/layouts/AuthLayout"));

export const appRouter = createHashRouter([
  // Login. Tiene router publica
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: "login", element: <LoginPage /> },
    ],
  },
  // Routers protegidas
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "seguridad/usuarios", element: <UsuariosPage /> },
      { path: "seguridad/programas", element: <ProgramaPage /> },
      { path: "mantenimiento/productos", element: <ProductoPage /> },
    ],
  },
  { path: "*", element: <NotFount /> },
]);
