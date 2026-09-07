import { Component, signal, output, model, input } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {

  public readonly searchingText = model<string>('');
  public readonly showonConfirmButton = input<boolean>(true);
  public readonly cancelButtonText = input<string>('Cancelar');
  public readonly confirmButtonText = input<string>('Buscar');
  public showPopover = signal<boolean>(false);
  public onApply = output<void>();
  public onClear = output<void>();

  // Aplicar filtro
  public applyFilter(): void {
    this.onApply.emit();
  }

  // Limpiar filtro
  public clearFilter(): void {
    this.onClear.emit();
  }

  // Buscar / mostrar filtros
  public toggleFilter(): void {
    this.showPopover.update(value => !value);
  }

  // Entrada de texto
  public onInputText(event: Event): void {
    this.searchingText.set(
      (event.target as HTMLInputElement).value || ''
    );
  }
}
