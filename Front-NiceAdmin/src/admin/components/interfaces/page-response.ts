export interface PageResponse<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;               // pageIndex
    numberOfElements: number;
    size: number;                 // pageSize
    totalElements: number;
    totalPages: number;
}
