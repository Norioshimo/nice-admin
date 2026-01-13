import axios, { AxiosError } from "axios";
import type { ApiError } from "./api-error";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError): Promise<ApiError> => {
    /* Backend no responde / error de red */
    if (!error.response) {
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "No se pudo conectar con el servidor",
        originalError: error,
      });
    }

    const status = error.response.status;

    switch (status) {
      case 401:
        localStorage.removeItem("token");// Si la sessión está expirado eliminar el token de localstorage
        return Promise.reject({
          type: "UNAUTHORIZED",
          message: "Sesión expirada o no autorizada",
          status,
        });

      case 403:
        return Promise.reject({
          type: "FORBIDDEN",
          message: "Acceso denegado",
          status,
        });

      case 404:
        return Promise.reject({
          type: "NOT_FOUND",
          message: "Recurso no encontrado",
          status,
        });

      case 500:
        return Promise.reject({
          type: "SERVER_ERROR",
          message: "Error interno del servidor",
          status,
        });

      default:
        return Promise.reject({
          type: "HTTP_ERROR",
          message: (error.response.data as any)?.message || "Error inesperado",
          status,
        });
    }
  }
);
