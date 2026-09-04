import { Component, OnInit, inject, signal , model } from '@angular/core';
import { ApiResponse } from '../../../../models/http.types';
import { Product } from '../../../../models/product/product.model';
import { ProductService } from '../../../../services/product/product.service';
import { ProductStatusService } from '@services/product-status/product-status.service';
import { ProductStatus } from '@models/productStatus.model';
import { Category } from '@models/category.model';
import { FilterProductDTO } from '@models/product/product.dto';

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
  public showProductModal = false
  public filter = new FilterProductDTO();
  isActive = model<boolean>(false);
  receivedSearchingText = signal<string>('');

  ngOnInit(): void {
    this.loadProducts();
    this.productStatusService.getProductStatuses().subscribe({
      next: (ApiResponse) => {
          console.log('Product Status:', ApiResponse.data);
          this.statuses.set(ApiResponse.data);
        },
        error: (error) => {
          console.error('Error Product Status:', error);
        }
      });
    }

    public handleConfirmation(): void {
      const request = this.product.id
          ? this.productService.updateProduct(this.product)
          : this.productService.createProduct(this.product);

      request.subscribe({
        next: () => {
            this.isActive.set(false);
            this.productService.getProducts().subscribe({
                next: (ApiResponse) => {
                    this.products.set(ApiResponse.data);
                }
            });
        },
        error: (error) => {
            console.error(error);
        }
      }
    );
  }

  public insertUpdate(data: unknown = null): void {
    this.product = new Product(data);
    this.isActive.set(true);

  }

  // Función para cargar los productos desde el servicio de productos, con la opción de aplicar un filtro
  public loadProducts(filter?: FilterProductDTO): void {
    this.productService.getProducts(filter).subscribe({
        next: (ApiResponse) => {
            this.products.set(ApiResponse.data);
        },
        error: (error) => {
            console.error('Error cargando productos:', error);
        }
    });
  }

  // Función para aplicar el filtro de productos
  // Por Experiencia del Cliente seria bueno que una vez limpiado el input de busqueda, se recarguen los productos sin filtro,
  // para que el cliente pueda ver todos los productos nuevamente
  // pero demomento el filtro para poder ser aplicado, debe ser aplicado manualmente,
  // para que el cliente pueda ver los productos filtrados por medio del botón acción aplicar.
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

  //Datos temporales para simular la obtención de categorías desde un servicio,
  // ya que no se ha implementado el servicio de categorías.
  //En el futuro, se debe reemplazar este código por la obtención de categorías desde el servicio correspondiente
  public categories = signal<Category[]>([
    new Category({ id: 3, name: 'Computadoras' }),
    new Category({ id: 4, name: 'Periféricos' }),
    new Category({ id: 5, name: 'Monitores' }),
    new Category({ id: 6, name: 'Componentes' }),
    new Category({ id: 7, name: 'Accesorios' })
    ]);
}
