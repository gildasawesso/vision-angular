import { TestBed, async, inject } from '@angular/core/testing';

import { IsConfiguredGuard } from './is-configured.guard';

describe('IsConfiguredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsConfiguredGuard]
    });
  });

  it('should ...', inject([IsConfiguredGuard], (guard: IsConfiguredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
