import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTransactionTypeComponent } from './add-or-edit-transaction-type.component';

describe('AddOrEditTransactionTypeComponent', () => {
  let component: AddOrEditTransactionTypeComponent;
  let fixture: ComponentFixture<AddOrEditTransactionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditTransactionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditTransactionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
