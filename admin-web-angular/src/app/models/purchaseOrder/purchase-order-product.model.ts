import { Product } from "@models/product/product.model";

export class PurchaseOrderProduct {
  id: number;
  productId: number;
  purchaseOrderId: number;
  productQuantity: number;
  price: number;
  product: Product;

  constructor(data: any) {
    this.id = data.id;
    this.productId = data.productId;
    this.purchaseOrderId = data.purchaseOrderId;
    this.productQuantity = data.productQuantity;
    this.price = data.price;
    this.product = new Product(data.product);
  }
}
