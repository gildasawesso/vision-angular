var NewInputComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { formConstants } from '../../../constants/form.constants';
let NewInputComponent = NewInputComponent_1 = class NewInputComponent {
    constructor(utils) {
        this.utils = utils;
        this.type = 'text';
        this.passwordMinimumLength = formConstants.passwordMinimumLength;
    }
    registerOnChange(fn) { }
    registerOnTouched(fn) { }
    setDisabledState(isDisabled) { }
    writeValue(obj) { }
    ngOnInit() {
    }
};
__decorate([
    Input()
], NewInputComponent.prototype, "formControl", void 0);
__decorate([
    Input('type')
], NewInputComponent.prototype, "type", void 0);
NewInputComponent = NewInputComponent_1 = __decorate([
    Component({
        selector: 'app-new-input',
        templateUrl: './new-input.component.html',
        styleUrls: ['./new-input.component.scss'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NewInputComponent_1),
                multi: true
            }
        ]
    })
], NewInputComponent);
export { NewInputComponent };
//# sourceMappingURL=new-input.component.js.map