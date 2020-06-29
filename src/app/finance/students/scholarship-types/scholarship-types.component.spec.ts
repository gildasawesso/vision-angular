import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipTypesComponent } from './scholarship-types.component';

describe('ScholarshipTypesComponent', () => {
  let component: ScholarshipTypesComponent;
  let fixture: ComponentFixture<ScholarshipTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarshipTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
