import { Component, OnInit, inject, signal, model } from '@angular/core';
import { ApiResponse } from 'src/app/types/http/http.types';
import { Product } from '@models/product/product.model';
import { ProductService } from '../../../../services/product/product.service';
import { ProductStatusService } from '@services/product-status/product-status.service';
import { ProductStatus } from '@models/product/productStatus.model';
import { CategoryService } from '@services/category/category.service';
import { Category } from '@models/category/category.model';
import { FilterProductDTO } from 'src/app/types/product/product.dto';
import { TableColumn } from '@shared/components/table/table.component';
import { ValidationTranslatorService } from '@shared/translator/validation-translator.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit {

  private productService = inject(ProductService);
  private validationTranslator = inject(ValidationTranslatorService);
  public products = signal<Product[]>([]);
  public product: Product = new Product();
  private productStatusService = inject(ProductStatusService);
  public statuses = signal<ProductStatus[]>([]);
  private categoryService = inject(CategoryService);
  public categories = signal<Category[]>([]);;
  public filter = new FilterProductDTO();
  protected isActive = model<boolean>(false);
  public backendError = signal('');
  protected showCreateUpdateProductModal = model<boolean>(false);
  public validationMessage = signal('');
  public selectedProduct = signal<Product | null>(null);
  public showProductInfoModal = signal(false);

  protected filterErrors = signal<string[]>([]);

  protected readonly defaultImagePath = signal<string>('/img/no-image-available.jpg');

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadProductStatuses();
  }

  public handleConfirmation(): void {
    this.backendError.set('');

    const request = this.product.id
      ? this.productService.updateProduct(this.product)
      : this.productService.createProduct(this.product);

    request.subscribe({
      next: (response) => {
        if (!response.success) {
          const rawMessage = response.messages?.[0] ?? 'Ocurrió un error al guardar el producto.';
          this.backendError.set(this.validationTranslator.translate(rawMessage));
          return;
        }

        this.isActive.set(false);

        this.productService.getProducts().subscribe({
          next: (apiResponse) => {
            this.products.set(apiResponse.data);
          }
        });
      },
      error: (error: { error: ApiResponse }) => {
        const rawMessage = error.error?.messages?.[0] ?? 'Ocurrió un error al guardar el producto.';
        this.backendError.set(this.validationTranslator.translate(rawMessage));
      },
    });

    this.showCreateUpdateProductModal.set(false);
  }

  // Función para cargar los productos desde el servicio de productos, con la opción de aplicar un filtro
  public loadProducts(filter?: FilterProductDTO): void {
    this.productService.getProducts(filter).subscribe({
      next: (apiResponse) => {
        if (!apiResponse.success) {
          this.filterErrors.set(
            (apiResponse.messages ?? []).map((message: string) => this.validationTranslator.translate(message))
          );
          return;
        }

        this.filterErrors.set([]);
        this.products.set(apiResponse.data ?? []);
      },
      error: (error) => {
      }
    });
  }

  // Función para cargar los productos desde el servicio de categorias en el filtro
  private loadCategories(): void {
    this.categoryService.getCategories({}).subscribe({
      next: (response) => {
        this.categories.set(response.data.flat());
      },
      error: (error) => console.error(error),
    });
  }

  // Función para cargar los producto de Estado desde el servicio de categorias en el filtro
  private loadProductStatuses(): void {
    this.productStatusService.getProductStatuses().subscribe({
      next: (response) => {
        this.statuses.set(response.data);
      },
      error: (error) => {
        console.error('Error Product Status:', error);
      }
    });
  }

  // Se definen las columnas para ser consumidas por el table component
  public productColumns: TableColumn<Product>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'category.name', header: 'Categoría' },
    { key: 'productStatus.name', header: 'Estado' },
    { key: 'price', header: 'Precio', align: 'right', format: 'currency' },
  ];

  //Función para insertar o actualizar un dato producto, con el set de productStatus como activo
  public insertUpdate(data: unknown = null): void {
    this.showProductInfoModal.set(false);
    this.backendError.set('');
    this.product = new Product(data);
    if (!this.product.id) {
      this.product.productStatus = new ProductStatus({
        id: 2,
        name: 'Active'
      });
    }

    this.showCreateUpdateProductModal.set(true);
  }

  public applyFilter(): void {
    const filter = new FilterProductDTO(this.filter);
    this.loadProducts(filter);
  }

  public clearFilter(): void {
    this.filter = new FilterProductDTO();
    this.filterErrors.set([]); // NUEVO
    this.loadProducts();
  }
  
  // Función para resetear el producto actual cada vez que se cierra el modal,
  // para evitar que se mantenga la información del producto anterior
  public resetProduct(): void {
    this.product = new Product();
  }

  //Función para ver la info de un producto
  public onViewProduct(product: Product): void {
    this.showCreateUpdateProductModal.set(false);
    this.selectedProduct.set(product);
    this.showProductInfoModal.set(true);
  }
}
