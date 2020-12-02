import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStateComponent } from './registration-state.component';

describe('RegistrationStateComponent', () => {
  let component: RegistrationStateComponent;
  let fixture: ComponentFixture<RegistrationStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
