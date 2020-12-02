import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SchoolSession } from '../../core/models/school-session';
import { School } from '../../core/models/school';
let SetupSchoolyearsComponent = class SetupSchoolyearsComponent {
    constructor(formBuilder, utils, schoolyearsRepository, router, auth, permissions) {
        this.formBuilder = formBuilder;
        this.utils = utils;
        this.schoolyearsRepository = schoolyearsRepository;
        this.router = router;
        this.auth = auth;
        this.permissions = permissions;
        this.schoolYearSessionForm = this.formBuilder.group({
            name: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
        });
        this.schoolYearForm = this.formBuilder.group({
            _id: [null],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            sessions: this.formBuilder.array([]),
            school: School,
        });
        this.isBusy = false;
    }
    get sessions() {
        return this.schoolYearForm.controls.sessions;
    }
    addSession() {
        if (this.utils.form.isValid(this.schoolYearSessionForm)) {
            const group = this.formBuilder.group(new SchoolSession());
            group.patchValue(this.schoolYearSessionForm.value);
            this.sessions.push(group);
            this.schoolYearSessionForm.reset();
        }
    }
    removeSession(index) {
        this.sessions.removeAt(index);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBusy = true;
            if (this.utils.form.isValid(this.schoolYearForm)) {
                if (this.sessions.length < 2) {
                    this.utils.common.alert('Vous devez ajouter au moins 2 sessions ou trimestres');
                    return;
                }
                const newSchoolYear = this.schoolYearForm.value;
                newSchoolYear.school = this.auth.currentUser.schools[0];
                yield this.schoolyearsRepository.add(newSchoolYear);
                yield this.permissions.loadPermissions();
                yield this.router.navigateByUrl('');
                this.isBusy = false;
            }
            this.isBusy = false;
        });
    }
    ngOnInit() {
    }
};
SetupSchoolyearsComponent = __decorate([
    Component({
        selector: 'app-setup-schoolyears',
        templateUrl: './setup-schoolyears.component.html',
        styleUrls: ['./setup-schoolyears.component.scss']
    })
], SetupSchoolyearsComponent);
export { SetupSchoolyearsComponent };
//# sourceMappingURL=setup-schoolyears.component.js.map