import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";
import { LoginPage } from "./admin/modulo/auth/pages/login/LoginPage";
import { UsuariosPage } from "./admin/modulo/seguridad/pages/usuarios/UsuariosPage";
 
import { NotFount } from "./admin/error/NotFount";
import { ProductoPage } from "./admin/modulo/mantenimiento/pages/productos/ProductoPage";
import { HomePage } from "./admin/modulo/home/HomePage";
import { ProgramaPage } from "./admin/modulo/mantenimiento/pages/programas/ProgramaPage";

const AdminLayout = lazy(() => import("./admin/modulo/layouts/AdminLayout"));
const AuthLayout = lazy(() => import("./admin/modulo/layouts/AuthLayout"));

export const appRouter = createHashRouter([
  // Rutas de autenticacion
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },

  // Rutas de mantenimiento
  {
    path: "/mantenimiento",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/" />,
      },
      {
        path: "productos",
        element: <ProductoPage />,
      },
    ],
  },

  // Rutas de seguridad
  {
    path: "/seguridad",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/" />,
      },
      {
        path: "usuarios",
        element: <UsuariosPage />,
      },
       {
        path: "programas",
        element: <ProgramaPage />,
      },
    ],
  },

  // Ruta de home o pagina principal
  {
    path: "",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
    ],
  },

  // Ruta para manejar paginas no encontradas
  {
    path: "*",
    element: <NotFount />,
  },
]);
