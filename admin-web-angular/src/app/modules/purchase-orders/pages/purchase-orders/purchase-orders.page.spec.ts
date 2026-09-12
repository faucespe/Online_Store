import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseOrdersPage } from './purchase-orders.page';

describe('PurchaseOrders', () => {
  let component: PurchaseOrdersPage;
  let fixture: ComponentFixture<PurchaseOrdersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseOrdersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseOrdersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
