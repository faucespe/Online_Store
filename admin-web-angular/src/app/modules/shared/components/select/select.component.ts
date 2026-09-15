import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  public readonly name = input<string>('');
  public readonly label = input<string>('');
  public readonly options = input<any[]>([]);
  public readonly model = model<any>(null);

  public onModelChange(value: any): void {
    const selectedOption = this.options().find(
      option => option.id === Number(value)
    );

    this.model.set(selectedOption);
  }
}
