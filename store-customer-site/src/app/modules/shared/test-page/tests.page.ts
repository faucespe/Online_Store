import { Component, signal, model } from '@angular/core';

@Component({
  selector: 'app-tests',
  standalone: false,
  templateUrl: './tests.page.html',
  styleUrl: './tests.page.css',
})
export class TestsPage {
  isActive = model<boolean>(false);

  handleConfirmation() {
    alert('hola');
  }
}
