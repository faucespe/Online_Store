import { Component, signal, model, effect } from '@angular/core';


@Component({
  selector: 'app-tests',
  standalone: false,
  templateUrl: './tests.page.html',
  styleUrl: './tests.page.css',
})
export class TestsPage {
  isActive = model<boolean>(false);
  receivedSearchingText = signal<string>('');

  handleConfirmation() {
    alert('hola');
  }

  onFilterClick() {
    alert(`click on filter`)
  }

  constructor() {
    effect(() => {
      console.log(this.receivedSearchingText())
    })
  }
}
