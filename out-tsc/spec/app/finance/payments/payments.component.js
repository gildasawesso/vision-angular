import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { constants } from '../../core/constants';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { StudentChooserComponent } from '../../core/shared/components/student-chooser/student-chooser.component';
import { PayComponent } from '../pay/pay.component';
import { EditPayComponent } from '../edit-pay/edit-pay.component';
let PaymentsComponent = class PaymentsComponent {
    constructor(paymentRepository, repo, utils, changeDetector, classroomsRepository, registrationsRepository) {
        this.paymentRepository = paymentRepository;
        this.repo = repo;
        this.utils = utils;
        this.changeDetector = changeDetector;
        this.classroomsRepository = classroomsRepository;
        this.registrationsRepository = registrationsRepository;
        this.ranges = [{
                value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
                label: 'Derniers 7 jours'
            }
        ];
        this.datePickerConfg = {
            rangeInputFormat: 'DD MMM YYYY',
            ranges: this.ranges
        };
        this.classroomSelected = new FormControl(null);
        this.studentSelected = new FormControl(null);
        this.filterDate = new FormControl([
            new Date(this.startDateFiltering),
            new Date(this.endDateFiltering)
        ]);
        this.startOfTheWeek = null;
        this.endOfTheWeek = null;
        this.students = [];
        this.classrooms = [];
        this.registrations = [];
        this.registrationsFiltred = [];
        this.payments = [];
        this.mapping = {
            paymentDate: 'Date de payement',
            'array fees fee.name': 'Type de contribution',
            amount: 'Montant',
            options: 'Options',
        };
        this.optionsPermissions = { edit: constants.permissions.editPayment, delete: constants.permissions.deletePayment };
    }
    get startDateFiltering() {
        return localStorage.getItem('filteringStartDate');
    }
    set startDateFiltering(date) {
        localStorage.setItem('filteringStartDate', date);
    }
    get endDateFiltering() {
        return localStorage.getItem('filteringEndDate');
    }
    set endDateFiltering(date) {
        localStorage.setItem('filteringEndDate', date);
    }
    refreshList() {
        let payments = [...this.payments];
        payments = payments.filter(p => p.student != null);
        if (this.classroomSelected.value != null) {
            payments = payments.filter(p => p.classroom === this.classroomSelected.value);
        }
        if (this.studentSelected.value != null) {
            payments = payments.filter(p => p.student === this.studentSelected.value);
        }
        if (this.filterDate.value[0] != null || this.filterDate.value[0] !== undefined) {
            payments = payments.filter(p => {
                const paymentDate = moment(p.paymentDate);
                const filterStartDate = moment(this.filterDate.value[0]);
                return paymentDate.isSameOrAfter(filterStartDate, 'day');
            });
        }
        if (this.filterDate.value[1] != null || this.filterDate.value[1] !== undefined) {
            payments = payments.filter(p => {
                const paymentDate = moment(p.paymentDate);
                const filterEndDate = moment(this.filterDate.value[1]);
                return paymentDate.isSameOrBefore(filterEndDate, 'day');
            });
        }
        this.totalPayments = payments.reduce((acc, cur) => acc + cur.amount, 0);
        this.rows = [...payments];
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const registration = yield this.utils.common.modal(StudentChooserComponent, null);
            const classroom = yield this.repo.classrooms.one(registration.classroom._id);
            const defaultFee = yield this.repo.fees.one(classroom.schoolFee);
            yield this.utils.common.modal(PayComponent, {
                defaultFee,
                registration
            });
        });
    }
    edit(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const registration = yield this.repo.registrations.student(payment.student);
            yield this.utils.common.modal(EditPayComponent, {
                registration,
                payment,
            });
        });
    }
    delete(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.customAlert('Confirmez-vous la suppression de ce payement ?', 'Attention', ['OUI', 'NON']);
            if (result === 0) {
                yield this.paymentRepository.remove(payment._id);
                this.utils.common.toast('Le payment a été supprimé avec succès');
                this.changeDetector.detectChanges();
            }
        });
    }
    printReceipt(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.utils.print.registrationReceipt(payment);
            }
            catch (e) {
                console.log(e);
                this.utils.common.alert(e, 'Une erreur est servenue');
            }
        });
    }
    formatDate(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.utils.print.registrationReceipt(payment);
            }
            catch (e) {
                console.log(e);
                this.utils.common.alert(e, 'Une erreur est servenue');
            }
        });
    }
    ngOnInit() {
        this.paymentRepository.stream
            .subscribe(payments => {
            this.payments = [...payments];
            if (this.startDateFiltering == null && this.endDateFiltering == null) {
                this.utils.common.serverTime()
                    .then(serverTime => {
                    this.startOfTheWeek = moment(serverTime).startOf('week');
                    this.endOfTheWeek = moment(serverTime).endOf('week');
                    this.filterDate.patchValue([this.startOfTheWeek, this.endOfTheWeek], { emitEvent: false });
                    this.refreshList();
                })
                    .catch(error => {
                    console.log(error);
                });
            }
            else {
                this.refreshList();
            }
        });
        this.classroomsRepository.stream
            .subscribe(classrooms => {
            this.classrooms = classrooms;
        });
        this.registrationsRepository.stream
            .subscribe(registrations => {
            this.registrations = registrations;
            this.registrationsFiltred = [...registrations];
        });
        this.classroomSelected.valueChanges
            .subscribe((classroomId) => {
            this.students = this.registrations
                .filter(r => r.classroom._id === classroomId)
                .map(r => r.student);
            this.studentSelected.patchValue(null, { emitEvent: false });
            this.refreshList();
        });
        this.studentSelected.valueChanges
            .subscribe((student) => {
            this.refreshList();
        });
        this.filterDate.valueChanges.subscribe(dates => {
            const start = moment(dates[0]);
            const end = moment(dates[1]);
            this.startDateFiltering = start.format();
            this.endDateFiltering = end.format();
            this.refreshList();
        });
        this.columns = [
            { prop: 'paymentDate', name: 'Date de payement', pipe: { transform: this.utils.common.formatDate } },
            { name: 'Nom', cellTemplate: this.studentFullNameTemplate },
            { name: 'Class', cellTemplate: this.classroomTemplate },
            { prop: 'amount', name: 'Montant', pipe: { transform: this.utils.common.spaced } },
            { name: 'Options', cellTemplate: this.actionsTemplate }
        ];
    }
};
__decorate([
    ViewChild('studentFullName', { static: true })
], PaymentsComponent.prototype, "studentFullNameTemplate", void 0);
__decorate([
    ViewChild('classroom', { static: true })
], PaymentsComponent.prototype, "classroomTemplate", void 0);
__decorate([
    ViewChild('fees', { static: true })
], PaymentsComponent.prototype, "feesTemplate", void 0);
__decorate([
    ViewChild('actions', { static: true })
], PaymentsComponent.prototype, "actionsTemplate", void 0);
PaymentsComponent = __decorate([
    Component({
        selector: 'app-scholarships',
        templateUrl: './payments.component.html',
        styleUrls: ['./payments.component.scss']
    })
], PaymentsComponent);
export { PaymentsComponent };
//# sourceMappingURL=payments.component.js.map