import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditTransactionTypeComponent } from '../add-or-edit-transaction-type/add-or-edit-transaction-type.component';
import { constants } from '../../../core/constants';
let IncomeTypesComponent = class IncomeTypesComponent {
    constructor(repo, services, utils) {
        this.repo = repo;
        this.services = services;
        this.utils = utils;
        this.columns = [{ name: `Type`, prop: 'name' }];
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.modal(AddOrEditTransactionTypeComponent, {
                message: `Ajout d'un type de revenu`
            }, null, {
                minWidth: 'auto',
                height: 'auto'
            });
            if (result) {
                const user = this.services.auth.currentUser;
                const type = {
                    name: result,
                    schoolId: user.schools[0],
                    type: 'income'
                };
                yield this.repo.transactionTypes.add(type);
            }
        });
    }
    edit(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.modal(AddOrEditTransactionTypeComponent, {
                name: type.name,
                message: `Modification du type de revenu`
            }, null, {
                minWidth: 'auto',
                height: 'auto'
            });
            if (result && result !== type.name) {
                const user = this.services.auth.currentUser;
                const transactionType = {
                    name: result,
                    schoolId: user.schools[0],
                    type: constants.common.incomeTransaction
                };
                yield this.repo.transactionTypes.update(transactionType, type._id);
            }
        });
    }
    remove(type) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ngOnInit() {
        this.incomeTypes = this.repo.transactionTypes.incomeTypes;
    }
};
IncomeTypesComponent = __decorate([
    Component({
        selector: 'app-income-types',
        templateUrl: './income-types.component.html',
        styleUrls: ['./income-types.component.scss']
    })
], IncomeTypesComponent);
export { IncomeTypesComponent };
//# sourceMappingURL=income-types.component.js.map