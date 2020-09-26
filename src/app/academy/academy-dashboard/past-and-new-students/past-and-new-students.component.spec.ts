import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAndNewStudentsComponent } from './past-and-new-students.component';

describe('PastAndNewStudentsComponent', () => {
  let component: PastAndNewStudentsComponent;
  let fixture: ComponentFixture<PastAndNewStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastAndNewStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastAndNewStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
