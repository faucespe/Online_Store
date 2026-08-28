import { TestBed } from '@angular/core/testing';

import { PurchaseOrderProductApi } from './purchase-order-product.api';

describe('PurchaseOrderProductApi', () => {
  let service: PurchaseOrderProductApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderProductApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
