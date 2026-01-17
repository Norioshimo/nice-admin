import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../api";
import type { PerfilResponse } from "../interfaces";



export const getUserPerfilAction = async (usuarioid: number): Promise<PerfilResponse> => {

    try {
        const { data } = await api.get<any>(`/usuarios/perfil/${usuarioid}`);

        console.log(`Data getUserPerfil: `, data);

        return data.data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }
}