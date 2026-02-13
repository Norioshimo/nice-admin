import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { Programas } from "../interfaces";



export const getProgramasFullAction = async (): Promise<Programas[]> => {

    try {
        console.log(`getProgramasFullAction `)

        const { data } = await api.get(`/programas`, {});

        return data.data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }
}