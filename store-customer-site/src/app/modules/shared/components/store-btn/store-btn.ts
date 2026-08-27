import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-store-btn',
  standalone: false,
  templateUrl: './store-btn.html',
  styleUrl: './store-btn.css',
})
export class StoreBtn {
  public readonly shape = input<'default' | 'rounded'>('default');
  public readonly color = input<'primary' | 'secondary'>('primary');
  public readonly icon = input<string>();
  public readonly label = input<string>();

  public readonly canShowText = computed(() => (this.label() && this.shape() === 'default'))
  public readonly canShowButton = computed(() => (this.icon() || this.label()))
}
