import { api } from "../../../../api/api";
import type { AuthResponse } from "../interfaces";



export const checkAuthAction = async (): Promise<AuthResponse> => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error('No hay token en el localstorage');

    try {
        const { data } = await api.get<AuthResponse>('/auth/check-status');
        return data;

    } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        throw new Error('Token expirado o no valido')
    }
}