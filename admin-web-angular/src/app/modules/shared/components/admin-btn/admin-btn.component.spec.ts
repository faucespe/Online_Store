import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBtnComponent } from './admin-btn.component';

describe('AdminBtnComponent', () => {
  let component: AdminBtnComponent;
  let fixture: ComponentFixture<AdminBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBtnComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
