import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { SidenavHeaderComponent } from './sidenav-header.component';
describe('SidenavHeaderComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [SidenavHeaderComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=sidenav-header.component.spec.js.map