import { async, TestBed } from '@angular/core/testing';
import { FinanceStudentsComponent } from './finance-students.component';
describe('FinanceStudentsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FinanceStudentsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FinanceStudentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=finance-students.component.spec.js.map