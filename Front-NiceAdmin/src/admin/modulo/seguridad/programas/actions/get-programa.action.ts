import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { Programas  } from "../interfaces";




export const getProgramaAction = async (id: string): Promise<Programas> => {

    try {
        const { data } = await api.get(`/programas/${id}`);

        return data.data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }
}