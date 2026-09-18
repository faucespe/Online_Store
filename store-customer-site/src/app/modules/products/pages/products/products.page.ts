import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { Category } from '@models/category/category';
import { Product } from '@models/product/product';
import { CartService } from '@services/cart/cart.service';
import { CartProduct, ProductFilter } from '@types';
import { CategoryService } from '@services/category/category.service';
import { ProductService } from '@services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit {
  protected products = signal<Product[]>([]);
  protected categories = signal<Category[]>([]);
  protected filter = signal<ProductFilter>(new ProductFilter());
  protected showDetailsModal = signal<boolean>(false);

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);

  // Filters signals
  protected filterName = signal<string>('');
  protected filterMinPrice = signal<number | null>(null);
  protected filterMaxPrice = signal<number | null>(null);
  protected filterIdCategory = signal<number | string>(0);

  // Modal functions
  protected readonly defaultImagePath = signal<string>('/img/no-image-available.jpg');
  protected selectedProduct = signal<Product | undefined>(undefined);
  protected openModal(productId: number) {
    this.selectedProduct.set(this.getProduct(productId))
    this.showDetailsModal.set(true);
  }

  protected getProduct(productId: number): Product | undefined {
    const products: Product[] = this.products();
    const product: Product | undefined = products.find((e: Product) => e.id === productId);
    
    return product;
  }

  // Filters
  public constructor() {
    effect(() => {
      this.filter.set(new ProductFilter({
        name: this.filterName(),
        minPrice: this.filterMinPrice(),
        maxPrice: this.filterMaxPrice(),
        categoryId: this.filterIdCategory()
      }))
    })
  }

  protected applyFilter(): void {
    this.loadProducts(this.filter());
  }

  protected clearFilter(): void {
    this.filterMaxPrice.set(null);
    this.filterMinPrice.set(null);
    this.filterIdCategory.set(0);
    this.filter.set(new ProductFilter());
    this.loadProducts();
  }

  private loadProducts(filter?: ProductFilter): void {
    this.productService.getProducts(filter).subscribe((apiResponse) => {
      const receivedProducts = apiResponse.data
      .filter((product: Product) => product.productStatus.name === 'Activado')
      .map((product: Product) => ({...product, quantity: 1}));
      this.products.set(receivedProducts);
    })
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe((apiResponse) => {
      const activeCategories = apiResponse.data.filter(
        (category: Category) => category.categoryStatus.name === 'Activado'
      );

      this.categories.set(activeCategories);
    })
  }

  // Cart features
  protected getStockNumbers(stock: number) {
    return Array.from({length: stock}, (_, i) => i + 1);
  }

  protected onSelectQuantity(event: Event, product: Product): void {
    const select = event.target as HTMLSelectElement;
    const quantity: number = parseInt(select.value);
    product.quantity = quantity;
  }

  protected addProductToCart(selectedProduct: Product): void {
    if (!selectedProduct.quantity || selectedProduct.quantity <= 0) return;
    const cartProduct: CartProduct = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      imageUrl: selectedProduct.imageUrl,
      stock: selectedProduct.stock,
      price: selectedProduct.price,
      quantity: selectedProduct.quantity,
    }
    this.cartService.addProduct(cartProduct);
  }

  protected getProductQuantity(productId: number): number {
    return this.cartService.getProductQuantityById(productId);
  }

  // Hooks
  public ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }
}
