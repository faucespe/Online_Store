import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from '@shared/main/main.layout';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('@products/products-module').then(m => m.ProductsModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('@cart/cart-module').then(m => m.CartModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('@checkout/checkout-module').then(m => m.CheckoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
