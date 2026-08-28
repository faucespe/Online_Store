import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { MainLayout } from './main/main.layout';
import { GenericModal } from './components/generic-modal/generic-modal';
import { TestsPage } from './test-page/tests.page';
import { StoreBtn } from './components/store-btn/store-btn';

@NgModule({
  declarations: [MainLayout, GenericModal, TestsPage, StoreBtn],
  imports: [CommonModule, RouterLink, RouterModule],
})
export class SharedModule {}
