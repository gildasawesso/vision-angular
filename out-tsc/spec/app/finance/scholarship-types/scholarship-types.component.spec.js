import { async, TestBed } from '@angular/core/testing';
import { ScholarshipTypesComponent } from './scholarship-types.component';
describe('ScholarshipTypesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScholarshipTypesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ScholarshipTypesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=scholarship-types.component.spec.js.map