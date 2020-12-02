import { async, TestBed } from '@angular/core/testing';
import { AddOrEditTrancheComponent } from './add-or-edit-tranche.component';
describe('AddOrEditTrancheComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddOrEditTrancheComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditTrancheComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-tranche.component.spec.js.map