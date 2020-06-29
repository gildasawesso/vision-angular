import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesListComponent } from './incomes-list.component';

describe('IncomesListComponent', () => {
  let component: IncomesListComponent;
  let fixture: ComponentFixture<IncomesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
