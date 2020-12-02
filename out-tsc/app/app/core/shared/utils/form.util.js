import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let FormUtil = class FormUtil {
    constructor(dialog, snackBar) {
        this.dialog = dialog;
        this.snackBar = snackBar;
    }
    isValid(form) {
        if (form.valid) {
            return true;
        }
        else {
            Object.keys(form.controls).forEach(field => {
                const control = form.get(field); // {2}
                control.markAsTouched({ onlySelf: true }); // {3}
            });
            this.snackBar.open('Veuillez corriger les erreurs du formulaire afin de continuer s\'il vous plait', null, {
                duration: 5000
            });
            return false;
        }
    }
    invalidatedForm(form) {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field); // {2}
            control.markAsTouched({ onlySelf: true }); // {3}
        });
        this.snackBar.open('Veuillez corriger les erreurs du formulaire afin de continuer s\'il vous plait', null, {
            duration: 5000
        });
    }
    registrationFeeValidator(subPayment) {
        return (control) => {
            if (subPayment === undefined) {
                return null;
            }
            const error = `Le montant saisi est supérieur aux frais d'inscription`;
            return control.value > subPayment.fee.amount ? { invalid: error } : null;
        };
    }
    feeValidator(subPayment) {
        return (control) => {
            if (subPayment === undefined) {
                return null;
            }
            const error = `Le montant saisi est supérieur aux contributions`;
            return control.value > subPayment.fee.amount ? { invalid: error } : null;
        };
    }
};
FormUtil = __decorate([
    Injectable()
], FormUtil);
export { FormUtil };
//# sourceMappingURL=form.util.js.map