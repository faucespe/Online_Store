import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  public getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://localhost:7044/api/products', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
