import { formatDate } from '@angular/common';
import { Product } from './product.model';
import { ProductStatus } from '@models/productStatus.model';
import { Category } from '@models/category.model';

// DTO para insertar o actualizar productos
export class InsertUpdateProductDTO {
  public readonly name: string;
  public readonly description: string;
  public readonly imageUrl?: string;
  public readonly price: number;
  public readonly categoryId: number;
  public readonly productStatusId: number;
  public readonly createdAt?: string;
  public readonly updatedAt?: string;
  public readonly stock: number;

  // Constructor que recibe un objeto Product y asigna sus propiedades al DTO
  constructor(data: Product) {
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.price = Number(data.price);
    this.categoryId = data.category!.id;
    this.productStatusId = data.productStatus!.id;

    // FormatDate: Formatea la fecha al formato requerido por el API
    // Convierte la fecha al formato ISO requerido para enviarla al API
    this.createdAt = data.createdAt
      ? formatDate(data.createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSS", 'en-US')
      : formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", 'en-US');

    this.updatedAt = data.id
      ? formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", 'en-US')
      : undefined;
    this.stock = Number(data.stock);
  }
}

// DTO para filtrar productos
export class FilterProductDTO {
  public name: string;
  public minPrice: number;
  public maxPrice: number;
  public categoryId: number;
  public productStatusId: number;

  constructor(data: any = null) {
    // Técnica de deep copy para eliminar referencias de memoria
    data = data ? JSON.parse(JSON.stringify(data)) : {};

    //Porque datos vacios y no nullos, para que no se rompa el filtro de productos
    //La consulta de productos se realiza con filtros, y si los filtros son nullos, no se aplican correctamente
    //La idea es hacer una unica consulta de productos, y que los filtros sean opcionales,
    //para que se puedan aplicar o no, dependiendo de la necesidad del usuario
    //Otra idea hacer consultas divididas, una para cada filtro, pero eso no es eficiente, y no es necesario,
    //porque se puede hacer una unica consulta con filtros opcionales
    this.name = data.name ?? '';
    this.minPrice = data.minPrice ?? '';
    this.maxPrice = data.maxPrice ?? '';

    //De esta logramos mandar el id tanto de Category como de ProductStatus, que es el dato permitido por la API
    //para filtrar los datos
    this.categoryId = data.category?.id ?? data.categoryId ?? '';
    this.productStatusId = data.productStatus?.id ?? data.productStatusId ?? '';
  }
}
