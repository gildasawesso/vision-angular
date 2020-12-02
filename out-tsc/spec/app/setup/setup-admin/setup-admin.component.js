import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { formConstants } from '../../core/constants/form.constants';
let SetupAdminComponent = class SetupAdminComponent {
    constructor(utils, formBuilder, router, services) {
        this.utils = utils;
        this.formBuilder = formBuilder;
        this.router = router;
        this.services = services;
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(formConstants.passwordMinimumLength)]],
            isAdmin: true
        });
        this.isBusy = false;
        this.passwordConfirmation = new FormControl('', [Validators.required, Validators.minLength(formConstants.passwordMinimumLength)]);
    }
    signup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.services.smallWork.started();
            if (this.utils.form.isValid(this.signupForm)) {
                if (this.arePasswordsSame()) {
                    const signupInfo = this.signupForm.value;
                    try {
                        yield this.services.auth.signup(signupInfo);
                        yield this.router.navigateByUrl('/setup/school');
                    }
                    catch (e) {
                        this.utils.common.alert(e.error.message, 'Erreur');
                        this.services.smallWork.finished();
                    }
                }
                else {
                    this.utils.common.toast('Les mots de passe sont différents');
                    this.services.smallWork.finished();
                }
            }
            else {
                this.services.smallWork.finished();
            }
        });
    }
    arePasswordsSame() {
        return this.signupForm.get('password').value === this.passwordConfirmation.value;
    }
    ngOnInit() {
    }
};
SetupAdminComponent = __decorate([
    Component({
        selector: 'app-setup-admin',
        templateUrl: './setup-admin.component.html',
        styleUrls: ['./setup-admin.component.scss']
    })
], SetupAdminComponent);
export { SetupAdminComponent };
//# sourceMappingURL=setup-admin.component.js.map