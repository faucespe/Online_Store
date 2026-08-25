import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MainLayout } from './main/main.layout';

@NgModule({
  declarations: [MainLayout],
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, RouterLink, RouterModule],
})
export class SharedModule {}
