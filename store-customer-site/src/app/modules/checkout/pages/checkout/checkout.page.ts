import { Component, signal } from '@angular/core';
import { form, email, required } from '@angular/forms/signals';
import { CheckoutData } from '@checkout/types/checkout.types';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.css',
})
export class CheckoutPage {
  public checkoutModel = signal<CheckoutData>({
    customerPhoneNumber: '',
    customerEmail: '',
    customerAddress: '',
    customerName: '',
  });

  protected checkoutForm = form(this.checkoutModel, (schemaPath) => {
    required(schemaPath.customerAddress, {message: 'Email is required'});
    email(schemaPath.customerAddress, {message: 'Enter a valid email address'});
  });
}
