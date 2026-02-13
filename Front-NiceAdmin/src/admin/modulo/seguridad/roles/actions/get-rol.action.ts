import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { Roles } from "../interfaces";




export const getRolAction = async (id: string): Promise<Roles> => {

    try {
        const { data } = await api.get(`/roles/${id}`);

        console.log(data.data)

        return data.data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }
}