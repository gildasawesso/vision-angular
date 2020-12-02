import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let SetupSchoolComponent = class SetupSchoolComponent {
    constructor(formBuilder, utils, schoolsRepository, router, auth) {
        this.formBuilder = formBuilder;
        this.utils = utils;
        this.schoolsRepository = schoolsRepository;
        this.router = router;
        this.auth = auth;
        this.schoolForm = this.formBuilder.group({
            _id: [null],
            name: ['', Validators.required],
            zipCode: [''],
            phones: [''],
            mobile: [''],
            address: ['', Validators.required],
            phone: [''],
            email: [''],
        });
        this.isBusy = false;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBusy = true;
            if (this.utils.form.isValid(this.schoolForm)) {
                try {
                    const newSchool = this.schoolForm.value;
                    const school = yield this.schoolsRepository.add(newSchool);
                    const user = yield this.auth.getCurrentUser();
                    user.schools.push(school._id);
                    this.auth.currentUser = yield this.auth.updateUser(user);
                    yield this.router.navigateByUrl('/setup/schoolyears');
                    this.isBusy = false;
                }
                catch (e) {
                    this.utils.common.alert(e.error && e.error.message ? e.error.message : e.message, 'Erreur');
                    this.isBusy = false;
                }
            }
            this.isBusy = false;
        });
    }
    ngOnInit() {
    }
};
SetupSchoolComponent = __decorate([
    Component({
        selector: 'app-setup-school',
        templateUrl: './setup-school.component.html',
        styleUrls: ['./setup-school.component.scss']
    })
], SetupSchoolComponent);
export { SetupSchoolComponent };
//# sourceMappingURL=setup-school.component.js.map