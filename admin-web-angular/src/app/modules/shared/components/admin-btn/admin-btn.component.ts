import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-admin-btn',
  standalone: false,
  templateUrl: './admin-btn.component.html',
  styleUrl: './admin-btn.component.css',
})
export class AdminBtnComponent {
  //Botones de administración, que se utilizan en la aplicación para realizar acciones de administración,
  //como crear, actualizar o eliminar productos, categorías, etc.
  public readonly shape = input<'default' | 'rounded'>('default');
  public readonly color = input<'primary' | 'secondary'>('primary');
  public readonly icon = input<string>();
  public readonly buttonText = input<string>();

  public readonly canShowText = computed(() => (this.buttonText() && this.shape() === 'default'))
  public readonly canShowButton = computed(() => (this.icon() || this.buttonText()))
}
