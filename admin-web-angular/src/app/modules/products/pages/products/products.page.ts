import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiResponse } from '../../../../models/http.types';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit {

  private productService = inject(ProductService);
  public products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (apiResponse) => {
        this.products.set(apiResponse.data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
