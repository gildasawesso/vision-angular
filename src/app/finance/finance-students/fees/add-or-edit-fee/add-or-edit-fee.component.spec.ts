import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditFeeComponent } from './add-or-edit-fee.component';

describe('AddOrEditFeeComponent', () => {
  let component: AddOrEditFeeComponent;
  let fixture: ComponentFixture<AddOrEditFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
