import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrdersPage } from './pages/purchase-orders/purchase-orders.page';

const routes: Routes = [
  { path: '', component: PurchaseOrdersPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrdersRoutingModule {}
