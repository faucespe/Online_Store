import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';
import { PurchaseOrdersRoutingModule } from './purchase-orders-routing-module';
import { PurchaseOrdersPage } from './pages/purchase-orders/purchase-orders.page';

@NgModule({
  declarations: [PurchaseOrdersPage],
  imports: [
    CommonModule,
    PurchaseOrdersRoutingModule,
    SharedModule,
  ]
})
export class PurchaseOrdersModule { }