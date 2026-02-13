
import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";


export const deleteRolAction = async (id: number): Promise<string> => {
    try {
        console.log(`Eliminar rol con el id ${id}`)
        const { data } = await api.delete(`/roles/${id}`);
 
        if (data.status != 200) {
            Swal.fire("Error", data.message, "error");
        } else {
            Swal.fire("Exito", data.message, "success");

        }

        return data;
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }

}
