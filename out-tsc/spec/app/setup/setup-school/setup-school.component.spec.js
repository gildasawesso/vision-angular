import { async, TestBed } from '@angular/core/testing';
import { SetupSchoolComponent } from './setup-school.component';
describe('SetupSchoolComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SetupSchoolComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SetupSchoolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=setup-school.component.spec.js.map