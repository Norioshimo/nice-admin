import { create } from "zustand";
import type { Usuario } from "../../../interfaces";
import { loginAction } from "../actions/login.action";
import Swal from "sweetalert2";
import { checkAuthAction } from "../actions/check-auth.action";

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

interface AuthState {
    // Properties
    user: Usuario | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters 

    // Actions
    login: (user: string, clave: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Implementación del store
    user: null,
    token: null,
    authStatus: 'checking',

    // Getters

    // Actions
    login: async (user: string, clave: string) => {
        console.log({ user, clave });

        try {
            const data = await loginAction(user, clave);
            console.log(data)


            let valido = false;
            if (data.status != 200) {
                Swal.fire({
                    title: "Error de Autenticación",
                    text: data.message,
                    icon: "error",
                });
                valido = false;
                localStorage.removeItem('token');
                set({ user: null, token: null, authStatus: 'not-authenticated' });
            } else {
                valido = true;
                localStorage.setItem('token', data.data.token);
                set({
                    user: {// Se guarda el objeto de usuario
                        id: data.data.id,
                        nombre: data.data.nombre,
                        usuario: data.data.usuario
                    },
                    token: data.data.token, authStatus: 'authenticated'
                });
            }
            return valido;
        } catch (error) {
            console.error(`Error inesperado:`, error)
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
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
                authStatus: 'authenticated',
            });
            return true; 
        } catch (error) {
            console.log('no estás autenticado')
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated',
            });

            return false;
        }
    },
}))