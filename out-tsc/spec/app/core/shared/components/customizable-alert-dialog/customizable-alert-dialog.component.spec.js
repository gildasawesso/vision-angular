import { async, TestBed } from '@angular/core/testing';
import { CustomizableAlertDialogComponent } from './customizable-alert-dialog.component';
describe('CustomizableAlertDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomizableAlertDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CustomizableAlertDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=customizable-alert-dialog.component.spec.js.map