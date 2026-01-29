import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { ProgramasFilters, ProgramasPageResponse } from "../interfaces";



export const getProgramasAction = async (params: ProgramasFilters = {}): Promise<ProgramasPageResponse> => {

    try {
        console.log(`getProgramasAction: ${JSON.stringify(params)}`)

        const { data } = await api.get(`/programas/pagina`, {
            params: {
                pageIndex: 0,// Dato por defecto
                pageSize: 10,// Dato por defecto
                sorting: 'id,desc',// Dato por defcto
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