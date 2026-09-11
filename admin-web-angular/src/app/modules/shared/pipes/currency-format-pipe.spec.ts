import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format-pipe';

describe('CurrencyFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
