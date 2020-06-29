import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditIncomeComponent } from './add-or-edit-income.component';

describe('AddOrEditIncomeComponent', () => {
  let component: AddOrEditIncomeComponent;
  let fixture: ComponentFixture<AddOrEditIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
