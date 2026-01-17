import { create } from "zustand";
import type { Usuario } from "../../../interfaces";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

interface AuthState {
    // Properties
    user: Usuario | null;
    token: string | null;
    authStatus: AuthStatus;
    permissions: string[];// permisos que tiene el usuario logueado

    // Getters 

    // Actions
    login: (user: string, clave: string) => Promise<Map<string, any>>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    hasPermission: (permission: string) => boolean;// Validar si tiene el permiso
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Implementación del store
    user: null,
    token: null,
    authStatus: 'checking',
    permissions: [],

    // Getters

    // Actions
    login: async (user: string, clave: string) => {
        console.log({ user, clave });

        const returnData = new Map();
        try {

            const data = await loginAction(user, clave);
            console.log(data)
            returnData.set("message", data.message);

            if (data.status != 200) {
                returnData.set("valido", false);

                localStorage.removeItem('token');
                set({ user: null, token: null, permissions: [], authStatus: 'not-authenticated' });
            } else {// Logueado
                returnData.set("valido", true);
                localStorage.setItem('token', data.data.token);
                set({
                    user: {// Se guarda el objeto de usuario
                        id: data.data.id,
                        nombre: data.data.nombre,
                        usuario: data.data.usuario
                    },
                    permissions: [],//Asignar todos los permisos
                    token: data.data.token, authStatus: 'authenticated'
                });
            }
            return returnData;
        } catch (error) {
            returnData.set("valido", false);
            console.error(`Error inesperado:`, error)
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return returnData;
        }
    },

    logout: () => {
        console.log('Cerrar Sesión');
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
    },

    checkAuthStatus: async () => {
        try {
            console.log('checkAuthStatus')
            const { data } = await checkAuthAction();
            localStorage.setItem('token', data.token);
            set({
                user: {// Se guarda el objeto de usuario
                    id: data.id,
                    nombre: data.nombre,
                    usuario: data.usuario
                },
                token: data.token,
                permissions: [],//Asignar todos los permisos
                authStatus: 'authenticated',
            });
            console.log('authenticated')
            return true;
        } catch (error) {
            console.log('no estás autenticado. not-authenticated')
            set({
                user: undefined,
                token: undefined,
                permissions: [],
                authStatus: 'not-authenticated',
            });

            return false;
        }
    },

    hasPermission: (permission) => {
        return get().permissions.includes(permission);
    }
}))