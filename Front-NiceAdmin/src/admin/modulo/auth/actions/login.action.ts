
import Swal from "sweetalert2";
import { api } from "../../../../api/api";
import type { AuthResponse } from "../interfaces";
import { mensaje_api } from "../../../../api";



export const loginAction = async (usuario: string, clave: string): Promise<AuthResponse> => {

    try {
        const { data } = await api.post<AuthResponse>('/auth', {
            usuario,
            clave
        })

        return data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }
}