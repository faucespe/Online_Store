import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse, CreateUpdatePurchaseOrderDto } from '@types';
import { PurchaseOrder } from '@models/purchaseOrder';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private http = inject(HttpClient);

  public createPurchaseOrder(purchaseOrder: CreateUpdatePurchaseOrderDto): Observable<ApiResponse<PurchaseOrder>> {
    return this.http.post<ApiResponse<PurchaseOrder>>('https://localhost:7044/api/purchase-orders', purchaseOrder);
  }
}
