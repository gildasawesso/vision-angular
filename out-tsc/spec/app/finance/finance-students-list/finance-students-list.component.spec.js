import { async, TestBed } from '@angular/core/testing';
import { FinanceStudentsListComponent } from './finance-students-list.component';
describe('FinanceStudentsListComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FinanceStudentsListComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FinanceStudentsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=finance-students-list.component.spec.js.map