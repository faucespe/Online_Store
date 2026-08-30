//Formato de Respuesta
export interface ApiResponse<> {
    httpStatusCode: number;
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
