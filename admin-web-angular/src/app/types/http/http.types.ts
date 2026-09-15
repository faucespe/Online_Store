//Formato de Respuesta
export interface ApiResponse<T = any> {
    httpStatusCode: number;
    success: boolean;
    messages: string[];
    data: T[];
}

export interface QueryParams {
    [name: string]: any;
}

export interface HttpOptions {
    params?: QueryParams;
 }
