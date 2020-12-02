import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let ListComponent = class ListComponent {
    constructor() {
        this.displayAll = false;
        this.onClicked = new EventEmitter();
        this.selected = -1;
    }
    itemSelected(item, index) {
        this.selected = index;
        this.onClicked.emit(item);
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ListComponent.prototype, "items", void 0);
__decorate([
    Input()
], ListComponent.prototype, "displayKey", void 0);
__decorate([
    Input()
], ListComponent.prototype, "displayAll", void 0);
__decorate([
    Output()
], ListComponent.prototype, "onClicked", void 0);
ListComponent = __decorate([
    Component({
        selector: 'app-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.scss']
    })
], ListComponent);
export { ListComponent };
//# sourceMappingURL=list.component.js.map