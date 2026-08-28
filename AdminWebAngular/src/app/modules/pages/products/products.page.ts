import { Product } from './../../../api/product/product.model';
import { ProductApi } from './../../../api/product/product.api';
import { ApiResponse } from './../../../services/http/http.types';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FilterProductDTO } from '../../../api/product/product.dto';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage  implements OnInit{
  public products = signal<Product[]>([]);

  private productService = inject(ProductApi)

  public ngOnInit(): void {
    this.loadProducts();
  }

  constructor (){
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: (response) => {
        this.products.set(response.data);
      }
    });
  }

}
