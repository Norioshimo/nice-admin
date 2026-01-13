import Swal from "sweetalert2";

export type ApiErrorType =
    | "NETWORK_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "SERVER_ERROR"
    | "HTTP_ERROR";


export interface ApiError {
    type: ApiErrorType;
    message: string;
    status?: number;
    originalError?: unknown;
}


export const mensaje_api = (error: any): boolean => {

    const err = error as ApiError;

    if (err.type === "NETWORK_ERROR") {
        Swal.fire("Servidor caído", err.message, "error");
        return true;
    }


    if (err.type === "UNAUTHORIZED") {
        Swal.fire("Sesión expirada", err.message, "warning");
        return true;
    }

    return false;
}