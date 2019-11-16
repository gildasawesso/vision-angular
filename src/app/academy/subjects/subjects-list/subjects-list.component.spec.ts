import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsListComponent } from './subjects-list.component';

describe('CoursesListComponent', () => {
  let component: SubjectsListComponent;
  let fixture: ComponentFixture<SubjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});