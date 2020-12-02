import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AddOrEditTransactionTypeComponent } from './add-or-edit-transaction-type.component';
describe('AddOrEditTransactionTypeComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AddOrEditTransactionTypeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditTransactionTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-transaction-type.component.spec.js.map