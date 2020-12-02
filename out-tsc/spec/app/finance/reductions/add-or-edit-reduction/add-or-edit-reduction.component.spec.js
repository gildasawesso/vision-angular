import { async, TestBed } from '@angular/core/testing';
import { AddOrEditReductionComponent } from './add-or-edit-reduction.component';
describe('AddOrEditReductionComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddOrEditReductionComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditReductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-reduction.component.spec.js.map