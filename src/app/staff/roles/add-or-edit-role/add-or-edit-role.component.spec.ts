import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditRoleComponent } from './add-or-edit-role.component';

describe('AddOrEditRoleComponent', () => {
  let component: AddOrEditRoleComponent;
  let fixture: ComponentFixture<AddOrEditRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
