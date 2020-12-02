import { async, TestBed } from '@angular/core/testing';
import { AdvancedSelectComponent } from './advanced-select.component';
describe('AdvancedSelectComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdvancedSelectComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=advanced-select.component.spec.js.map