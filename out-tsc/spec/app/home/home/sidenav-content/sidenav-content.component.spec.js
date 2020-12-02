import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { SidenavContentComponent } from './sidenav-content.component';
describe('SidenavContentComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [SidenavContentComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=sidenav-content.component.spec.js.map