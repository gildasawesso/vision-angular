import { async, TestBed } from '@angular/core/testing';
import { AddOrEditExaminationComponent } from './add-or-edit-examination.component';
describe('AddOrEditExaminationComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddOrEditExaminationComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditExaminationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-examination.component.spec.js.map