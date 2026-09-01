import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { TestPage } from './test-page/tests.page';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, TableComponent, TestPage, TopbarComponent, MenuComponent],
  exports: [CardComponent, TableComponent, TestPage, MenuComponent, TopbarComponent],

})
export class SharedModule {}
