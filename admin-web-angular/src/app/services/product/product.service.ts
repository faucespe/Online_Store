import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/http.types';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../http/environment';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private http = inject(HttpClient);

  public getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.apiURL + '/products',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
