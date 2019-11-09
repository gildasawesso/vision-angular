import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationTypeComponent } from './examination-type.component';

describe('ExaminationTypeComponent', () => {
  let component: ExaminationTypeComponent;
  let fixture: ComponentFixture<ExaminationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
