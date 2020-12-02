import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ReductionsComponent } from '../reductions/reductions.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let EditPayComponent = class EditPayComponent {
    constructor(data, dialogRef, utils, change, formBuilder, feeTypesRepository, paymentsRepository, registrationRepository, repo, spaced) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.utils = utils;
        this.change = change;
        this.formBuilder = formBuilder;
        this.feeTypesRepository = feeTypesRepository;
        this.paymentsRepository = paymentsRepository;
        this.registrationRepository = registrationRepository;
        this.repo = repo;
        this.spaced = spaced;
        this.paymentLineForm = this.formBuilder.array([]);
        this.isRegistration = false;
        this.paymentDate = new FormControl(moment());
        this.registration = this.data.registration;
        this.payment = this.data.payment;
    }
    get paymentLines() {
        return this.paymentLineForm;
    }
    loadFees() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const line of this.payment.paymentLines) {
                const fee = yield this.repo.fees.one(line.feeId);
                const group = this.formBuilder.group({
                    fee,
                    amount: [line.amount, this.validateAmount(fee, line.amount)],
                    remaining: this.remainingPayments(fee, line.amount),
                    pastPayments: this.pastPayments(fee, line.amount),
                    reduction: this.reductionWithLabel(fee)
                });
                this.paymentLines.push(group);
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.utils.form.isValid(this.paymentLineForm)) {
                const paymentLines = this.paymentLines.value;
                try {
                    const paymentLike = {
                        amount: paymentLines.reduce((acc, cur) => acc + cur.amount, 0),
                        paymentLines: paymentLines.map(line => ({ feeId: line.fee._id, amount: line.amount })),
                        paymentDate: this.paymentDate.value,
                    };
                    const payment = yield this.repo.payments.update(paymentLike, this.payment._id);
                    const message = `Modification effectuée`;
                    const result = yield this.utils.common.customAlert(message, '', ['Imprimer le reçu', 'Revenir']);
                    if (result === 0) {
                        try {
                            yield this.utils.print.registrationReceipt(payment);
                            this.dialogRef.close(true);
                        }
                        catch (e) {
                            console.error(e);
                            this.utils.common.alert(`Une erreur est survenue lors de l'impression du ticket`, `Erreur`);
                            this.dialogRef.close(true);
                        }
                    }
                    else {
                        this.dialogRef.close(true);
                    }
                }
                catch (e) {
                    console.error(e);
                    this.utils.common.alert(JSON.stringify(e.error), `Une erreur est survenue`);
                    this.dialogRef.close(true);
                }
            }
        });
    }
    validateAmount(fee, alreadyPayed) {
        return (control) => {
            if (Number(control.value) > this.remainingPayments(fee, alreadyPayed)) {
                return { exceeded: true };
            }
            else {
                return null;
            }
        };
    }
    pastPayments(fee, alreadyPayed) {
        if (this.studentPayments === undefined) {
            return 0;
        }
        const feePayments = this.studentPayments.map(p => {
            const paymentLine = p.paymentLines.find(line => line.feeId === fee._id);
            return paymentLine ? paymentLine.amount : 0;
        });
        return feePayments.reduce((acc, cur) => acc + cur, 0) - alreadyPayed;
    }
    reductionWithLabel(fee) {
        if (this.registration.reductions === undefined || this.registration.reductions == null) {
            return 'Pas de réduction';
        }
        const reduction = this.registration.reductions.find(r => r.fee === fee._id);
        if (reduction) {
            if (reduction.reductionType === 'percentage') {
                return `-${this.spaced.transform(reduction.reduction, 'F')}% (${reduction.reduction / 100 * fee.amount} F)`;
            }
            else {
                return `-${this.spaced.transform(reduction.reduction, 'F')}`;
            }
        }
        else {
            return 'Pas de réduction';
        }
    }
    reduction(fee) {
        if (this.registration.reductions === undefined || this.registration.reductions == null) {
            return 0;
        }
        const reduction = this.registration.reductions.find(r => r.fee === fee._id);
        if (reduction) {
            if (reduction.reductionType === 'percentage') {
                return reduction.reduction / 100 * fee.amount;
            }
            else {
                return reduction.reduction;
            }
        }
        else {
            return 0;
        }
    }
    remainingPayments(fee, alreadyPayed) {
        return fee.amount - this.pastPayments(fee, alreadyPayed) - this.reduction(fee);
    }
    reductions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(ReductionsComponent, this.registration);
            this.paymentLines.clear();
            yield this.loadFees();
        });
    }
    ngOnInit() {
        this.loadFees();
        this.feeTypesRepository.stream.subscribe(fees => this.fees = fees);
        this.paymentsRepository.classroomsPayments.subscribe(p => {
            if (p == null)
                return;
            this.studentPayments = p[`classrooms`][this.registration.classroom._id][`students`][this.registration.student._id];
        });
    }
};
EditPayComponent = __decorate([
    Component({
        selector: 'app-edit-pay',
        templateUrl: './edit-pay.component.html',
        styleUrls: ['./edit-pay.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], EditPayComponent);
export { EditPayComponent };
//# sourceMappingURL=edit-pay.component.js.map