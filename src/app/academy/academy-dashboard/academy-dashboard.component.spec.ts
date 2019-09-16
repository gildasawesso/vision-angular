import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyDashboardComponent } from './academy-dashboard.component';

describe('AcademyDashboardComponent', () => {
  let component: AcademyDashboardComponent;
  let fixture: ComponentFixture<AcademyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
