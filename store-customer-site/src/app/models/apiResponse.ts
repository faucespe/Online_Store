export interface ApiResponse {
    data: any[];
    messages?: string[];
    statusCode: number;
    success: boolean;
}