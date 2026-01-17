
import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../api";

export interface UpdatePasswordInput {
    id: number;
    clave: string;
}


export const updatePasswordAction = async (dato: UpdatePasswordInput): Promise<any> => {

    try {
        const { data } = await api.put('/usuarios/change-password', dato);


        return { ...data };
    } catch (error) {
        console.log(error);

        if (!mensaje_api(error)) {
            Swal.fire("Error", "Error inesperado...", "error");
        }
        throw error;
    }

}