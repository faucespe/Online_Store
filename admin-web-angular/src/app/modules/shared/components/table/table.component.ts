import { Component, inject, input, output } from '@angular/core';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format-pipe';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  align?: 'left' | 'right';
  format?: 'currency';
}

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T = any> {
  private currencyFormatPipe = inject(CurrencyFormatPipe)

  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  emptyMessage = input<string>('No items available');
  showActions = input<boolean>(false);
  actionLabel = input<string>('Actualizar');
  actionIcon = input<string>('');

  rowDeactivate = output<T>();
  rowActions = output<T>();

  getCellValue(row: T, column: TableColumn<T>): any {
    const columValue = column.key
      .split('.')
      .reduce((value: any, part: string) => value?.[part], row);

    if(column.format === 'currency') {
      return this.currencyFormatPipe.transform(columValue)
    }

    return columValue
  }
}
