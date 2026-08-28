export interface ApiResponse {
    statusCode: number;
    success: boolean;
    messages: string[];
    data: any[];
}

export interface QueryParams {
    [name: string]: any;
}

export interface HttpOptions {
    params?: QueryParams;
 }
