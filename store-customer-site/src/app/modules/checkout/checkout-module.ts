import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing-module';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { FormField } from '@angular/forms/signals';
import { SharedModule } from '@shared/shared-module';

@NgModule({
  declarations: [CheckoutPage],
  imports: [CommonModule, CheckoutRoutingModule, FormField, SharedModule],
})
export class CheckoutModule {}
