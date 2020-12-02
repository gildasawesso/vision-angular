var SelectComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let SelectComponent = SelectComponent_1 = class SelectComponent {
    constructor(utils) {
        this.utils = utils;
        this.disabled = false;
        this.multiple = false;
        this.addEmptyOption = false;
        this.emptyLabel = 'Veuillez sélectionner une valeur';
        // tslint:disable-next-line:variable-name
        this._value = null;
        this.type = 'text';
    }
    get value() {
        return this._value;
    }
    set value(val) {
        if (val) {
            this._value = val;
            if (this.propagateChange) {
                this.propagateChange(this._value);
            }
            if (this.onTouched) {
                this.onTouched();
            }
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        if (obj !== undefined) {
            this._value = obj;
        }
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], SelectComponent.prototype, "label", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "options", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "valueKey", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "displayKey", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "multiple", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "addEmptyOption", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "emptyLabel", void 0);
__decorate([
    Input()
], SelectComponent.prototype, "control", void 0);
__decorate([
    Input('value')
], SelectComponent.prototype, "_value", void 0);
__decorate([
    Input('type')
], SelectComponent.prototype, "type", void 0);
SelectComponent = SelectComponent_1 = __decorate([
    Component({
        selector: 'app-select',
        templateUrl: './select.component.html',
        styleUrls: ['./select.component.scss'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SelectComponent_1),
                multi: true
            }
        ]
    })
], SelectComponent);
export { SelectComponent };
//# sourceMappingURL=select.component.js.map