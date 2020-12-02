import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
let AlertDialogYesWithInputComponent = class AlertDialogYesWithInputComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.title = '';
        this.inputTitle = '';
        this.inputValue = '';
        this.title = this.data.title;
        this.inputTitle = this.data.inputTitle;
    }
    yes() {
        this.dialogRef.close(this.inputValue);
    }
    no() {
        this.dialogRef.close(null);
    }
    ngOnInit() {
    }
};
AlertDialogYesWithInputComponent = __decorate([
    Component({
        selector: 'app-alert-dialog-yes-with-input',
        templateUrl: './alert-dialog-yes-with-input.component.html',
        styleUrls: ['./alert-dialog-yes-with-input.component.css']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AlertDialogYesWithInputComponent);
export { AlertDialogYesWithInputComponent };
//# sourceMappingURL=alert-dialog-yes-with-input.component.js.map