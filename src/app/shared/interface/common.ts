export interface ErrorInterface {
    error: {
        message: string;
        success: boolean;
        status: number;
        data: any[];
    };
    message?: string;
}

export interface ResponseData {
    results: Array<UserDetails>
}

export interface UserDetails {
    name: Name,
    fullName: string;
}

export interface Name {
    first: string;
    last: string;
}
export interface PaginationParams {
    page: number;
    results: number;
    seed: string;
}