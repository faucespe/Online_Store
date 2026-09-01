import { Component, input } from '@angular/core';
 
export interface TableColumn<T = any> {
  key: string;
  header: string;
  align?: 'left' | 'right';
}
 
@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table<T = any> {
  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  emptyMessage = input<string>('No items available');
 
  getCellValue(row: T, key: string): any {
    return key
      .split('.')
      .reduce((value: any, part: string) => value?.[part], row);
  }
}
