import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditPaymentComponent } from './add-or-edit-payment.component';

describe('AddOrEditPaymentComponent', () => {
  let component: AddOrEditPaymentComponent;
  let fixture: ComponentFixture<AddOrEditPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
