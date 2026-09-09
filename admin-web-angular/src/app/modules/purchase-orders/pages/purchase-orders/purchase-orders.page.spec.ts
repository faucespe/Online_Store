import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrders } from './purchase-orders.page';

describe('PurchaseOrders', () => {
  let component: PurchaseOrders;
  let fixture: ComponentFixture<PurchaseOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
