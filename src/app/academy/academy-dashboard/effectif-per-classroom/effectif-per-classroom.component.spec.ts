import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectifPerClassroomComponent } from './effectif-per-classroom.component';

describe('EffectifPerClassroomComponent', () => {
  let component: EffectifPerClassroomComponent;
  let fixture: ComponentFixture<EffectifPerClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectifPerClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectifPerClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
