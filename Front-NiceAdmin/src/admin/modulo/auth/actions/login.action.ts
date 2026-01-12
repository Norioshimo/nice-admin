import { api } from "../../../../api/api";
import type { AuthResponse } from "../interfaces";



export const loginAction = async (usuario: string, clave: string): Promise<AuthResponse> => {

    try {
        const { data } = await api.post<AuthResponse>('/auth', {
            usuario,
            clave
        })

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}