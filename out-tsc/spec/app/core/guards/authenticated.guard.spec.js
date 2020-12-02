import { TestBed, inject } from '@angular/core/testing';
import { AuthenticatedGuard } from './authenticated.guard';
describe('AuthenticatedGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthenticatedGuard]
        });
    });
    it('should ...', inject([AuthenticatedGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=authenticated.guard.spec.js.map