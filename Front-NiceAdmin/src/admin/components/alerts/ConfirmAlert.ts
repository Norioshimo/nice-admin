import type { SweetAlertIcon } from "sweetalert2";
import Swal from "sweetalert2";



  interface ConfirmAlertParams {
    title?: string;
    text?: string;
    icon?: SweetAlertIcon;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
}

export const ConfirmAlert = async ({
    title = "¿Estás seguro?",
    text = "Esta acción no se puede deshacer",
    icon = "warning",
    confirmButtonText = "Sí, eliminar",
    cancelButtonText = "Cancelar",
    confirmButtonColor = "#d33",
    cancelButtonColor = "#3085d6",
}: ConfirmAlertParams): Promise<boolean> => {

    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        confirmButtonColor,
        cancelButtonColor,
        reverseButtons: true,
    });

    return result.isConfirmed;
};
