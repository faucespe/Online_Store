import { Component, signal, inject, computed, OnInit, OnDestroy, effect } from '@angular/core';
import { CartService } from '@services/cart/cart.service';
import { PurchaseOrderService } from '@services/purchaseOrder/purchase-order.service';
import { CartProduct, PurchaseOrderCartProduct, CreateUpdatePurchaseOrderDto } from '@types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.css',
})
export class CheckoutPage implements OnDestroy, OnInit {
  protected customerName = signal<string>('');
  protected customerEmail = signal<string>('');
  protected customerPhoneNumber = signal<string>('');
  protected customerAddress = signal<string>('');
  protected messages = signal<string[]>([]);

  protected subscriptions: Subscription;
  protected cartProducts = signal<CartProduct[]>([]);
  protected grandTotal = computed(() => this.cartProducts().reduce((total, product) => total + (product.price * product.quantity), 0))

  private cartService = inject(CartService);
  private purchaseOrderService = inject(PurchaseOrderService);
  protected router = inject(Router);

  protected disableButton = signal<boolean>(true);
  protected showPurhcaseOrderCreationModal = signal<boolean>(false);

  constructor() {
    this.subscriptions = new Subscription();

    effect(() => {
      if (this.customerName() && this.customerEmail() && this.customerAddress() && this.customerPhoneNumber()) {
        this.disableButton.set(false);
      }
      else {
        this.disableButton.set(true);
      }
    })
  }

  protected async savePurchaseOrder(event: Event) {
    event.preventDefault();

    let cartProductsList: PurchaseOrderCartProduct[] = this.cartProducts().map((cp: CartProduct) => ({productId: cp.id, quantity: cp.quantity}));

    let purchaseOrderDetails: CreateUpdatePurchaseOrderDto = {
      customerName: this.customerName(),
      customerPhoneNumber: this.customerPhoneNumber(),
      customerEmail: this.customerEmail(),
      customerAddress: this.customerAddress(),
      cartProducts: cartProductsList,
    }

    this.purchaseOrderService.createPurchaseOrder(purchaseOrderDetails).subscribe((apiResponse) => {
      this.messages.set([]);

      if(apiResponse.success) {
        this.cartService.emptyCart();
        this.showPurhcaseOrderCreationModal.set(true);
      } else {
        this.messages.set(apiResponse.messages ?? []);
      }
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.cartService.subjectCart.subscribe((cartProducts: CartProduct[]) => {
      this.cartProducts.set(cartProducts);
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
