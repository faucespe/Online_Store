import { Component, OnInit, inject, signal , model } from '@angular/core';
import { ApiResponse } from '../../../../models/http.types';
import { Product } from '../../../../models/product/product.model';
import { ProductService } from '../../../../services/product/product.service';
import { ProductStatusService } from '@services/product-status/product-status.service';
import { ProductStatus } from '@models/productStatus.model';
import { CategoryService } from '@services/category/category.service';
import { Category } from '@models/category.model';
import { FilterProductDTO } from '@models/product/product.dto';
import { TableColumn } from '@shared/components/table/table.component';

// CRÍTICA CONSTRUCTIVA:
// ProductsPage está concentrando muchas responsabilidades relacionadas con las
// solicitudes al API. Es una idea recomendable, centralizar estas funcionalidades en
// una capa o servicio dedicado al manejo de las operaciones con el API
// y dejar product.page.ts centrado en ui

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit {

  private productService = inject(ProductService);
  public products = signal<Product[]>([]);
  public product: Product = new Product();
  private productStatusService = inject(ProductStatusService);
  public statuses = signal<ProductStatus[]>([]);
  private categoryService = inject(CategoryService);
  public categories = signal<Category[]>([]);;
  public filter = new FilterProductDTO();
  isActive = model<boolean>(false);
  public validationMessage = signal('');
  public selectedProduct = signal<Product | null>(null);
  public showProductInfoModal = signal(false);

  //imagen por default si una imagen no tiene una imagen de carga
  public readonly defaultImageUrl = 'https://www.gstatic.com/webp/gallery/4.webp';

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadProductStatuses();
  }

  public handleConfirmation(): void {
    this.validationMessage.set('');
    // Nombre obligatorio
    if (!this.product.name?.trim()) {
      this.showValidationMessage('El nombre es obligatorio.');
      return;
    }

    // Descripción obligatoria
    if (!this.product.description?.trim()) {
      this.showValidationMessage('La descripción es obligatoria.');
      return;
    }

    // Precio obligatorio y mayor que 0
    if (this.product.price <= 0) {
      this.showValidationMessage('El precio debe ser mayor que 0.');
      return;
    }

    // Estado obligatorio
    if (!this.product.productStatus) {
      this.showValidationMessage('El estado es obligatorio.');
      return;
    }

    // Stock obligatorio y mayor o igual a 0
    if (this.product.stock < 0) {
      this.showValidationMessage('El stock debe ser mayor o igual a 0.');
      return;
    }

    //Inserción o Actualización de producto, acción validada por medio de un id existente
    const request = this.product.id
      ? this.productService.updateProduct(this.product)
      : this.productService.createProduct(this.product);

    request.subscribe({
      next: () => {
        this.isActive.set(false);

        this.productService.getProducts().subscribe({
          next: (apiResponse) => {
            this.products.set(apiResponse.data);
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Función para cargar los productos desde el servicio de productos, con la opción de aplicar un filtro
  public loadProducts(filter?: FilterProductDTO): void {
    this.productService.getProducts(filter).subscribe({
        next: (apiResponse) => {
          this.products.set(apiResponse.data);
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

  //Desglose de datos de tabla para insertar los datos de los productos
  public productColumns: TableColumn<Product>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'description', header: 'Descripción' },
    { key: 'category.name', header: 'Categoría' },
    { key: 'productStatus.name', header: 'Estado' },
    { key: 'price', header: 'Precio' + ' ₡' },
    { key: 'stock', header: 'Stock'}
  ];

  //Función para insertar o actualizar un dato producto, con el set de productStatus como activo
  public insertUpdate(data: unknown = null): void {
    this.showProductInfoModal.set(false);
    this.validationMessage.set('');
    this.product = new Product(data);
    if (!this.product.id) {
      this.product.productStatus = new ProductStatus({
        id: 2,
        name: 'Active'
      });
    }

    this.isActive.set(true);
  }

  // Función para aplicar el filtro de productos
  public applyFilter(): void {
      const filter = new FilterProductDTO(this.filter);
      this.loadProducts(filter);
  }

  // Función para limpiar el filtro de productos (inputs y selects), y recargar los productos sin filtro
  public clearFilter(): void {
    this.filter = new FilterProductDTO();
    this.loadProducts();
  }

  // Función para resetear el producto actual cada vez que se cierra el modal, para evitar que se mantenga la información del producto anterior
  // Ya que se esta utilizando el mismo modal para crear y actualizar productos, si no se resetea el producto, al abrir el modal para crear un nuevo producto,
  // se mostrará la información del producto anterior
  public resetProduct(): void {
    this.product = new Product();
  }

  // Función para mostrar mensajes de inserción de datos erronea
  private showValidationMessage(message: string): void {
    this.validationMessage.set(message);

    //Tiempo para que se quite el mensaje del modal
    setTimeout(() => {
      this.validationMessage.set('');
    }, 6000);
  }

  //Función para ver la info de un producto
  public onViewProduct(product: Product): void {
    this.isActive.set(false);
    this.selectedProduct.set(product);
    this.showProductInfoModal.set(true);
  }
}
