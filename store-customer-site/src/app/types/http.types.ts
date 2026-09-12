export type ApiResponse<T> = {
    data: T;
    messages?: string[];
    statusCode: number;
    success: boolean;
}