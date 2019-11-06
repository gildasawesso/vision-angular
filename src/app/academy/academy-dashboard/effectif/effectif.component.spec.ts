import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectifComponent } from './effectif.component';

describe('EffectifComponent', () => {
  let component: EffectifComponent;
  let fixture: ComponentFixture<EffectifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
