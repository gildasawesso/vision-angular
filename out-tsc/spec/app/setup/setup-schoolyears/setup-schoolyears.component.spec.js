import { async, TestBed } from '@angular/core/testing';
import { SetupSchoolyearsComponent } from './setup-schoolyears.component';
describe('SetupSchoolyearsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SetupSchoolyearsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SetupSchoolyearsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=setup-schoolyears.component.spec.js.map