import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartProduct } from '../../types/cart.types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public subjectCart = new BehaviorSubject<CartProduct[]>([]);

  public cartCount$: Observable<number> = this.subjectCart.pipe(
    map((cartProducts: CartProduct[]) => cartProducts.reduce((total, item) => total + item.quantity, 0)
  ));

  public getCartProducts(): CartProduct[] {
    return this.subjectCart.getValue();
  }

  public addProduct(newCartProduct: CartProduct): void {
    const currentCart = this.subjectCart.value;
    const exists = currentCart.find(item => item.id === newCartProduct.id);

    const updatedCart = exists
      ? currentCart.map(item => item.id === newCartProduct.id ? { ...item, quantity: Math.min(item.quantity + newCartProduct.quantity, item.stock )} : item)
      : [...currentCart, newCartProduct];

    this.subjectCart.next(updatedCart);
  }

  public increaseProductQuantityById(productId: number): void {
    const currentCart = this.subjectCart.value;
    const exists = currentCart.find(item => item.id === productId);

    if (!exists) {
      return;
    }

    const updatedCart = currentCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)

    this.subjectCart.next(updatedCart);
  }

  public removeProduct(idProduct: number, quantityToRemove: number): void {
    const current = this.subjectCart.getValue();

    const updated = current
      .map(item => item.id === idProduct ? { ...item, quantity: item.quantity - quantityToRemove } : item)
      .filter(item => item.quantity > 0);

    this.subjectCart.next(updated);
  }

  public emptyCart(): void {
    this.subjectCart.next([]);
  }

  //Obtener la cantidad de un producto hay agregado en el carrito por medio de su id
  public getProductQuantityById(productId: number): number {
    const item = this.subjectCart.value.find(
      item => item.id === productId
    );

    return item?.quantity ?? 0;
  }
}
