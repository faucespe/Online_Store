import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { CartService } from '@services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.css',
})
export class MainLayout implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  protected cartProductCounter = signal<number>(0);
  protected subscriptions: Subscription;

  constructor() {
    this.subscriptions = new Subscription();
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.cartService.cartCount$.subscribe((cartProductCounter: number) => {
      this.cartProductCounter.set(cartProductCounter);
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}