import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditExaminationTypeComponent } from './add-or-edit-examination-type.component';

describe('AddOrEditExaminationTypeComponent', () => {
  let component: AddOrEditExaminationTypeComponent;
  let fixture: ComponentFixture<AddOrEditExaminationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditExaminationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditExaminationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
