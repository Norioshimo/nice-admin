import { lazy } from 'react';

 
const ProductoPage = lazy(() => import('../admin/modulo/mantenimiento/productos/pages/ProductoPage'));  
 


export const mantenimientoRoutes = [
  { path: 'productos', element: <ProductoPage /> },
];