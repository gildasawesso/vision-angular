import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants';
let TransactionTypesRepository = class TransactionTypesRepository extends BaseRepository {
    constructor() {
        super('/transactions/types');
        this.incomesTypes$ = new BehaviorSubject([]);
        this.expensesTypes$ = new BehaviorSubject([]);
        this.onUpdate();
    }
    get incomeTypes() { return this.incomesTypes$.asObservable(); }
    get expenseTypes() { return this.expensesTypes$.asObservable(); }
    onUpdate() {
        this.stream.subscribe((types) => __awaiter(this, void 0, void 0, function* () {
            const incomes = types.filter(type => type.type === constants.common.incomeTransaction);
            const expenses = types.filter(type => type.type === constants.common.expenseTransaction);
            this.incomesTypes$.next(incomes);
            this.expensesTypes$.next(expenses);
        }));
    }
};
TransactionTypesRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TransactionTypesRepository);
export { TransactionTypesRepository };
//# sourceMappingURL=transaction-types.repository.js.map