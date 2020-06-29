import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearsComponent } from './school-years.component';

describe('SchoolYearsComponent', () => {
  let component: SchoolYearsComponent;
  let fixture: ComponentFixture<SchoolYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
