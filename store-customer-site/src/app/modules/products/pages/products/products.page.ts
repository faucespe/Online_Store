import { Component, OnInit, inject, signal } from '@angular/core';
import { Product } from '@models/product';
import { ProductService } from '@services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit {
  public products = signal<Product[]>([]);

  private productService = inject(ProductService);

  public ngOnInit(): void {
    this.productService.getProducts().subscribe((apiResponse) => {
      this.products.set(apiResponse.data);
    })
  }
}
