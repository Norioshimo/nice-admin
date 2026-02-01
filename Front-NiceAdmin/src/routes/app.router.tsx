import { lazy } from "react"; 
import { createHashRouter } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "../admin/modulo/auth/guards";
 

import { seguridadRoutes } from "./seguridad.routes";
import { mantenimientoRoutes } from "./mantenimiento.routes";

const AdminLayout = lazy(() => import("../admin/modulo/layouts/AdminLayout"));
const AuthLayout = lazy(() => import("../admin/modulo/layouts/AuthLayout"));

const LoginPage = lazy(() => import('../admin/modulo/auth/pages/login/LoginPage')); 
const HomePage = lazy(() => import('../admin/modulo/home/HomePage')); 

const NotFount = lazy(() => import('../admin/error/NotFount')); 

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
      { path: "seguridad", children: seguridadRoutes },

      // Mantenimientos
      { path: "mantenimiento", children: mantenimientoRoutes },
    ],
  },
  // Rutas invalidos
  {
    path: "*",
    element: <NotFount />,
  },
]);
