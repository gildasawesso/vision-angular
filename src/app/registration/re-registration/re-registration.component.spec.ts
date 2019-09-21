import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRegistrationComponent } from './re-registration.component';

describe('OtherRegistrationComponent', () => {
  let component: ReRegistrationComponent;
  let fixture: ComponentFixture<ReRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
