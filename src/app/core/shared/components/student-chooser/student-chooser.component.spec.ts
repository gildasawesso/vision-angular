import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChooserComponent } from './student-chooser.component';

describe('StudentChooserComponent', () => {
  let component: StudentChooserComponent;
  let fixture: ComponentFixture<StudentChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
