import { lazy } from "react";   


const PerfilPage = lazy(() => import('../admin/modulo/auth/pages/perfil/PerfilPage'));  
 

const UsuariosPage = lazy(() => import('../admin/modulo/seguridad/usuarios/pages/UsuariosPage'));  
const ProgramaPage = lazy(() => import('../admin/modulo/seguridad/programas/pages/ProgramaPage'));  
const ProgramaForm = lazy(() => import('../admin/modulo/seguridad/programas/pages/ProgramaForm'));  
 


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
];