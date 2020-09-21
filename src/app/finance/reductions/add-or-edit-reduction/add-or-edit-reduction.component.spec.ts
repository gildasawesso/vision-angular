import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditReductionComponent } from './add-or-edit-reduction.component';

describe('AddOrEditReductionComponent', () => {
  let component: AddOrEditReductionComponent;
  let fixture: ComponentFixture<AddOrEditReductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditReductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
