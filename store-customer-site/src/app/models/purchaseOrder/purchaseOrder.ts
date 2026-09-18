export interface PurchaseOrder {
    id: number,
    customerName: string,
    customerPhoneNumber: string,
    customerEmail: string,
    customerAddress: string,
    purchaseOrderProduct: any,
    purchaseDate: string,
    grandTotal: number,
}