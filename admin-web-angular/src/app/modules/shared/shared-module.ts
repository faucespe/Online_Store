import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { TestPage } from './test-page/tests.page';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, TableComponent, TestPage, TopbarComponent, MenuComponent, ButtonComponent, ModalComponent],
  exports: [CardComponent, TableComponent, TestPage, MenuComponent, TopbarComponent, ButtonComponent, ModalComponent],

})
export class SharedModule {}
