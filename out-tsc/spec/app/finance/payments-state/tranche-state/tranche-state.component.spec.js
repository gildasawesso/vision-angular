import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { TrancheStateComponent } from './tranche-state.component';
describe('TrancheStateComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [TrancheStateComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TrancheStateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tranche-state.component.spec.js.map