import { async, TestBed } from '@angular/core/testing';
import { AddOrEditFeeTypeComponent } from './add-or-edit-fee-type.component';
describe('AddOrEditFeeComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddOrEditFeeTypeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditFeeTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-fee-type.component.spec.js.map