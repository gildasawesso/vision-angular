import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let DateComponent = class DateComponent {
    constructor() {
        this.view = 'year';
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], DateComponent.prototype, "label", void 0);
__decorate([
    Input()
], DateComponent.prototype, "control", void 0);
__decorate([
    Input()
], DateComponent.prototype, "view", void 0);
DateComponent = __decorate([
    Component({
        selector: 'app-date',
        templateUrl: './date.component.html',
        styleUrls: ['./date.component.scss']
    })
], DateComponent);
export { DateComponent };
//# sourceMappingURL=date.component.js.map