import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancheStateComponent } from './tranche-state.component';

describe('TrancheStateComponent', () => {
  let component: TrancheStateComponent;
  let fixture: ComponentFixture<TrancheStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrancheStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrancheStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
