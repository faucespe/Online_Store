import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing-module';
import { CartPage } from './pages/cart/cart.page';
import { SharedModule } from '@shared/shared-module';

@NgModule({
  declarations: [CartPage],
  imports: [CommonModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
