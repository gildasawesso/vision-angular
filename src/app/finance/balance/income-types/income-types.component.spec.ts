import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTypesComponent } from './income-types.component';

describe('IncomeTypesComponent', () => {
  let component: IncomeTypesComponent;
  let fixture: ComponentFixture<IncomeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
