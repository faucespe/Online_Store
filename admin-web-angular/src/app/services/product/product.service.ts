import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/http.types';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../http/environment';
import { FilterProductDTO, InsertUpdateProductDTO } from '@models/product/product.dto';
import { Product } from '@models/product/product.model';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private http = inject(HttpClient);

  public getProducts(filter?: FilterProductDTO): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(
          environment.apiURL + '/products',
          {
              params: filter as any
          }
      );
    }
      public createProduct(product: Product): Observable<ApiResponse> {
    const dto = new InsertUpdateProductDTO(product);
    return this.http.post<ApiResponse>(
        environment.apiURL + '/products',
        dto
    );
  }

  public updateProduct(product: Product): Observable<ApiResponse> {
    const dto = new InsertUpdateProductDTO(product);
    return this.http.put<ApiResponse>(
        environment.apiURL + `/products/${product.id}`,
        dto
    );
  }
}
