import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCategoriesComponent } from './fee-categories.component';

describe('FeeTypesComponent', () => {
  let component: FeeCategoriesComponent;
  let fixture: ComponentFixture<FeeCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
