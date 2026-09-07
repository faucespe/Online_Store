import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from '@shared/main/main.layout';
import { TestsPage } from './modules/shared/test-page/tests.page'

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
  },
  {
    path: 'tests',
    component: TestsPage,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
