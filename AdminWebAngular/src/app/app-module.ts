import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CategoriesPage } from './modules/pages/categories/categories.page';
import { ProductsPage } from './modules/pages/products/products.page';
import { CardComponent } from './modules/shared/components/card/card.component';

@NgModule({
  declarations: [App, CategoriesPage, ProductsPage, CardComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
