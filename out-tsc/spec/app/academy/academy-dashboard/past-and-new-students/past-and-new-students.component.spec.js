import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { PastAndNewStudentsComponent } from './past-and-new-students.component';
describe('PastAndNewStudentsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [PastAndNewStudentsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PastAndNewStudentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=past-and-new-students.component.spec.js.map