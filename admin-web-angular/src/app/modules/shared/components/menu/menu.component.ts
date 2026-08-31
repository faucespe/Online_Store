import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }
}
