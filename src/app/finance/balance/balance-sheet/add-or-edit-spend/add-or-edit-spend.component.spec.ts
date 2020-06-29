import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditSpendComponent } from './add-or-edit-spend.component';

describe('AddOrEditSpendComponent', () => {
  let component: AddOrEditSpendComponent;
  let fixture: ComponentFixture<AddOrEditSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
