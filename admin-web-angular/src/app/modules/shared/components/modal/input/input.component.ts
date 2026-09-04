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
  public label: string = '';

  @Input()
  public model: any = '';

  @Output()
  public modelChange = new EventEmitter<any>();

  public onModelChange(value: any): void {
    this.modelChange.emit(value);
  }
}
