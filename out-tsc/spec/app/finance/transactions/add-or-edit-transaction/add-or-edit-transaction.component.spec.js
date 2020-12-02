import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AddOrEditTransactionComponent } from './add-or-edit-transaction.component';
describe('AddOrEditTransactionComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AddOrEditTransactionComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditTransactionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-transaction.component.spec.js.map