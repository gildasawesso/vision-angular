import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditSchoolYearComponent } from './add-or-edit-school-year.component';

describe('AddOrEditSchoolYearComponent', () => {
  let component: AddOrEditSchoolYearComponent;
  let fixture: ComponentFixture<AddOrEditSchoolYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditSchoolYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
