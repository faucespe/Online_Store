import { Category } from './category.model';
import { ProductStatus } from './productStatus.model';

//Formato de obtención de respuesta de los products
export class Product {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  category?: Category;
  productStatus: ProductStatus;
  stock: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.price = data.price;
    this.category = new Category(data.category);
    this.productStatus = new ProductStatus(data.productStatus);
    this.stock = data.stock;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
