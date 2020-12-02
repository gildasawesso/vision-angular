import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Reduction } from '../../../core/models/reduction';
let AddOrEditReductionComponent = class AddOrEditReductionComponent {
    constructor(data, dialogRef, feeTypesRepository, registrationsRepository, utils, repo) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.feeTypesRepository = feeTypesRepository;
        this.registrationsRepository = registrationsRepository;
        this.utils = utils;
        this.repo = repo;
        this.reductionType = new FormControl('amount', Validators.required);
        this.fee = new FormControl('', Validators.required);
        this.amount = new FormControl('', [this.validatePercentage(this.reductionType, this.fee), Validators.required, Validators.min(1)]);
        this.registration = this.data.registration;
        this.reduction = this.data.reduction;
        this.index = this.data.index;
        if (this.reduction) {
            this.reductionType.patchValue(this.reduction.reductionType);
            this.amount.patchValue(this.reduction.reduction);
            this.fee.patchValue(this.reduction.fee);
        }
    }
    validatePercentage(type, fee) {
        return (control) => {
            if (type.value === `percentage`) {
                if (Number(control.value) > 100 || Number(control.value) <= 0) {
                    return { percentage: true };
                }
            }
            else {
                if (Number(control.value) > Number(fee.value.amount)) {
                    return { exceeded: true };
                }
            }
            return null;
        };
    }
    isReductionValid() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const pastPayments = yield this.repo.payments.studentFeePayments(this.registration.student._id, (_a = this.fee.value) === null || _a === void 0 ? void 0 : _a._id);
            const reduction = this.getReduction();
            const remainingFeePayment = Number((_b = this.fee.value) === null || _b === void 0 ? void 0 : _b.amount) - pastPayments - reduction;
            return remainingFeePayment >= 0;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const isReductionValid = yield this.isReductionValid();
            if (!isReductionValid) {
                this.utils.common.toast(`Le reste à payer après réduction est invalide, modifiez la valeur de la réduction`);
                return;
            }
            if (this.reductionType.valid && this.fee.valid && this.amount.valid) {
                if (this.reduction) {
                    return this.edit();
                }
                else {
                    return this.add();
                }
            }
            this.utils.common.toast(`Il existe des erreurs dans le formulaire`);
        });
    }
    pruneFeesAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const classroom = yield this.repo.classrooms.one(this.registration.classroom._id);
            const otherFees = yield this.repo.fees.otherPayments();
            this.feesAvailable = this.fees.filter(fee => {
                return fee._id === classroom.registrationFee ||
                    fee._id === classroom.reregistrationFee ||
                    fee._id === classroom.schoolFee ||
                    otherFees.find(f => f._id === fee._id) !== undefined;
            });
            if (this.registration.isNewStudent || !this.registration.isReregistration) {
                const reregistrationIndex = this.feesAvailable.findIndex(fee => fee._id === classroom.reregistrationFee);
                this.feesAvailable.splice(reregistrationIndex, 1);
            }
            else {
                const registrationIndex = this.feesAvailable.findIndex(fee => fee._id === classroom.registrationFee);
                this.feesAvailable.splice(registrationIndex, 1);
            }
            if (this.registration.reductions && this.registration.reductions.length > 0) {
                this.registration.reductions.forEach(reduction => {
                    const index = this.feesAvailable.findIndex(f => f._id === reduction.fee);
                    this.feesAvailable.splice(index, 1);
                });
            }
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const reductionLike = new Reduction();
            reductionLike.reductionType = this.reductionType.value;
            reductionLike.reduction = Number(this.amount.value);
            reductionLike.fee = this.fee.value._id;
            if (this.registration.reductions === undefined || this.registration.reductions == null) {
                this.registration.reductions = [];
            }
            this.registration.reductions.push(reductionLike);
            if (this.registration._id) {
                try {
                    yield this.registrationsRepository.update(this.registration, this.registration._id);
                    this.utils.common.toast(`Réduction ajoutée avec succès`);
                    this.dialogRef.close();
                }
                catch (e) {
                    this.utils.common.toast(JSON.stringify(e));
                }
            }
            else {
                this.utils.common.toast(`Réduction ajoutée avec succès`);
                this.dialogRef.close();
            }
        });
    }
    getReduction() {
        if (this.reductionType.value === 'percentage') {
            return Number(this.amount.value) / 100 * Number(this.fee.value.amount);
        }
        else {
            return Number(this.amount.value);
        }
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ngOnInit() {
        this.feeTypesRepository.stream.subscribe(fees => {
            this.fees = fees;
            this.pruneFeesAvailable();
        });
        this.fee.valueChanges.subscribe(fee => {
            const index = this.feesAvailable.findIndex(f => f._id === fee._id);
            this.feesAvailable.splice(index, 0);
        });
    }
};
AddOrEditReductionComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-reduction',
        templateUrl: './add-or-edit-reduction.component.html',
        styleUrls: ['./add-or-edit-reduction.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddOrEditReductionComponent);
export { AddOrEditReductionComponent };
//# sourceMappingURL=add-or-edit-reduction.component.js.map