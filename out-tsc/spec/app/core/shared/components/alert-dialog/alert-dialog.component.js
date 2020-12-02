import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AlertDialogComponent = class AlertDialogComponent {
    constructor(data) {
        this.data = data;
        this.title = '';
        this.body = '';
        this.title = this.data.title;
        this.body = this.data.body;
    }
    ngOnInit() {
    }
};
AlertDialogComponent = __decorate([
    Component({
        selector: 'app-alert-dialog',
        templateUrl: './alert-dialog.component.html',
        styleUrls: ['./alert-dialog.component.css']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AlertDialogComponent);
export { AlertDialogComponent };
//# sourceMappingURL=alert-dialog.component.js.map