import { Component, HostListener, inject, signal } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.css',
})
export class MainLayout {
  menuOpen = signal(false);
  private location = inject(Location);

  toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }

  public goBack(): void {
    this.location.back();
  }

  @HostListener('document:click', ['$event'])
  public closeMenu(event: MouseEvent): void {

    const target = event.target as HTMLElement;

    if (!target.closest('.main__actions-container')) {
      this.menuOpen.set(false);
    }
  }
}
