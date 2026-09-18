import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse, CreatePurchaseOrderDto } from '@types';
import { PurchaseOrder } from '@models/purchaseOrder/purchaseOrder';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private http = inject(HttpClient);

  public createPurchaseOrder(purchaseOrder: CreatePurchaseOrderDto): Observable<ApiResponse<PurchaseOrder>> {
    return this.http.post<ApiResponse<PurchaseOrder>>(`${environment.apiURL}/purchase-orders`, purchaseOrder);
  }
}
