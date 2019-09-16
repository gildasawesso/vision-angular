import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFeesPaymentsComponent } from './school-fees-payments.component';

describe('ScholarshipsComponent', () => {
  let component: SchoolFeesPaymentsComponent;
  let fixture: ComponentFixture<SchoolFeesPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolFeesPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolFeesPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
