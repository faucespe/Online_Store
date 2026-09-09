import { Component, OnInit, inject, signal } from '@angular/core';
import { PurchaseOrder } from '@models/purchase-order.model';
import { PurchaseOrderFilters } from '@models/purchase-order-filters.model';
import { PurchaseOrderService } from '@services/purchase-order/purchase-order.service';
import { TableColumn } from '@shared/components/table/table.component';

@Component({
  selector: 'app-purchase-orders',
  standalone: false,
  templateUrl: './purchase-orders.page.html',
  styleUrl: './purchase-orders.page.css',
})
export class PurchaseOrdersPage implements OnInit {
  private purchaseOrderService = inject(PurchaseOrderService);

  public orders = signal<PurchaseOrder[]>([]);
  public showModal = signal(false);
  public selectedOrder = signal<PurchaseOrder | null>(null);

  public filterCustomerName = signal<string>('');
  public filterId = signal<number | null>(null);
  public filterPhone = signal<string>('');
  public filterDateFrom = signal<string>('');
  public filterDateTo = signal<string>('');
  public filterTotalFrom = signal<number | null>(null);
  public filterTotalTo = signal<number | null>(null);

  public columns: TableColumn<PurchaseOrder>[] = [
    { key: 'id', header: 'Código' },
    { key: 'customerName', header: 'Cliente' },
    { key: 'customerPhoneNumber', header: 'Teléfono' },
    { key: 'purchaseDate', header: 'Fecha de Compra' },
    { key: 'grandTotal', header: 'Total', align: 'right' },
  ];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const filters: PurchaseOrderFilters = {
      id: this.filterId() ?? undefined,
      customerName: this.filterCustomerName() || undefined,
      customerPhoneNumber: this.filterPhone() || undefined,
      purchaseDateFrom: this.filterDateFrom() || undefined,
      purchaseDateTo: this.filterDateTo() || undefined,
      grandTotalFrom: this.filterTotalFrom() ?? undefined,
      grandTotalTo: this.filterTotalTo() ?? undefined,
    };

    this.purchaseOrderService.getPurchaseOrders(filters).subscribe({
      next: (response) => this.orders.set(response.data.flat()),
      error: (error) => console.error(error),
    });
  }

  clearFilters(): void {
    this.filterCustomerName.set('');
    this.filterId.set(null);
    this.filterPhone.set('');
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
    this.filterTotalFrom.set(null);
    this.filterTotalTo.set(null);
    this.loadOrders();
  }

  onViewOrder(order: PurchaseOrder): void {
    this.selectedOrder.set(order);
    this.showModal.set(true);
  }
}