import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
let RegistrationStateComponent = class RegistrationStateComponent {
    constructor(spaced) {
        this.spaced = spaced;
        this.stack = [];
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        this.max = this.state.registrationFeeAmount;
        const type = this.state.registrationFeeToPay !== this.state.registrationFeePayed ? 'warning' : 'success';
        let label = this.spaced.transform(this.state.registrationFeePayed, 'F');
        if (this.max === 0)
            label = null;
        if (this.hideReduLabel) {
            this.stack = [
                { value: this.state.registrationFeePayed, type, label },
                { value: this.state.registrationFeeReduction, type: 'danger' }
            ];
        }
        else {
            this.stack = [
                { value: this.state.registrationFeePayed, type, label },
                { value: this.state.registrationFeeReduction, type: 'danger', label: this.spaced.transform(this.state.registrationFeeReduction, 'F') }
            ];
        }
    }
};
__decorate([
    Input()
], RegistrationStateComponent.prototype, "state", void 0);
__decorate([
    Input()
], RegistrationStateComponent.prototype, "hideReduLabel", void 0);
RegistrationStateComponent = __decorate([
    Component({
        selector: 'app-registration-state',
        templateUrl: './registration-state.component.html',
        styleUrls: ['./registration-state.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], RegistrationStateComponent);
export { RegistrationStateComponent };
//# sourceMappingURL=registration-state.component.js.map