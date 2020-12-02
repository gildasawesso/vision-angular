var InputComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { formConstants } from '../../../constants/form.constants';
let InputComponent = InputComponent_1 = class InputComponent {
    constructor() {
        this.placeholder = '';
        // tslint:disable-next-line:variable-name
        this._value = '';
        this.type = 'text';
        this.passwordMinimumLength = formConstants.passwordMinimumLength;
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
        else {
            this._value = '';
            if (this.propagateChange) {
                this.propagateChange('');
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
            this.value = obj;
        }
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], InputComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], InputComponent.prototype, "name", void 0);
__decorate([
    Input()
], InputComponent.prototype, "control", void 0);
__decorate([
    Input('value')
], InputComponent.prototype, "_value", void 0);
__decorate([
    Input('type')
], InputComponent.prototype, "type", void 0);
InputComponent = InputComponent_1 = __decorate([
    Component({
        selector: 'app-input',
        templateUrl: './input.component.html',
        styleUrls: ['./input.component.scss'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => InputComponent_1),
                multi: true
            }
        ]
    })
], InputComponent);
export { InputComponent };
//# sourceMappingURL=input.component.js.map