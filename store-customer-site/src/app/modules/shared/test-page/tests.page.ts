import { Component, signal, model, effect } from '@angular/core';
import { TableColumn } from '../components/table/table';


@Component({
  selector: 'app-tests',
  standalone: false,
  templateUrl: './tests.page.html',
  styleUrl: './tests.page.css',
})
export class TestsPage {
  isActive = model<boolean>(false);
  receivedSearchingText = signal<string>('');

    columns: TableColumn[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'description', header: 'Descripción' },
    { key: 'price', header: 'Precio', align: 'right' },
    { key: 'stock', header: 'Stock', align: 'right'}
  ];

  data = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10000, stock: 100 },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 20000, stock: 50 },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 30000, stock: 0 },
  ];

  emptyData: any[] = [];

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
