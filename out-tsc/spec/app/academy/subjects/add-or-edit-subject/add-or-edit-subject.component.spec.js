import { async, TestBed } from '@angular/core/testing';
import { AddOrEditSubjectComponent } from './add-or-edit-subject.component';
describe('AddOrEditSubjectComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddOrEditSubjectComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditSubjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-subject.component.spec.js.map