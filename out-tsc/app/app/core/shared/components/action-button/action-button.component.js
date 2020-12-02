import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let ActionButtonComponent = class ActionButtonComponent {
    constructor(services) {
        this.services = services;
        this.appClick = new EventEmitter();
    }
    onClick() {
        this.appClick.emit();
    }
    ngOnInit() {
        this.services.smallWork.isBusy.subscribe(v => this.isBusy = v);
    }
};
__decorate([
    Input()
], ActionButtonComponent.prototype, "text", void 0);
__decorate([
    Input()
], ActionButtonComponent.prototype, "color", void 0);
__decorate([
    Input()
], ActionButtonComponent.prototype, "type", void 0);
__decorate([
    Output()
], ActionButtonComponent.prototype, "appClick", void 0);
ActionButtonComponent = __decorate([
    Component({
        selector: 'app-action-button',
        templateUrl: './action-button.component.html',
        styleUrls: ['./action-button.component.scss']
    })
], ActionButtonComponent);
export { ActionButtonComponent };
//# sourceMappingURL=action-button.component.js.map