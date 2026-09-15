import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '@types';
import { Product } from '@models/product/product'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  public getProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>('https://localhost:7044/api/products', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
