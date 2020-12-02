import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';
import { AddOrEditTransactionComponent } from './add-or-edit-transaction/add-or-edit-transaction.component';
import { constants } from '../../core/constants';
let TransactionComponent = class TransactionComponent {
    constructor(repo, utils) {
        this.repo = repo;
        this.utils = utils;
        this.constants = constants;
        this.datePickerFilter = new FormControl([
            this.startDateFiltering ? new Date(this.startDateFiltering) : dayjs(),
            this.endDateFiltering ? new Date(this.endDateFiltering) : dayjs()
        ]);
        this.ranges = [
            {
                value: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date()],
                label: 'Hier'
            },
            {
                value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
                label: 'Derniers 7 jours'
            },
            {
                value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
                label: 'Derniers 30 jours'
            }
        ];
        this.datePickerConfg = {
            rangeInputFormat: 'DD MMM YY',
            showPreviousMonth: true,
            isAnimated: true,
            ranges: this.ranges
        };
    }
    get startDateFiltering() {
        return localStorage.getItem(constants.common.balanceStartDateKey);
    }
    set startDateFiltering(date) {
        localStorage.setItem(constants.common.balanceStartDateKey, date);
    }
    get endDateFiltering() {
        return localStorage.getItem(constants.common.balanceEndDateKey);
    }
    set endDateFiltering(date) {
        localStorage.setItem(constants.common.balanceEndDateKey, date);
    }
    spend() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditTransactionComponent, {
                operation: constants.common.expenseTransaction
            }, null, {
                height: 'auto',
                minWidth: 500
            });
        });
    }
    addIncome() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditTransactionComponent, {
                operation: constants.common.incomeTransaction
            }, null, {
                height: 'auto',
                minWidth: 500
            });
        });
    }
    edit(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditTransactionComponent, {
                operation: constants.common.incomeTransaction,
                transaction
            }, null, {
                height: 'auto',
                minWidth: 500
            });
        });
    }
    delete(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.transactions.remove(transaction._id);
        });
    }
    getGroupedTransactions(transactions) {
        const transactionNormalized = transactions.map(transaction => {
            return Object.assign(Object.assign({}, transaction), { transactionDate: dayjs(transaction.transactionDate).format('DD MMMM YYYY') });
        });
        const group = this.utils.common.groupBy('transactionDate', transactionNormalized);
        const groupKeys = Object.keys(group).sort((d1, d2) => dayjs(d2).diff(d1, 'day'));
        return groupKeys.map(key => [key, group[key]]);
    }
    filterTransactions() {
    }
    ngOnInit() {
        this.balance = this.repo.transactions.balance;
        this.repo.transactions.stream.subscribe(transactions => {
            this.transactions = transactions;
            this.groupedTransactions = this.getGroupedTransactions(transactions);
        });
        this.datePickerFilter.valueChanges.subscribe(range => {
            const start = range[0];
            const end = range[1];
            this.startDateFiltering = start;
            this.endDateFiltering = end;
            const transactions = this.transactions.filter(transaction => {
                const cond1 = dayjs(transaction.transactionDate).isSame(dayjs(start), 'day') || dayjs(transaction.transactionDate).isAfter(dayjs(start), 'day');
                const cond2 = dayjs(transaction.transactionDate).isSame(dayjs(end), 'day') || dayjs(transaction.transactionDate).isBefore(dayjs(end), 'day');
                return cond1 && cond2;
            });
            this.groupedTransactions = this.getGroupedTransactions(transactions);
        });
        this.columns = [
            { name: 'Description', prop: 'name' },
            { name: 'Montant', prop: 'amount' },
            { name: '', cellTemplate: this.actionsTemplate }
        ];
    }
};
__decorate([
    ViewChild('actions', { static: true })
], TransactionComponent.prototype, "actionsTemplate", void 0);
TransactionComponent = __decorate([
    Component({
        selector: 'app-balance',
        templateUrl: './transaction.component.html',
        styleUrls: ['./transaction.component.scss']
    })
], TransactionComponent);
export { TransactionComponent };
//# sourceMappingURL=transaction.component.js.map