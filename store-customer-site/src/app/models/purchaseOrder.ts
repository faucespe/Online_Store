export interface PurchaseOrder {
    id: number;
    customerName: string;
    customerPhoneNumber: string;
    customerEmail: string;
    customerAddress: number;
    category: any;
    productStatus: any;
    stock: number;
    quantity?: number;
    createdAt?: string;
    updatedAt?: string;
}