import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInformationsComponent } from './school-informations.component';

describe('SchoolInformationsComponent', () => {
  let component: SchoolInformationsComponent;
  let fixture: ComponentFixture<SchoolInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
