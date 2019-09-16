import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTrancheComponent } from './add-or-edit-tranche.component';

describe('AddOrEditTrancheComponent', () => {
  let component: AddOrEditTrancheComponent;
  let fixture: ComponentFixture<AddOrEditTrancheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditTrancheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditTrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
