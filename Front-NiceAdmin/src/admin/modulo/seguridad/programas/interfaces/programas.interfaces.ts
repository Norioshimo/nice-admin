import type { ApiResponse, PageResponse } from "../../../../components/interfaces";

 
export interface Programas {
    id: number;
    nombre: string;
    createAt: string;
    updateAt: string | null;
}


export type ProgramasPageResponse = ApiResponse<PageResponse<Programas>>;
