import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let TitleComponent = class TitleComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    Input()
], TitleComponent.prototype, "head1", void 0);
__decorate([
    Input()
], TitleComponent.prototype, "head2", void 0);
TitleComponent = __decorate([
    Component({
        selector: 'app-title',
        templateUrl: './title.component.html',
        styleUrls: ['./title.component.scss']
    })
], TitleComponent);
export { TitleComponent };
//# sourceMappingURL=title.component.js.map