export type PurchaseOrderCartProduct = {
    productId: number;
    quantity: number;
}

export type CreateUpdatePurchaseOrderDto = {
    customerName: string;
    customerPhoneNumber: string;
    customerEmail: string;
    customerAddress: string;
    cartProducts: PurchaseOrderCartProduct[];
}