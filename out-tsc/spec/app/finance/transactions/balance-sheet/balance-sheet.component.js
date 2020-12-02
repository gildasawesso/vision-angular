import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddOrEditSpendComponent } from './add-or-edit-spend/add-or-edit-spend.component';
import { AddOrEditIncomeComponent } from './add-or-edit-income/add-or-edit-income.component';
let BalanceSheetComponent = class BalanceSheetComponent {
    constructor(utils, paymentsRepository) {
        this.utils = utils;
        this.paymentsRepository = paymentsRepository;
        this.filterStartDate = new FormControl();
        this.filterEndDate = new FormControl();
    }
    openSpentDialog() {
        return __awaiter(this, void 0, void 0, function* () {
            const spent = yield this.utils.common.dialogWithoutPadding(AddOrEditSpendComponent, null);
        });
    }
    openIncomeDialog() {
        return __awaiter(this, void 0, void 0, function* () {
            const spent = yield this.utils.common.dialogWithoutPadding(AddOrEditIncomeComponent, null);
        });
    }
    ngOnInit() {
        this.paymentsRepository.stream.subscribe(payments => {
            this.payments = payments;
            this.allPayments = this.utils.student.allStudentsPaymentsWithOtherPayments(payments);
        });
    }
};
BalanceSheetComponent = __decorate([
    Component({
        selector: 'app-balance-sheet',
        templateUrl: './balance-sheet.component.html',
        styleUrls: ['./balance-sheet.component.scss']
    })
], BalanceSheetComponent);
export { BalanceSheetComponent };
//# sourceMappingURL=balance-sheet.component.js.map