import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { Category } from '@models/category/category';
import { Product } from '@models/product/product';
import { CartService } from '@services/cart/cart.service';
import { CartProduct } from '@types';
import { CategoryService } from '@services/category/category.service';
import { ProductService } from '@services/product/product.service';
import { CategoryStatus } from '@models/category/categoryStatus';

interface ProductFilters {
  name: string,
  minPrice: number,
  maxPrice: number,
  categoryId: number,
}

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit {
  public products = signal<Product[]>([]);
  public categories = signal<Category[]>([]);
  public filteredProducts = signal<Product[]>([]);
  protected showDetailsModal = signal<boolean>(false);

  public readonly defaultImageUrl = 'https://www.gstatic.com/webp/gallery/4.webp';

  //filters signals
  protected nameSearched = signal<string>('');
  protected minPrice = signal<number>(0);
  protected maxPrice = signal<number>(0);
  protected categoryId = signal<number>(0);

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);

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

  protected onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categoryId.set(parseInt(select.value));
  }

  protected filterProducts(productFilters: ProductFilters) {
    this.filteredProducts.set(
      this.products().filter((product) => {
        const condition1 = product.name.toLowerCase().includes(productFilters.name.toLowerCase() || '');
        const condition2 = product.price >= productFilters.minPrice;
        const condition3 = product.price <= productFilters.maxPrice;
        const condition4 = (productFilters.categoryId === 0) || (product.category.id === productFilters.categoryId) ;

        return condition1 && condition2 && condition3 && condition4;
      })
    );
  }

  protected cleanFilters() {
    this.maxPrice.set(Math.max(...this.products().map(product => product.price)));
    this.minPrice.set(Math.min(...this.products().map(product => product.price)));
    this.nameSearched.set('');
    this.categoryId.set(0);
  }

  private productFilters = signal<ProductFilters>({name: '', minPrice: 0, maxPrice: 0, categoryId: 0});
  constructor() {
    /* Triggers when you use the filters */
    effect(() => {
      this.productFilters.set({
        name: this.nameSearched(),
        minPrice: this.minPrice() || 0,
        maxPrice: this.maxPrice() || 0,
        categoryId: this.categoryId(),
      })
      this.filterProducts(this.productFilters());
    })
  }

  /*cart features*/
  protected getStockNumbers(stock: number) {
    return Array.from({length: stock}, (_, i) => i + 1);
  }

  onSelectQuantity(event: Event, product: Product): void {
    const select = event.target as HTMLSelectElement;
    const quantity: number = parseInt(select.value);
    //product.stock -= quantity;
    product.quantity = quantity;
  }

  protected addProductTest(selectedProduct: Product): void {
    if (!selectedProduct.quantity || selectedProduct.quantity <= 0) return;
    const cartProduct: CartProduct =  {
            id: selectedProduct.id,
            name: selectedProduct.name,
            imageUrl: selectedProduct.imageUrl,
            stock: selectedProduct.stock,
            price: selectedProduct.price,
            quantity: selectedProduct.quantity,
    }
    this.cartService.addProduct(cartProduct);
  }

  /*hooks*/
  public ngOnInit(): void {
    this.productService.getProducts().subscribe((apiResponse) => {
      const receivedProducts = apiResponse.data
      .filter((product: Product) => product.productStatus.name === 'Activado')
      .map((product: Product) => ({...product, quantity: 1}));
      this.products.set(receivedProducts);
      this.filteredProducts.set(this.products());
      this.maxPrice.set(Math.max(...this.products().map(product => product.price)));
      this.minPrice.set(Math.min(...this.products().map(product => product.price)));
    })

    this.categoryService.getCategories().subscribe((apiResponse) => {
      const activeCategories = apiResponse.data.filter(
        (category: Category) => category.categoryStatus.name === 'Activado'
      );

      this.categories.set(activeCategories);
    })
  }

  protected getProductQuantity(productId: number): number {
    return this.cartService.getProductQuantityById(productId);
  }
}
