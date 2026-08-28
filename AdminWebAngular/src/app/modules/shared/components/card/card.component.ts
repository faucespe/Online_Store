import { Component, Input, signal , Inject, inject } from '@angular/core';
import { Product } from '../../../../api/product/product.model';
import { ProductApi } from '../../../../api/product/product.api';
import { ProductsPage } from '../../../pages/products/products.page';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() product!: Product;
}
