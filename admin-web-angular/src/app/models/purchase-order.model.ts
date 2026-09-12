import { PurchaseOrderProduct } from "./purchase-order-product.model";

export class PurchaseOrder {
  id: number;
  customerName: string;
  customerPhoneNumber: string;
  customerEmail: string;
  customerAddress: string;
  purchaseDate: string;
  grandTotal: number;
  purchaseOrderProduct: PurchaseOrderProduct[];

  constructor(data: any) {
    this.id = data.id;
    this.customerName = data.customerName;
    this.customerPhoneNumber = data.customerPhoneNumber;
    this.customerEmail = data.customerEmail;
    this.customerAddress = data.customerAddress;
    this.purchaseDate = data.purchaseDate;
    this.grandTotal = data.grandTotal;
    this.purchaseOrderProduct = (data.purchaseOrderProduct ?? []).map((p: any) => new PurchaseOrderProduct(p));
  }
}