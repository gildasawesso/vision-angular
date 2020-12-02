import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { WorkInProgressComponent } from './work-in-progress.component';
describe('WorkInProgressComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [WorkInProgressComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WorkInProgressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=work-in-progress.component.spec.js.map