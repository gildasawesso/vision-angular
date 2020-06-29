import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSchoolyearsComponent } from './setup-schoolyears.component';

describe('SetupSchoolyearsComponent', () => {
  let component: SetupSchoolyearsComponent;
  let fixture: ComponentFixture<SetupSchoolyearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupSchoolyearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSchoolyearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
