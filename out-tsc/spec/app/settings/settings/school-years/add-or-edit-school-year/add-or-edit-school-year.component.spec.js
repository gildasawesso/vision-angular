import { async, TestBed } from '@angular/core/testing';
import { AddOrEditSchoolYearComponent } from './add-or-edit-school-year.component';
describe('AddOrEditSchoolYearComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddOrEditSchoolYearComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditSchoolYearComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-school-year.component.spec.js.map