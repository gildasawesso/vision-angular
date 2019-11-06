import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditUser } from './add-or-edit-user.component';

describe('AddUserComponent', () => {
  let component: AddOrEditUser;
  let fixture: ComponentFixture<AddOrEditUser>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditUser ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
