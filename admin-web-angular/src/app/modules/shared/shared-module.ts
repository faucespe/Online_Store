import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, TopbarComponent, MenuComponent],
  exports: [CardComponent, MenuComponent, TopbarComponent],
})
export class SharedModule {}
