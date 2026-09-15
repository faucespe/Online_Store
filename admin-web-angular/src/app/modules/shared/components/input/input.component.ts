import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input()
  public name: string = '';

  @Input()
  public type: string = 'text';

  @Input()
  public placeholder: string = '';

  @Input()
  public label: string = '';

  @Input()
  public model: any = '';

  @Input()
  public required: boolean = false;

  @Input()
  public min: number | null = null;

  @Output()
  public modelChange = new EventEmitter<any>();

  public onModelChange(value: any): void {
    this.modelChange.emit(value);
  }

  public get inputSize(): number {
    const minSize = 20;
    const valueLength = String(this.model ?? '').length;

    return Math.max(minSize, valueLength + 2);
  }
}
