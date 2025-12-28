export interface ApiError {
    status: number;
    data: {
        errorCode: string;
        errorMessage: string;
        status: number;
    }
}