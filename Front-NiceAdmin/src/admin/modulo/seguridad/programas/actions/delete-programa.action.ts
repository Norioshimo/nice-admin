
import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";


export const deleteProgramaAction = async (id: number): Promise<string> => {
    try {
        console.log(`Eliminar programa con el id ${id}`)
        const { data } = await api.delete(`/programas/${id}`);

        Swal.fire("Exito", data.message, "success");

        return data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }

}
