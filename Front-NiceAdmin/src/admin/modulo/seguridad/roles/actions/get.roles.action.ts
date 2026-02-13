import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { RolesFilters, RolesPageResponse } from "../interfaces";



export const getRolesAction = async (params: RolesFilters = {}): Promise<RolesPageResponse> => {

    try {
        console.log(`getRolesAction: ${JSON.stringify(params)}`)

        const { data } = await api.get(`/roles/pagina`, {
            params: {
                page: 0,// Dato por defecto
                size: 10,// Dato por defecto
                sort: 'id,desc',// Dato por defcto
                ...params,// Se sobre escribe si hay datos de datos por defecto
            },
        });

        return data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }
}