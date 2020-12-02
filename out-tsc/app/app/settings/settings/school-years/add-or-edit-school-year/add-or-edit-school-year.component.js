import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { School } from '../../../../core/models/school';
import { SchoolSession } from '../../../../core/models/school-session';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditSchoolYearComponent = class AddOrEditSchoolYearComponent {
    constructor(formBuilder, utils, schoolyearsRepository, router, auth, permissions, data, dialogRef) {
        this.formBuilder = formBuilder;
        this.utils = utils;
        this.schoolyearsRepository = schoolyearsRepository;
        this.router = router;
        this.auth = auth;
        this.permissions = permissions;
        this.data = data;
        this.dialogRef = dialogRef;
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
        this.schoolYear = this.data;
        if (this.schoolYear) {
            this.schoolYear.sessions.forEach(session => {
                const group = this.formBuilder.group(session);
                this.sessions.push(group);
            });
            this.schoolYearForm.patchValue(this.schoolYear);
        }
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
                if (this.schoolYear) {
                    yield this.edit();
                }
                else {
                    yield this.add();
                }
            }
            this.isBusy = false;
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const newSchoolYear = this.schoolYearForm.value;
            newSchoolYear.school = this.auth.currentUser.schools[0];
            yield this.schoolyearsRepository.add(newSchoolYear);
            this.isBusy = false;
            this.dialogRef.close();
        });
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
            const newSchoolYear = this.schoolYearForm.value;
            yield this.schoolyearsRepository.update(newSchoolYear, this.schoolYear._id);
            this.isBusy = false;
            this.dialogRef.close();
        });
    }
    ngOnInit() {
    }
};
AddOrEditSchoolYearComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-school-year',
        templateUrl: './add-or-edit-school-year.component.html',
        styleUrls: ['./add-or-edit-school-year.component.scss']
    }),
    __param(6, Inject(MAT_DIALOG_DATA))
], AddOrEditSchoolYearComponent);
export { AddOrEditSchoolYearComponent };
//# sourceMappingURL=add-or-edit-school-year.component.js.map