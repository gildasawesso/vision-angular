import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { constants } from '../../../core/constants';
import { date } from '@ng-validators/ng-validators';
let AddOrEditTransactionComponent = class AddOrEditTransactionComponent {
    constructor(data, dialogRef, fb, services, repo, utils) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.services = services;
        this.repo = repo;
        this.utils = utils;
        this.amount = new FormControl(0, [Validators.required, Validators.min(0)]);
        this.name = new FormControl('', Validators.required);
        this.transactionType = new FormControl(Validators.required);
        this.transactionForm = this.fb.group({
            name: ['', Validators.required],
            amount: [0, [Validators.required, Validators.min(1)]],
            type: ['', Validators.required],
            date: [new Date(), [Validators.required, date]]
        });
        this.operation = this.data.operation;
        this.transaction = this.data.transaction;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.transactionForm);
            if (this.utils.form.isValid(this.transactionForm)) {
                if (this.transaction) {
                    yield this.edit();
                }
                else {
                    yield this.add();
                }
            }
            else {
                this.utils.common.toast(`Il existe des erreurs dans le formulaire`);
            }
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionLike = this.transactionForm.value;
            const user = this.services.auth.currentUser;
            const transaction = {
                name: transactionLike.name,
                amount: Number(transactionLike.amount),
                transactionTypeId: transactionLike.type,
                transactionDate: transactionLike.date,
                operation: this.operation,
                schoolId: user.schools[0],
                schoolYearId: this.services.schoolYear.snapshot._id
            };
            try {
                yield this.repo.transactions.add(transaction);
                this.dialogRef.close();
            }
            catch (e) {
                console.error(e);
                this.utils.common.alert(JSON.stringify(e), `Une erreur est survenue`);
            }
        });
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionLike = this.transactionForm.value;
            const user = this.services.auth.currentUser;
            const transaction = {
                name: transactionLike.name,
                amount: Number(transactionLike.amount),
                transactionTypeId: transactionLike.type,
                transactionDate: transactionLike.date,
                operation: this.operation,
                schoolId: user.schools[0],
                schoolYearId: this.services.schoolYear.snapshot._id
            };
            try {
                yield this.repo.transactions.update(transaction, this.transaction._id);
                this.dialogRef.close();
            }
            catch (e) {
                console.error(e);
                this.utils.common.alert(JSON.stringify(e), `Une erreur est survenue`);
            }
        });
    }
    ngOnInit() {
        if (this.operation === constants.common.expenseTransaction) {
            this.types = this.repo.transactionTypes.expenseTypes;
        }
        else {
            this.types = this.repo.transactionTypes.incomeTypes;
        }
    }
};
AddOrEditTransactionComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-transaction',
        templateUrl: './add-or-edit-transaction.component.html',
        styleUrls: ['./add-or-edit-transaction.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddOrEditTransactionComponent);
export { AddOrEditTransactionComponent };
//# sourceMappingURL=add-or-edit-transaction.component.js.map