import { Component, signal, inject, computed, OnInit, OnDestroy, effect } from '@angular/core';
import { CartService } from '@services/cart/cart.service';
import { PurchaseOrderService } from '@services/purchaseOrder/purchase-order.service';
import { CartProduct, CreatePurchaseOrderProductDto, CreatePurchaseOrderDto } from '@types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidationTranslatorService } from '@shared/translator/validation-translator.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.css',
})
export class CheckoutPage implements OnDestroy, OnInit {

  private validationTranslator = inject(ValidationTranslatorService);

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

  protected onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement
    const onlyDigits = input.value.replace(/\D/g, '');
    input.value = onlyDigits;
    this.customerPhoneNumber.set(onlyDigits);
  }

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

    let cartProductsList: CreatePurchaseOrderProductDto[] = this.cartProducts().map((cp: CartProduct) => ({productId: cp.id, productQuantity: cp.quantity}));

    let purchaseOrderDetails: CreatePurchaseOrderDto = {
      customerName: this.customerName(),
      customerPhoneNumber: this.customerPhoneNumber(),
      customerEmail: this.customerEmail(),
      customerAddress: this.customerAddress(),
      purchaseOrderProduct: cartProductsList,
    }

    this.purchaseOrderService.createPurchaseOrder(purchaseOrderDetails).subscribe({
      next: (apiResponse) => {
        this.messages.set([]);

        if (apiResponse.success) {
          this.cartService.emptyCart();
          this.showPurhcaseOrderCreationModal.set(true);
        } else {
          const translated = (apiResponse.messages ?? []).map(m => this.validationTranslator.translate(m));
          this.messages.set(translated);
        }
      },
      error: (error: {error: { messages?: string[] } }) => {
        const rawMessages = error.error?.messages ?? ['Ocurrió un error al procesar la compra.'];
        const translated = rawMessages.map(m => this.validationTranslator.translate(m))
        this.messages.set(translated);
      }
    });    
  };

  public ngOnInit(): void {
    this.subscriptions.add(this.cartService.subjectCart.subscribe((cartProducts: CartProduct[]) => {
      this.cartProducts.set(cartProducts);
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
