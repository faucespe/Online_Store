import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, NavbarComponent, TopbarComponent],
  exports: [CardComponent, NavbarComponent, TopbarComponent],
})
export class SharedModule {}
