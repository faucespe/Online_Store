import { Component, inject } from '@angular/core';
import { LayoutService } from '@services/layout/layout.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.css',
})
export class MainLayout {
  layoutService = inject(LayoutService);
  hasFilters = this.layoutService.hasFilters;
}