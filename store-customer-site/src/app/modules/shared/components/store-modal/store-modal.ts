import { Component, output, input, model } from '@angular/core';

@Component({
  selector: 'app-store-modal',
  standalone: false,
  templateUrl: './store-modal.html',
  styleUrl: './store-modal.css',
})
export class StoreModal {
  public readonly modalTitle = input.required<string>(); 
  public readonly showConfirmButton = input<boolean>(true);
  public readonly showCancelButton = input<boolean>(true);
  public readonly confirmLabel = input<string>('Confirmar');
  public readonly cancelLabel = input<string>('Cancelar');
  public readonly showModal = model<boolean>(false);

  onConfirm = output<void>();

  handleConfirmation() {
    this.onConfirm.emit();
  }

  protected onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if(target.className == 'modal-overlay') {
      this.showModal.set(false);
    }
  }
}
