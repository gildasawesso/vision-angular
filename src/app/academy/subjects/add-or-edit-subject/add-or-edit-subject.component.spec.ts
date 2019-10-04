import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditSubjectComponent } from './add-or-edit-subject.component';

describe('AddOrEditSubjectComponent', () => {
  let component: AddOrEditSubjectComponent;
  let fixture: ComponentFixture<AddOrEditSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
