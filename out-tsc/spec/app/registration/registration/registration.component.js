import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PayComponent } from '../../finance/pay/pay.component';
let RegistrationComponent = class RegistrationComponent {
    constructor(formBuilder, classroomsRepository, studentsRepository, registrationRepository, schoolyearsRepository, paymentsRepository, schoolsRepository, feeTypesRepository, repo, router, utils, authService, schoolYearService) {
        this.formBuilder = formBuilder;
        this.classroomsRepository = classroomsRepository;
        this.studentsRepository = studentsRepository;
        this.registrationRepository = registrationRepository;
        this.schoolyearsRepository = schoolyearsRepository;
        this.paymentsRepository = paymentsRepository;
        this.schoolsRepository = schoolsRepository;
        this.feeTypesRepository = feeTypesRepository;
        this.repo = repo;
        this.router = router;
        this.utils = utils;
        this.authService = authService;
        this.schoolYearService = schoolYearService;
        this.registrationForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            birthday: [''],
            birthCity: [''],
            address: [''],
            gender: ['M', Validators.required],
            fathersFirstname: [''],
            fathersLastname: [''],
            mothersFirstname: [''],
            mothersLastname: [''],
            fathersJob: [''],
            mothersJob: [''],
            fathersPhone: [''],
            mothersPhone: [''],
            lastClass: [''],
            lastSchool: [''],
            classroom: [''],
            registrationDate: [moment().format()]
        });
        this.feeTypeToAdd = new FormControl();
        this.siblingClassroom = new FormControl();
        this.sibling = new FormControl();
        this.registrations = [];
        this.isBusy = false;
        this.registrationDateIsDifferent = false;
        this.isReregistration = false;
        this.studentHasSibling = false;
        this.siblingClassroomStudents = [];
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.canSave()) {
                return;
            }
            this.isBusy = true;
            const user = yield this.authService.getCurrentUser();
            const form = this.registrationForm.value;
            const student = yield this.studentsRepository.add(this.createStudent());
            const classroom = form.classroom;
            const registrationLike = {
                student,
                classroom,
                school: user.schools[0],
                schoolYear: this.schoolYear,
                registrationDate: form.registrationDate,
                isReregistration: this.isReregistration,
                isNewStudent: !this.isReregistration,
                reductions: []
            };
            const defaultFeeId = this.isReregistration ? classroom.reregistrationFee : classroom.registrationFee;
            const defaultFee = yield this.feeTypesRepository.one(defaultFeeId);
            const reset = yield this.utils.common.modal(PayComponent, {
                registration: registrationLike,
                defaultFee,
                isRegistration: true
            });
            if (reset) {
                this.resetAllForms();
            }
        });
    }
    resetAllForms() {
        this.registrationForm.reset();
        this.registrationForm.patchValue({
            gender: 'M',
            registrationDate: moment().format()
        });
        this.registrationForm.markAsUntouched();
        this.studentHasSibling = false;
        this.isReregistration = false;
        this.registrationDateIsDifferent = false;
        this.feeTypeToAdd.reset();
        this.siblingClassroom.reset();
        this.sibling.reset();
    }
    onClassroomSelected() {
        this.registrationForm.controls.classroom.valueChanges
            .subscribe((obj) => __awaiter(this, void 0, void 0, function* () {
            if (obj == null) {
                return;
            }
            console.log(obj);
            const classroom = this.classrooms.find(c => c._id === obj._id);
            if (classroom.registrationFee === undefined || classroom.registrationFee === null) {
                this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais d'inscription`);
                this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
                return;
            }
            if (classroom.reregistrationFee === undefined || classroom.reregistrationFee === null) {
                this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais de réinscription`);
                this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
                return;
            }
            if (classroom.schoolFee === undefined || classroom.schoolFee === null) {
                this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais de scolarité`);
                this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
                return;
            }
            const schoolFee = yield this.feeTypesRepository.one(classroom.schoolFee);
            if (schoolFee.tranches === null || schoolFee.tranches === undefined || schoolFee.tranches.length <= 0) {
                this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des tranches de scolarité.
          Veuillez vous rendre dans le module Finance afin d'associer des tranches à ce type de contribution.`);
                this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
                return;
            }
        }));
    }
    canSave() {
        if (!this.registrationForm.valid) {
            this.utils.form.invalidatedForm(this.registrationForm);
            return false;
        }
        return true;
    }
    createStudent() {
        const form = this.registrationForm.value;
        return {
            firstname: form.firstname,
            lastname: form.lastname,
            birthday: form.birthday,
            matricule: form.matricule,
            gender: form.gender,
            status: form.status,
            birthCity: form.birthCity,
            fathersFirstname: form.fathersFirstname,
            fathersLastname: form.fathersLastname,
            mothersFirstname: form.mothersFirstname,
            mothersLastname: form.mothersLastname,
            fathersJob: form.fathersJob,
            mothersJob: form.mothersJob,
            fathersPhone: form.fathersPhone,
            mothersPhone: form.mothersPhone,
            address: form.address,
            lastClass: form.lastClass,
            lastSchool: form.lastSchool
        };
    }
    ngOnInit() {
        this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);
        this.classroomsRepository.stream
            .subscribe((classrooms) => {
            this.classrooms = classrooms;
        });
        this.registrationRepository.stream
            .subscribe((registrations) => {
            this.registrations = [...registrations];
        });
        this.onClassroomSelected();
        this.siblingClassroom.valueChanges
            .subscribe((classroom) => {
            if (classroom == null)
                return;
            this.siblingClassroomStudents = this.repo.registrations.snapshot
                .filter(r => r.classroom._id === classroom._id)
                .map(r => r.student);
        });
        this.sibling.valueChanges
            .subscribe((student) => {
            this.registrationForm.get('fathersFirstname').setValue(student.fathersFirstname);
            this.registrationForm.get('fathersLastname').setValue(student.fathersLastname);
            this.registrationForm.get('mothersFirstname').setValue(student.mothersFirstname);
            this.registrationForm.get('mothersLastname').setValue(student.mothersLastname);
            this.registrationForm.get('fathersJob').setValue(student.fathersJob);
            this.registrationForm.get('mothersJob').setValue(student.mothersJob);
            this.registrationForm.get('fathersPhone').setValue(student.mothersJob);
            this.registrationForm.get('mothersPhone').setValue(student.mothersJob);
        });
    }
};
RegistrationComponent = __decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styleUrls: ['./registration.component.scss']
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map