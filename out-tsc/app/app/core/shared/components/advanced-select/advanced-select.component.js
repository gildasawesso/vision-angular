var AdvancedSelectComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let AdvancedSelectComponent = AdvancedSelectComponent_1 = class AdvancedSelectComponent {
    constructor(utils) {
        this.utils = utils;
        this.multiple = false;
        this.addEmptyOption = false;
        this.emptyLabel = 'Veuillez sélectionner une valeur';
    }
    registerOnChange(fn) {
    }
    registerOnTouched(fn) {
    }
    setDisabledState(isDisabled) {
    }
    writeValue(obj) {
    }
};
__decorate([
    Input()
], AdvancedSelectComponent.prototype, "options", void 0);
__decorate([
    Input()
], AdvancedSelectComponent.prototype, "valueKey", void 0);
__decorate([
    Input()
], AdvancedSelectComponent.prototype, "displayKey", void 0);
__decorate([
    Input()
], AdvancedSelectComponent.prototype, "multiple", void 0);
__decorate([
    Input()
], AdvancedSelectComponent.prototype, "addEmptyOption", void 0);
__decorate([
    Input()
], AdvancedSelectComponent.prototype, "emptyLabel", void 0);
__decorate([
    Input()
], AdvancedSelectComponent.prototype, "control", void 0);
AdvancedSelectComponent = AdvancedSelectComponent_1 = __decorate([
    Component({
        selector: 'app-advanced-select',
        templateUrl: './advanced-select.component.html',
        styleUrls: ['./advanced-select.component.scss'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AdvancedSelectComponent_1),
                multi: true
            }
        ]
    })
], AdvancedSelectComponent);
export { AdvancedSelectComponent };
//# sourceMappingURL=advanced-select.component.js.map