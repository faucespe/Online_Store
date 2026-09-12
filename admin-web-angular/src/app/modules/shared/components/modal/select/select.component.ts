import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input()
  public name: string = '';

  @Input()
  public label: string = '';

  @Input()
  public options: any[] = [];

  @Input()
  public model: any = null;

  @Output()
  public modelChange = new EventEmitter<any>();

  public onModelChange(value: any): void {
    const selectedOption = this.options.find(
      option => option.id === Number(value)
    );
    this.modelChange.emit(selectedOption);
  }
}
