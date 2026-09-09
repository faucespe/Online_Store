import { Observable } from "rxjs";
import { ApiResponse } from "@models/http.types";
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PurchaseOrder } from "@models/purchase-order.model";
import { PurchaseOrderFilters } from "@models/purchase-order-filters.model";

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private http = inject(HttpClient);

  public getPurchaseOrders(filters?: PurchaseOrderFilters): Observable<ApiResponse<PurchaseOrder[]>> {
    let params = new HttpParams();

    if (filters?.id) {
      params = params.set('Id', filters.id.toString());
    }
    if (filters?.customerName) {
      params = params.set('CustomerName', filters.customerName);
    }
    if (filters?.customerPhoneNumber) {
      params = params.set('CustomerPhoneNumber', filters.customerPhoneNumber);
    }
    if (filters?.purchaseDateFrom) {
      params = params.set('PurchaseDateFrom', filters.purchaseDateFrom);
    }
    if (filters?.purchaseDateTo) {
      params = params.set('PurchaseDateTo', filters.purchaseDateTo);
    }
    if (filters?.grandTotalFrom) {
      params = params.set('GrandTotalFrom', filters.grandTotalFrom.toString());
    }
    if (filters?.grandTotalTo) {
      params = params.set('GrandTotalTo', filters.grandTotalTo.toString());
    }

    return this.http.get<ApiResponse<PurchaseOrder[]>>(environment.apiURL + '/purchase-orders', {
      headers: { 'Content-Type': 'application/json' },
      params
    });
  }
}