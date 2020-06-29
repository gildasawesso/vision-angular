import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditFeeTypeComponent } from './add-or-edit-fee-type.component';

describe('AddOrEditFeeComponent', () => {
  let component: AddOrEditFeeTypeComponent;
  let fixture: ComponentFixture<AddOrEditFeeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditFeeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditFeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
