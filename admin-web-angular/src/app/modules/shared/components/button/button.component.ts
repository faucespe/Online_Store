import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  public readonly shape = input<'default' | 'rounded'>('default');
  public readonly color = input<'primary' | 'secondary'>('primary');
  public readonly icon = input<string>();
  public readonly buttonText = input<string>();

  public readonly canShowText = computed(() => (this.buttonText() && this.shape() === 'default'))
  public readonly canShowButton = computed(() => (this.icon() || this.buttonText()))

  
}
