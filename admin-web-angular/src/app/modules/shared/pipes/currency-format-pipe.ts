import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: false,
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: unknown): string {
    const numValue = value == null || value === '' ? 0 : Number(value);

    if(isNaN(numValue)) {
      return '₡0.00';
    }

    const isNegative = numValue < 0;
    const absValue = Math.abs(numValue);

    const [integerPart, decimalPart] = absValue.toFixed(2).split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,'.')

    const sign = isNegative ? '-' : '';

    return `${sign}₡${formattedInteger}.${decimalPart}`;
  }
}
