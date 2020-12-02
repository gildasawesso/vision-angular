import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { RegistrationStateComponent } from './registration-state.component';
describe('RegistrationStateComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [RegistrationStateComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationStateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registration-state.component.spec.js.map