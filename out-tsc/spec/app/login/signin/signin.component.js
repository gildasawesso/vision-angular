import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { formConstants } from '../../core/constants/form.constants';
let SigninComponent = class SigninComponent {
    constructor(utils, formBuilder, router, services) {
        this.utils = utils;
        this.formBuilder = formBuilder;
        this.router = router;
        this.services = services;
        this.signinForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(formConstants.passwordMinimumLength)]],
        });
        this.isBusy = false;
    }
    signin() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBusy = true;
            if (this.signinForm.valid) {
                const signinInfo = this.signinForm.value;
                try {
                    yield this.services.auth.signin(signinInfo.username, signinInfo.password);
                    yield this.services.permission.loadPermissions();
                    yield this.router.navigateByUrl('');
                }
                catch (e) {
                    this.utils.common.alert(e.error.message, 'Erreur');
                    this.isBusy = false;
                }
            }
            else {
                this.utils.form.invalidatedForm(this.signinForm);
                this.isBusy = false;
            }
        });
    }
    ngOnInit() {
    }
};
SigninComponent = __decorate([
    Component({
        selector: 'app-signin',
        templateUrl: './signin.component.html',
        styleUrls: ['./signin.component.scss']
    })
], SigninComponent);
export { SigninComponent };
//# sourceMappingURL=signin.component.js.map