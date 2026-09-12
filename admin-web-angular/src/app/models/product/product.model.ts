//Formato de obtención de respuesta de los products
import { Category } from '../category.model';
import { ProductStatus } from '../productStatus.model';

// Formato de obtención de respuesta de los products
export class Product {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  category?: Category;
  productStatus?: ProductStatus;
  stock: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(data?: any) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
    this.description = data?.description ?? '';
    this.imageUrl = data?.imageUrl ?? '';
    this.price = data?.price ?? 0;
    this.category = data?.category
      ? new Category(data.category)
      : undefined;

    this.productStatus = data?.productStatus
      ? new ProductStatus(data.productStatus)
      : undefined;

    this.stock = data?.stock ?? 0;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
