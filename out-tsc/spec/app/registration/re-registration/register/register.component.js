import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PayComponent } from '../../../finance/pay/pay.component';
let RegisterComponent = class RegisterComponent {
    constructor(data, dialogRef, classroomsRepository, schoolyearsRepository, registrationsRepository, schoolYearService, repo, utils, auth) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.classroomsRepository = classroomsRepository;
        this.schoolyearsRepository = schoolyearsRepository;
        this.registrationsRepository = registrationsRepository;
        this.schoolYearService = schoolYearService;
        this.repo = repo;
        this.utils = utils;
        this.auth = auth;
        this.newClassroom = new FormControl('', Validators.required);
        this.registrationDate = new FormControl(moment(), Validators.required);
        this.oldRegistration = this.data;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRegistrationInCurrentSchoolYear()) {
                const registrationLike = {
                    classroom: this.newClassroom.value,
                    isReregistration: true,
                    isNewStudent: false,
                    schoolYear: this.currentSchoolYear,
                    student: this.oldRegistration.student,
                    registrationDate: this.registrationDate.value,
                    reductions: [],
                    school: this.auth.currentUser.schools[0]
                };
                const defaultFee = yield this.repo.fees.one(registrationLike.classroom.reregistrationFee);
                const canClose = yield this.utils.common.modal(PayComponent, {
                    defaultFee,
                    registration: registrationLike,
                    isRegistration: true
                }, true);
                if (canClose) {
                    this.dialogRef.close();
                }
            }
            else {
                this.utils.common.toast(`Vous devez réaliser l'inscription au cours de l'année scolaire sélectionnée`);
            }
        });
    }
    ngOnInit() {
        this.classroomsRepository.stream.subscribe(classrooms => this.classrooms = classrooms);
        this.schoolyearsRepository.stream.subscribe(sy => this.schoolsYears = sy);
        this.schoolYearService.schoolYear.subscribe(sySelected => this.currentSchoolYear = sySelected);
    }
    isRegistrationInCurrentSchoolYear() {
        const start = moment(this.currentSchoolYear.startDate);
        const end = moment(this.currentSchoolYear.endDate);
        return moment(this.registrationDate.value).isBetween(start, end, null, '[]');
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map