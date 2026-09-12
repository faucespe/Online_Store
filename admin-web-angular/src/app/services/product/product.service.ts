import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/http.types';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FilterProductDTO, InsertUpdateProductDTO } from '@models/product/product.dto';
import { Product } from '@models/product/product.model';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private http = inject(HttpClient);

  //Esta solicitud a la API se utiliza para el despliegue de los datos en los filtros del producto
  public getProducts(filter?: FilterProductDTO): Observable<ApiResponse> {
    const params = {
        name: filter?.name ?? '',
        minPrice: filter?.minPrice ?? '',
        maxPrice: filter?.maxPrice ?? '',
        categoryId: filter?.categoryId ?? '',
        productStatusId: filter?.productStatusId ?? ''
    };

    return this.http.get<ApiResponse>(
        environment.apiURL + '/products',
        { params }
    );
  }

  //Solictud Post HTTP
  public createProduct(product: Product): Observable<ApiResponse> {
    const dto = new InsertUpdateProductDTO(product);
    return this.http.post<ApiResponse>(
        environment.apiURL + '/products',
        dto
    );
  }

  //Solicitud Put HTTP
  public updateProduct(product: Product): Observable<ApiResponse> {
    const dto = new InsertUpdateProductDTO(product);
    return this.http.put<ApiResponse>(
        environment.apiURL + `/products/${product.id}`,
        dto
    );
  }
}
