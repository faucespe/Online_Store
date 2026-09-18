import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse, ProductFilter } from '@types';
import { Product } from '@models/product/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  public getProducts(filter?: ProductFilter): Observable<ApiResponse<Product[]>> {
    const params = {
        name: filter?.name ?? '',
        minPrice: filter?.minPrice ?? '',
        maxPrice: filter?.maxPrice ?? '',
        categoryId: filter?.categoryId ?? ''
    };

    return this.http.get<ApiResponse<Product[]>>(`${environment.apiURL}/products`, 
      { params }
    );
  }
}
