import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTransactionComponent } from './add-or-edit-transaction.component';

describe('AddOrEditTransactionComponent', () => {
  let component: AddOrEditTransactionComponent;
  let fixture: ComponentFixture<AddOrEditTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
