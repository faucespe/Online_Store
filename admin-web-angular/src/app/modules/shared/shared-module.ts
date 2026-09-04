import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { TestPage } from './test-page/tests.page';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { AdminBtnComponent } from './components/admin-btn/admin-btn.component';
import { InputComponent } from './components/modal/input/input.component';
import { SelectComponent } from './components/modal/select/select.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CardComponent,
    TableComponent,
    TestPage,
    TopbarComponent,
    MenuComponent,
    ModalComponent,
    AdminBtnComponent,
    InputComponent,
    SelectComponent,
  ],
  exports: [
    CardComponent,
    TableComponent,
    TestPage,
    MenuComponent,
    TopbarComponent,
    ModalComponent,
    AdminBtnComponent,
    InputComponent,
    SelectComponent,
  ],
})
export class SharedModule {}
