import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartService } from '@services/cart/cart.service';
import { CartProduct } from '@types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.css',
})
export class CartPage implements OnDestroy, OnInit {
  private cartService = inject(CartService);
  protected cartProducts = signal<CartProduct[]>([]);
  protected cartTotalItemsCounter = signal<number>(0);
  protected subscriptions: Subscription;
  protected grandTotal = computed(() => this.cartProducts().reduce((total, product) => total + (product.price * product.quantity), 0))

  protected increaseProductQuantityById(productId: number) {
    this.cartService.increaseProductQuantityById(productId);
  }

  protected canIncreaseProductQuantity(item: CartProduct): boolean {
    return item.quantity < item.stock;
  }

  protected removeProduct(idProduct: number, quantityToRemove: number): void {
    this.cartService.removeProduct(idProduct, quantityToRemove);
  }

  protected emptyCart(): void {
    this.cartService.emptyCart();
  }

  constructor() {
    this.subscriptions = new Subscription();
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.cartService.subjectCart.subscribe((cartProducts: CartProduct[]) => {
      this.cartProducts.set(cartProducts);
    }))

    this.subscriptions.add(this.cartService.cartCount$.subscribe((cartProductCounter: number) => {
      this.cartTotalItemsCounter.set(cartProductCounter);
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
