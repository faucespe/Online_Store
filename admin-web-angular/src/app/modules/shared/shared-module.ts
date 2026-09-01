import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { TestPage } from './test-page/tests.page';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, TableComponent, TestPage],
  exports: [CardComponent, TableComponent, TestPage],
})
export class SharedModule {}
