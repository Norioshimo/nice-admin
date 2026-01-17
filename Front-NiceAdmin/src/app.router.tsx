import { lazy } from "react";
import { createHashRouter } from "react-router";

import { PrivateRoute, PublicRoute } from "./admin/modulo/auth/guards";

import { HomePage } from "./admin/modulo/home/HomePage";
import { LoginPage, PerfilPage } from "./admin/modulo/auth/pages";
import { ProgramaPage, UsuariosPage } from "./admin/modulo/seguridad/pages";
import { ProductoPage } from "./admin/modulo/mantenimiento/pages";
import { NotFount } from "./admin/error"; 

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
    children: [{ path: "login", element: <LoginPage /> }],
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

      // Seguridad
      { path: "seguridad/perfil", element: <PerfilPage /> },
      { path: "seguridad/usuarios", element: <UsuariosPage /> },
      { path: "seguridad/programas", element: <ProgramaPage /> },

      // Mantenimientos
      { path: "mantenimiento/productos", element: <ProductoPage /> },
    ],
  },
  // Rutas invalidos
  {
    path: "*",
    element: <NotFount/>
  },
]);
