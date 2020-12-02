import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { StudentChooserComponent } from './student-chooser.component';
describe('StudentChooserComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [StudentChooserComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(StudentChooserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=student-chooser.component.spec.js.map