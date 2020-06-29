import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSchoolComponent } from './setup-school.component';

describe('SetupSchoolComponent', () => {
  let component: SetupSchoolComponent;
  let fixture: ComponentFixture<SetupSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
