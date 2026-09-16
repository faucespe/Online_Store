export interface PurchaseOrderFilters {
  id?: number;
  customerName?: string;
  customerPhoneNumber?: string;
  purchaseDateFrom?: string;
  purchaseDateTo?: string;
  grandTotalFrom?: number;
  grandTotalTo?: number;
}