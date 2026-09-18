import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { MainLayout } from './main/main.layout';
import { RouterModule } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format-pipe';


@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    TableComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    MainLayout,
    FilterComponent,
    CurrencyFormatPipe,
  ],
  exports: [
    TableComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    FilterComponent,
    CurrencyFormatPipe,
  ],
  providers: [
    CurrencyFormatPipe
  ]
})
export class SharedModule {}
