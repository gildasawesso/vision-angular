import { async, TestBed } from '@angular/core/testing';
import { ExaminationTypesComponent } from './examination-types.component';
describe('ExaminationTypesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExaminationTypesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ExaminationTypesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=examination-types.component.spec.js.map