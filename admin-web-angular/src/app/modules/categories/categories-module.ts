import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';

import { CategoriesRoutingModule } from './categories-routing-module';
import { CategoriesPage } from './pages/categories/categories.page';

@NgModule({
  declarations: [CategoriesPage],
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
})
export class CategoriesModule {}
