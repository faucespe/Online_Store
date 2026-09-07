import { Component, input, output } from '@angular/core';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  align?: 'left' | 'right';
}

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T = any> {
  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  emptyMessage = input<string>('No items available');
  showActions = input<boolean>(false);
  actionLabel = input<string>('Actualizar');
  actionIcon = input<string>('');

  rowDeactivate = output<T>();
  rowActions = output<T>();

  getCellValue(row: T, key: string): any {
    return key
      .split('.')
      .reduce((value: any, part: string) => value?.[part], row);
  }
}
