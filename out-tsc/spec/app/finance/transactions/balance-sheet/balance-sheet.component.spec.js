import { async, TestBed } from '@angular/core/testing';
import { BalanceSheetComponent } from './balance-sheet.component';
describe('BalanceSheetComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BalanceSheetComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(BalanceSheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=balance-sheet.component.spec.js.map