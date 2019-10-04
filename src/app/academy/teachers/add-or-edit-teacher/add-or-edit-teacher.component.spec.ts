import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTeacherComponent } from './add-or-edit-teacher.component';

describe('AddOrEditTeacherComponent', () => {
  let component: AddOrEditTeacherComponent;
  let fixture: ComponentFixture<AddOrEditTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
