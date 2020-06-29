import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditExaminationComponent } from './add-or-edit-examination.component';

describe('AddOrEditExaminationComponent', () => {
  let component: AddOrEditExaminationComponent;
  let fixture: ComponentFixture<AddOrEditExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
