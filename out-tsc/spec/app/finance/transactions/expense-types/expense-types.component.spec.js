import { async, TestBed } from '@angular/core/testing';
import { ExpenseTypesComponent } from './expense-types.component';
describe('ExpenseTypesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExpenseTypesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ExpenseTypesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=expense-types.component.spec.js.map