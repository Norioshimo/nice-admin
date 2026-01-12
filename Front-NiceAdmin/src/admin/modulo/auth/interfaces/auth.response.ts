export interface AuthResponse {
    data: AuthResponseData;
    message: string;
    status: number;
    timestamp: Date;
}

export interface AuthResponseData {
    token: string;
    id: number;
    usuario: string;
    nombre: string;
}
