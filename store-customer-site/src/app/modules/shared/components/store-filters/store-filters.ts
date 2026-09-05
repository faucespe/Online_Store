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
  public readonly confirmButtonText = input<string>('Confirmar');
  public showPopover = signal<boolean>(false);

  onConfirm = output<void>();

  handleConfirm() {
    this.onConfirm.emit();
  }

  onInputText(event: Event) {
    this.searchingText.set((event.target as HTMLInputElement).value || '');
  }
}
