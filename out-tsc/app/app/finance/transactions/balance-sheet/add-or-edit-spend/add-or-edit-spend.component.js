import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
let AddOrEditSpendComponent = class AddOrEditSpendComponent {
    constructor() {
        this.amount = new FormControl();
    }
    ngOnInit() {
    }
};
AddOrEditSpendComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-spend',
        templateUrl: './add-or-edit-spend.component.html',
        styleUrls: ['./add-or-edit-spend.component.scss']
    })
], AddOrEditSpendComponent);
export { AddOrEditSpendComponent };
//# sourceMappingURL=add-or-edit-spend.component.js.map