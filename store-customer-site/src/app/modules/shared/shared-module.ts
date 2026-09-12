import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format-pipe';

import { MainLayout } from './main/main.layout';
import { StoreModal } from './components/store-modal/store-modal';
import { StoreBtn } from './components/store-btn/store-btn';
import { StoreFilters } from './components/store-filters/store-filters';
import { StoreCard } from './components/store-card/store-card.component';

@NgModule({
  declarations: [MainLayout, StoreModal, StoreBtn, StoreFilters, StoreCard, CurrencyFormatPipe],
  imports: [CommonModule, RouterLink, RouterModule],
  exports: [StoreCard, StoreBtn, StoreModal, StoreFilters, CurrencyFormatPipe]
})
export class SharedModule {}
