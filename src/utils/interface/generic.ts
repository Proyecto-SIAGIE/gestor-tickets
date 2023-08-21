export interface IGenericResponse<T> {
    success: boolean;
    data?: T;
    code?: string;
    messages?: string[];
    total?: string;
}

export interface IPaginatedRequest<T> {
    filter?: T;
    page: number;
    size: number;
    source?: Array<any>;
    order?: { field: string, type: string };
}

//con 2 campos: sortBy (campo), sortOrder (ASC o DESC)
export interface IPaginatedResponse<T> {
    success: boolean;
    items?: Array<T>;
    recordsTotal: number;
    page: number;
    size: number;
}

