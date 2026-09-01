import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { MainLayout } from './main/main.layout';
import { TestsPage } from './test-page/tests.page';
import { StoreModal } from './components/store-modal/store-modal';
import { StoreBtn } from './components/store-btn/store-btn';
import { StoreFilters } from './components/store-filters/store-filters';
import { StoreCard } from './components/store-card/store-card.component';
import { Table } from './components/table/table';

@NgModule({
  declarations: [MainLayout, StoreModal, TestsPage, StoreBtn, StoreFilters, StoreCard, Table],
  imports: [CommonModule, RouterLink, RouterModule],
})
export class SharedModule {}
