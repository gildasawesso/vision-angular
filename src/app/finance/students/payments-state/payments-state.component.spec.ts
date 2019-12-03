import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsStateComponent } from './payments-state.component';

describe('PaymentsStateComponent', () => {
  let component: PaymentsStateComponent;
  let fixture: ComponentFixture<PaymentsStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
