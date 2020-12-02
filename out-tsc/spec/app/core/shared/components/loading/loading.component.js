import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let LoadingComponent = class LoadingComponent {
    constructor(data) {
        this.data = data;
        this.message = data.message;
    }
    ngOnInit() {
    }
};
LoadingComponent = __decorate([
    Component({
        selector: 'app-loading',
        templateUrl: './loading.component.html',
        styleUrls: ['./loading.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], LoadingComponent);
export { LoadingComponent };
//# sourceMappingURL=loading.component.js.map