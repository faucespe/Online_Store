import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { MainLayout } from './main/main.layout';

@NgModule({
  declarations: [MainLayout],
  imports: [CommonModule, RouterLink, RouterModule],
})
export class SharedModule {}
