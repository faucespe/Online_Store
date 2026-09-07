import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestPage } from './modules/shared/test-page/tests.page';
import { MainLayout } from '@shared/main/main.layout';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products-module')
            .then(m => m.ProductsModule)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./modules/categories/categories-module')
            .then(m => m.CategoriesModule)
      }
    ]
  },

  {
    path: 'tests',
    component: TestPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
