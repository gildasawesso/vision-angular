import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditTransactionTypeComponent = class AddOrEditTransactionTypeComponent {
    constructor(dialogRef, data, utils) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.utils = utils;
        this.name = '';
        this.isEdit = false;
        this.message = this.data.message;
        this.name = this.data.name;
        if (this.name) {
            this.isEdit = true;
        }
    }
    close() {
        this.dialogRef.close(null);
    }
    save() {
        if (this.name === undefined || this.name == null || this.name.trim() === '') {
            this.utils.common.toast(`Le type ne peut pas être vide`);
            return;
        }
        this.dialogRef.close(this.name.trim());
    }
    ngOnInit() {
    }
};
AddOrEditTransactionTypeComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-transaction-type',
        templateUrl: './add-or-edit-transaction-type.component.html',
        styleUrls: ['./add-or-edit-transaction-type.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], AddOrEditTransactionTypeComponent);
export { AddOrEditTransactionTypeComponent };
//# sourceMappingURL=add-or-edit-transaction-type.component.js.map