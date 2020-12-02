import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddOrEditTrancheComponent } from '../add-or-edit-tranche/add-or-edit-tranche.component';
let AddOrEditFeeTypeComponent = class AddOrEditFeeTypeComponent {
    constructor(data, feeTypesRepository, formBuilder, repo, dialogRef, utils) {
        this.data = data;
        this.feeTypesRepository = feeTypesRepository;
        this.formBuilder = formBuilder;
        this.repo = repo;
        this.dialogRef = dialogRef;
        this.utils = utils;
        this.title = `Ajout d'un type de contribution`;
        this.buttonSubmitText = 'Créer un type de contribution';
        this.feeForm = this.formBuilder.group({
            name: [''],
            amount: [''],
            deadline: [''],
            isSchoolFee: [false],
            tranches: this.formBuilder.array([])
        });
        if (this.data) {
            this.title = `Modification du type de contribution`;
            this.buttonSubmitText = `Modifier le type de contribution`;
            this.contributionId = this.data._id;
            this.feeForm.patchValue(this.data);
            console.log(this.data);
            const tranchesFormArray = this.feeForm.controls.tranches;
            this.data.tranches.forEach(t => tranchesFormArray.push(this.formBuilder.group(t)));
        }
    }
    get tranches() {
        const array = this.feeForm.controls.tranches;
        return array.controls;
    }
    addTranche() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.modalWithResult(AddOrEditTrancheComponent, null);
            if (result == null) {
                return;
            }
            const tranchesArray = this.feeForm.controls.tranches;
            tranchesArray.push(this.formBuilder.group(result));
        });
    }
    updateTranche(trancheIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const tranchesArray = this.feeForm.controls.tranches;
            const tranche = tranchesArray.controls[trancheIndex];
            const result = yield this.utils.common.modalWithResult(AddOrEditTrancheComponent, tranche.value);
            if (result == null) {
                return;
            }
            tranche.patchValue(result);
        });
    }
    deleteTranche(trancheIndex) {
        const tranchesArray = this.feeForm.controls.tranches;
        tranchesArray.removeAt(trancheIndex);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.feeForm.valid) {
                const fee = this.feeForm.value;
                this.contributionId ? yield this.update(fee, this.contributionId) : yield this.create(fee);
                this.utils.common.toast('Opération réalisée avec succès');
                this.dialogRef.close();
            }
            else {
                this.utils.common.alert('Il existe des erreurs dans le formulaire');
            }
        });
    }
    create(fee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.feeTypesRepository.add(fee);
        });
    }
    update(fee, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.feeTypesRepository.update(fee, id);
        });
    }
    ngOnInit() {
    }
};
AddOrEditFeeTypeComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-fee',
        templateUrl: './add-or-edit-fee-type.component.html',
        styleUrls: ['./add-or-edit-fee-type.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddOrEditFeeTypeComponent);
export { AddOrEditFeeTypeComponent };
//# sourceMappingURL=add-or-edit-fee-type.component.js.map