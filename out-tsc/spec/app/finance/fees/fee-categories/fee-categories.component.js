import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
let FeeCategoriesComponent = class FeeCategoriesComponent {
    constructor(feeTypesRepository, utils) {
        this.feeTypesRepository = feeTypesRepository;
        this.utils = utils;
        this.name = new FormControl('');
        this.buttonText = 'Ajouter un nouveau type';
        this.selectedId = null;
    }
    ngOnInit() {
    }
    edit(feeType) {
        this.buttonText = 'Modifier le type';
        this.name.patchValue(feeType.name);
        this.selectedId = feeType._id;
    }
    delete(feeType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.feeTypesRepository.remove(feeType._id);
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isEmpty()) {
                this.utils.common.toast('Le Type ne doit être vide');
            }
            else {
                if (this.selectedId == null) {
                    const fee = { name: this.name.value };
                    yield this.feeTypesRepository.add(fee);
                }
                else {
                    const fee = { name: this.name.value };
                    yield this.feeTypesRepository.update(fee, this.selectedId);
                }
            }
            this.name.reset();
            this.selectedId = null;
            this.buttonText = 'Ajouter un nouveau type';
        });
    }
    isEmpty() {
        return this.name.value.trim() === '';
    }
};
FeeCategoriesComponent = __decorate([
    Component({
        selector: 'app-fee-types',
        templateUrl: './fee-categories.component.html',
        styleUrls: ['./fee-categories.component.scss']
    })
], FeeCategoriesComponent);
export { FeeCategoriesComponent };
//# sourceMappingURL=fee-categories.component.js.map