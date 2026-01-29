import Swal from "sweetalert2";
import { api, mensaje_api } from "../../../../../api";
import type { Programas } from "../interfaces";


export const createUpdateProgramaAction = async (programa: Partial<Programas>): Promise<Programas> => {


  try {
    const { data } = await api<any>({
      url: `/programas${programa.id ? `/${programa.id}` : ''}`,
      method: programa.id ? 'PUT' : 'POST',
      data: {
        ...programa
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
