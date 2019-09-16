import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditClassroomComponent } from './add-or-edit-classroom.component';

describe('AddOrEditClassroomComponent', () => {
  let component: AddOrEditClassroomComponent;
  let fixture: ComponentFixture<AddOrEditClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
