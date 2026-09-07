import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { TestPage } from './test-page/tests.page';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/modal/input/input.component';
import { SelectComponent } from './components/modal/select/select.component';
import { MainLayout } from './main/main.layout';
import { RouterModule } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    CardComponent,
    TableComponent,
    TestPage,
    TopbarComponent,
    MenuComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    MainLayout,
    FilterComponent,
  ],
  exports: [
    CardComponent,
    TableComponent,
    TestPage,
    MenuComponent,
    TopbarComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    FilterComponent,
  ],
})
export class SharedModule {}
