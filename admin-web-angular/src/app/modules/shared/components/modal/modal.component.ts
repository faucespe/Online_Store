import { Component, output, input, model, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  public readonly modalTitle = input.required<string>();
  public readonly showConfirmButton = input<boolean>(true);
  public readonly showCancelButton = input<boolean>(true);
  public readonly confirmLabel = input<string>('Confirm');
  public readonly cancelLabel = input<string>('Cancel');
  public readonly showModal = model<boolean>(false);

  onConfirm = output<void>();
  onClose = output<void>();

  @Input()
  public validationMessage: string = '';

  //Botón de Confirmación
  public handleConfirmation(): void {
    this.onConfirm.emit();
  }

  //Cerrar Modal
  public handleClose(): void {
    this.showModal.set(false);
    this.onClose.emit();
  }
}
