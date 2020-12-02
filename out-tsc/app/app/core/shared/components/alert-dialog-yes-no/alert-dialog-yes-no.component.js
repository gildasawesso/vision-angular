import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AlertDialogYesNoComponent = class AlertDialogYesNoComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.title = '';
        this.body = '';
        this.title = this.data.title;
        this.body = this.data.body;
    }
    yes() {
        this.dialogRef.close(true);
    }
    no() {
        this.dialogRef.close(false);
    }
    ngOnInit() {
    }
};
AlertDialogYesNoComponent = __decorate([
    Component({
        selector: 'app-alert-dialog-yes-no',
        templateUrl: './alert-dialog-yes-no.component.html',
        styleUrls: ['./alert-dialog-yes-no.component.css']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AlertDialogYesNoComponent);
export { AlertDialogYesNoComponent };
//# sourceMappingURL=alert-dialog-yes-no.component.js.map