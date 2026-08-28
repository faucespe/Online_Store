import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { ApiResponse,HttpOptions } from './http.types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public get<T>(url: string, options?: HttpOptions): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.apiUrl, options);
  }
}
