import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableAlertDialogComponent } from './customizable-alert-dialog.component';

describe('CustomizableAlertDialogComponent', () => {
  let component: CustomizableAlertDialogComponent;
  let fixture: ComponentFixture<CustomizableAlertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizableAlertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizableAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
