import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
let ChartHostDirective = class ChartHostDirective {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
};
__decorate([
    Input('chartHost')
], ChartHostDirective.prototype, "component", void 0);
ChartHostDirective = __decorate([
    Directive({
        selector: '[chartHost]'
    })
], ChartHostDirective);
export { ChartHostDirective };
//# sourceMappingURL=chart-host.directive.js.map