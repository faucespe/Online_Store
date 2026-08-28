import { Component, output, input, model } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  standalone: false,
  templateUrl: './generic-modal.html',
  styleUrl: './generic-modal.css',
})
export class GenericModal {
  public readonly title = input.required<string>(); 
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
