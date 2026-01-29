import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { ProgramasPageResponse } from "../interfaces";

export const getProgramasAction = async (
    page = 0,
    size = 10,
    sort = "id,desc"
): Promise<ProgramasPageResponse> => {

    try {
        const { data } = await api.get(`/programas/pagina`, {
            params: { page, size, sort },
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