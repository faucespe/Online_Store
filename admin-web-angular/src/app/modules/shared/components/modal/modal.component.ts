import { Component, output, input, model } from '@angular/core';

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

  handleConfirmation() {
    this.onConfirm.emit();
  }
}
