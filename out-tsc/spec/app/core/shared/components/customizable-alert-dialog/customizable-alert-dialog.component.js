import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let CustomizableAlertDialogComponent = class CustomizableAlertDialogComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.title = '';
        this.body = '';
        this.title = this.data.title;
        this.body = this.data.body;
        this.actions = this.data.actions || ['OK'];
        this.buttonsNumber = this.data.actions.length;
    }
    ngOnInit() {
    }
};
CustomizableAlertDialogComponent = __decorate([
    Component({
        selector: 'app-customizable-alert-dialog',
        templateUrl: './customizable-alert-dialog.component.html',
        styleUrls: ['./customizable-alert-dialog.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], CustomizableAlertDialogComponent);
export { CustomizableAlertDialogComponent };
//# sourceMappingURL=customizable-alert-dialog.component.js.map