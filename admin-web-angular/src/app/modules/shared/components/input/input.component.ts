import { Component, model, input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  public readonly name = input<string>('');
  public readonly type = input<string>('text');
  public readonly placeholder = input<string>('');
  public readonly label = input<string>('');
  public readonly model = model<any>('');
  public readonly required = input<boolean>(false);
  public readonly min = input<number | null>(null);

  public onModelChange(value: any): void {
    this.model.set(value);
  }

  public get inputSize(): number {
    const minSize = 20;
    const valueLength = String(this.model() ?? '').length;

    return Math.max(minSize, valueLength + 2);
  }
}
