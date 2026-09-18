import { Component, signal, output, model, input } from '@angular/core';

@Component({
  selector: 'app-store-filters',
  standalone: false,
  templateUrl: './store-filters.html',
  styleUrl: './store-filters.css',
})
export class StoreFilters {
  public readonly searchingText = model<string>('');
  public readonly showonConfirmButton = input<boolean>(true);
  public readonly cancelButtonText = input<string>('Cancelar');
  public showPopover = signal<boolean>(false);

  public onApply = output<void>();
  public onClear = output<void>();

  public applyFilter(): void {
    this.onApply.emit();
  }

  public clearFilter(): void {
    this.searchingText.set('');
    this.onClear.emit();
  }

  onInputText(event: Event) {
    this.searchingText.set((event.target as HTMLInputElement).value || '');
  }
}
