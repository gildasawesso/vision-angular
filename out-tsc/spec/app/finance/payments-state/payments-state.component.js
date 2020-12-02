import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
let PaymentsStateComponent = class PaymentsStateComponent {
    constructor(classroomsRepository, registrationsRepository, examinationsRepository, schoolyearsRepository, subjectsRepository, paymentsRepository, utils, repo, serevices, changeDetector) {
        this.classroomsRepository = classroomsRepository;
        this.registrationsRepository = registrationsRepository;
        this.examinationsRepository = examinationsRepository;
        this.schoolyearsRepository = schoolyearsRepository;
        this.subjectsRepository = subjectsRepository;
        this.paymentsRepository = paymentsRepository;
        this.utils = utils;
        this.repo = repo;
        this.serevices = serevices;
        this.changeDetector = changeDetector;
        this.classrooms = [];
        this.registrations = [];
        this.exportExcelHeader = [
            'Nom',
            'Prénom',
            'Montant Inscriptions',
            'Montant Inscriptions Payé',
            'Réductions Inscriptions',
            'Inscriptions Reste à payer',
            'Payement Total',
            'Reste à Payer'
        ];
        this.selected = -1;
        this.classroomSelected = new FormControl(null);
    }
    get classroomStudents() {
        return this.utils.student.classroomStudents(this.classroomSelected.value);
    }
    exportCurrentClassroom() {
        return __awaiter(this, void 0, void 0, function* () {
            // const students = this.classroomStudents;
            // const exportData = students.map(student => {
            //   const registrationState = this.studentRegistrationState(student);
            //   const schoolFeeState = this.tranchesMappedWithPayments(student, this.classroomSelected.value);
            //   const payments = this.currentStudentPayments(student);
            //   const schoolFeeStates: any = {};
            //   schoolFeeState.forEach(s => {
            //     schoolFeeStates[s.name] = s.amount;
            //     schoolFeeStates[`${s.name} Payée`] = s.payed;
            //     schoolFeeStates[`Réduction ${s.name}`] = 0;
            //     schoolFeeStates[`${s.name} restant`] = s.amount - s.payed;
            //   });
            //
            //   return {
            //     Prénom: student.firstname,
            //     Nom: student.lastname,
            //     'Frais d\'inscription': this.classroomSelected.value.registrationFee.amount,
            //     'Inscription payé': registrationState.registrationPayed,
            //     'Réduction frais d\'inscription': 0,
            //     'Frais d\'inscription restant': registrationState.registrationRemaining,
            //     'Frais de scolarité': payments[0].payments,
            //     ...schoolFeeStates,
            //     'Scolarité totale restante': payments[0].reste
            //   };
            // });
            // await this.exportExcel(exportData);
        });
    }
    exportExcel(data, header) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.print.excel(data, header);
        });
    }
    ngOnInit() {
        this.repo.classrooms.stream.subscribe(classrooms => this.classrooms = classrooms);
        this.repo.fees.stream.subscribe(fees => {
            this.tranchesName = fees.find(f => f.tranches.length >= 2).tranches.map(tranche => tranche.name);
        });
        this.repo.payments.state.subscribe(state => {
            this.paymentsState = state;
        });
        this.registrationsRepository.stream.subscribe(registrations => this.registrations = registrations);
        this.classroomSelected.valueChanges
            .subscribe((classroomId) => {
            if (classroomId == null) {
                return;
            }
            this.classroomSelectedStudents = this.registrations
                .filter(registration => registration.classroom._id === classroomId)
                .map(registration => registration.student);
            this.classroomSelectedState = this.paymentsState.classrooms[classroomId];
        });
    }
};
PaymentsStateComponent = __decorate([
    Component({
        selector: 'app-payments-state',
        templateUrl: './payments-state.component.html',
        styleUrls: ['./payments-state.component.scss'],
    })
], PaymentsStateComponent);
export { PaymentsStateComponent };
//# sourceMappingURL=payments-state.component.js.map