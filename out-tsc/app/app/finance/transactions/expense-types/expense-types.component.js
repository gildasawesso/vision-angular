import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditTransactionTypeComponent } from '../add-or-edit-transaction-type/add-or-edit-transaction-type.component';
let ExpenseTypesComponent = class ExpenseTypesComponent {
    constructor(repo, services, utils) {
        this.repo = repo;
        this.services = services;
        this.utils = utils;
        this.columns = [{ name: `Type`, prop: 'name' }];
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.modal(AddOrEditTransactionTypeComponent, {
                message: `Ajout d'un type de dépense`
            }, null, {
                minWidth: 'auto',
                height: 'auto'
            });
            if (result) {
                const user = this.services.auth.currentUser;
                const type = {
                    name: result,
                    schoolId: user.schools[0],
                    type: 'expense'
                };
                yield this.repo.transactionTypes.add(type);
            }
        });
    }
    edit(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.modal(AddOrEditTransactionTypeComponent, {
                name: type.name,
                message: `Modification du type de dépense`
            }, null, {
                minWidth: 'auto',
                height: 'auto'
            });
            if (result && result !== type.name) {
                const user = this.services.auth.currentUser;
                const transactionType = {
                    name: result,
                    schoolId: user.schools[0],
                    type: 'expense'
                };
                yield this.repo.transactionTypes.update(transactionType, type._id);
            }
        });
    }
    ngOnInit() {
        this.expenseTypes = this.repo.transactionTypes.expenseTypes;
    }
};
ExpenseTypesComponent = __decorate([
    Component({
        selector: 'app-expense-types',
        templateUrl: './expense-types.component.html',
        styleUrls: ['./expense-types.component.scss']
    })
], ExpenseTypesComponent);
export { ExpenseTypesComponent };
//# sourceMappingURL=expense-types.component.js.map