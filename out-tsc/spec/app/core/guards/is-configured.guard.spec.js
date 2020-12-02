import { TestBed, inject } from '@angular/core/testing';
import { IsConfiguredGuard } from './is-configured.guard';
describe('IsConfiguredGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IsConfiguredGuard]
        });
    });
    it('should ...', inject([IsConfiguredGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=is-configured.guard.spec.js.map