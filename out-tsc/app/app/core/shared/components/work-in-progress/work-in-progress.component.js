import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let WorkInProgressComponent = class WorkInProgressComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.message = this.data;
    }
    ngOnInit() {
    }
};
WorkInProgressComponent = __decorate([
    Component({
        selector: 'app-work-in-progress',
        templateUrl: './work-in-progress.component.html',
        styleUrls: ['./work-in-progress.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], WorkInProgressComponent);
export { WorkInProgressComponent };
//# sourceMappingURL=work-in-progress.component.js.map