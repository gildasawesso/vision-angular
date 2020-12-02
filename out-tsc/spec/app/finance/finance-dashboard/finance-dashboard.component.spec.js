import { async, TestBed } from '@angular/core/testing';
import { FinanceDashboardComponent } from './finance-dashboard.component';
describe('FinanceDashboardComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FinanceDashboardComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FinanceDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=finance-dashboard.component.spec.js.map