import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { Roles } from "../interfaces";


export const createUpdateRolAction = async (rol: Partial<Roles>): Promise<Roles> => {

 
  try {
    const { data } = await api<any>({
      url: `/roles${rol.id ? `/${rol.id}` : ''}`,
      method: rol.id ? 'PUT' : 'POST',
      data: {
        ...rol
      },
    });

    Swal.fire("Exito", data.message, "info");

    return {
      ...data.data
    }
  } catch (error) {
    console.log(error);

    if (!mensaje_api(error)) {
      Swal.fire("Error", "Error inesperado...", "error");
    }
    throw error;
  }

}
