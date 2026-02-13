import type { ApiResponse, PageResponse } from "../../../../components/interfaces";

export interface Roles {
    id: number;
    nombre: string;
    estado: boolean;
    descripcion:string;
    createAt: string;
    updateAt: string | null;
    rolprogramaList: RolprogramaList[];
}


export interface RolprogramaList {
    id?: number,
    programaId: number
    canCreate: boolean,
    canDelete: boolean,
    canUpdate: boolean,
}



export type RolesPageResponse = ApiResponse<PageResponse<Roles>>;