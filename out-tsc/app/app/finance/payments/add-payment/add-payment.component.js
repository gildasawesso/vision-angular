import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
let AddPaymentComponent = class AddPaymentComponent {
    constructor(data, formBuilder, classroomsRepository, studentsRepository, feeTypesRepository, dialogRef, utils, paymentsRepository, schoolyearsRepository, registrationsRepository) {
        this.data = data;
        this.formBuilder = formBuilder;
        this.classroomsRepository = classroomsRepository;
        this.studentsRepository = studentsRepository;
        this.feeTypesRepository = feeTypesRepository;
        this.dialogRef = dialogRef;
        this.utils = utils;
        this.paymentsRepository = paymentsRepository;
        this.schoolyearsRepository = schoolyearsRepository;
        this.registrationsRepository = registrationsRepository;
        this.payments = [];
        this.feeTypes = [];
        this.title = 'Nouveau payement';
        this.classroomSelected = new FormControl();
        this.registrations = [];
        this.feeTypeToAdd = new FormControl();
        this.subFeesForm = this.formBuilder.array([]);
        this.paymentForm = this.formBuilder.group({
            _id: [],
            student: [],
            schoolYear: [],
            registrationFee: [],
            schoolFee: [{ value: '', disabled: false }],
            fees: this.subFeesForm,
            classroom: [],
            reduction: [],
            amount: [0],
            paymentDate: [moment().format()]
        });
        this.payment = this.data.payment;
        if (this.payment) {
            // this.initializeUpdatedPayment();
        }
    }
    get isReady() {
        return this.classroomSelected.value != null && this.paymentForm.get('student').value != null;
    }
    ngOnInit() {
    }
};
AddPaymentComponent = __decorate([
    Component({
        selector: 'app-add-payment',
        templateUrl: './add-payment.component.html',
        styleUrls: ['./add-payment.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddPaymentComponent);
export { AddPaymentComponent };
//# sourceMappingURL=add-payment.component.js.map