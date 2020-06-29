import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomsListComponent } from './classrooms-list.component';

describe('ClassListComponent', () => {
  let component: ClassroomsListComponent;
  let fixture: ComponentFixture<ClassroomsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
