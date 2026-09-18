import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing-module';
import { ProductsPage } from './pages/products/products.page';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule,SharedModule],
  declarations: [ProductsPage],
})
export class ProductsModule {}
