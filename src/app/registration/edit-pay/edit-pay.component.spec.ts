import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayComponent } from './edit-pay.component';

describe('EditPayComponent', () => {
  let component: EditPayComponent;
  let fixture: ComponentFixture<EditPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
