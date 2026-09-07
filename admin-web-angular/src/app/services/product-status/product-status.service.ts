import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/http.types';

@Injectable({
  providedIn: 'root'
})
export class ProductStatusService {

  private http = inject(HttpClient);

  public getProductStatuses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      environment.apiURL + '/product-status'
    );
  }
}
