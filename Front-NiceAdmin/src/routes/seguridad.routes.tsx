import { lazy } from "react";   


const PerfilPage = lazy(() => import('../admin/modulo/auth/pages/perfil/PerfilPage'));  
 
// Usuario
const UsuariosPage = lazy(() => import('../admin/modulo/seguridad/usuarios/pages/UsuariosPage'));  

// Programa
const ProgramaPage = lazy(() => import('../admin/modulo/seguridad/programas/pages/ProgramaPage'));  
const ProgramaForm = lazy(() => import('../admin/modulo/seguridad/programas/pages/ProgramaForm'));  
 
// Roles
const RolPage = lazy(() => import('../admin/modulo/seguridad/roles/pages/RolPage'));  
const RolForm = lazy(() => import('../admin/modulo/seguridad/roles/pages/RolForm'));  

export const seguridadRoutes = [
  { path: 'perfil', element: <PerfilPage /> },
  { path: 'usuarios', element: <UsuariosPage /> },
  {
    path: 'programas',
    children: [
      { index: true, element: <ProgramaPage /> },
      { path: 'new', element: <ProgramaForm /> },
      { path: ':id/edit', element: <ProgramaForm /> },
    ],
  },
  {
    path: 'roles',
    children: [
      { index: true, element: <RolPage /> }, 
      { path: 'new', element: <RolForm /> }, 
      { path: ':id/edit', element: <RolForm /> }, 
    ],
  },
];