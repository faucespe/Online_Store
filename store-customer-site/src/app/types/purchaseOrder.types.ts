export type CreatePurchaseOrderProductDto = {
    productId: number;
    productQuantity: number;
}

export type CreatePurchaseOrderDto = {
    customerName: string;
    customerPhoneNumber: string;
    customerEmail: string;
    customerAddress: string;
    purchaseOrderProduct: CreatePurchaseOrderProductDto[];
}