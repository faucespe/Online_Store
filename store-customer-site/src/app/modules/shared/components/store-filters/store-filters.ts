import { Component, signal, output, model } from '@angular/core';

@Component({
  selector: 'app-store-filters',
  standalone: false,
  templateUrl: './store-filters.html',
  styleUrl: './store-filters.css',
})
export class StoreFilters {
  public readonly searchingText = model<string>('');
  public showPopover = signal<boolean>(false);

  onFilter = output<void>();

  handleFilter() {
    this.onFilter.emit();
  }

  onInputText(event: Event) {
    this.searchingText.set((event.target as HTMLInputElement).value || '');
  }
}
