import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditExaminationTypeComponent } from '../add-or-edit-examination-type/add-or-edit-examination-type.component';
import { constants } from '../../../core/constants';
let ExaminationTypesComponent = class ExaminationTypesComponent {
    constructor(examinationTypesRepository, utils) {
        this.examinationTypesRepository = examinationTypesRepository;
        this.utils = utils;
        this.constants = constants;
        this.examinationTypes = [];
    }
    addExaminationType() {
        return __awaiter(this, void 0, void 0, function* () {
            const examinationType = yield this.utils.common.modalWithResult(AddOrEditExaminationTypeComponent, { type: null });
            if (examinationType) {
                yield this.examinationTypesRepository.add(examinationType);
            }
        });
    }
    editExaminationType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const examinationType = yield this.utils.common.modalWithResult(AddOrEditExaminationTypeComponent, { type });
            if (examinationType != null) {
                yield this.examinationTypesRepository.update(examinationType, type._id);
            }
        });
    }
    deleteExamType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.utils.common.customAlert('Toutes les examinations liées à ce type d\'examination seront supprimées', 'Attention', ['Annuler', 'Je comprends le risque']);
            if (res === 1) {
                yield this.examinationTypesRepository.remove(type._id);
            }
        });
    }
    ngOnInit() {
        this.examinationTypesRepository.stream
            .subscribe((examinationTypes) => {
            this.examinationTypes = examinationTypes;
        });
    }
};
ExaminationTypesComponent = __decorate([
    Component({
        selector: 'app-examination-types',
        templateUrl: './examination-types.component.html',
        styleUrls: ['./examination-types.component.scss']
    })
], ExaminationTypesComponent);
export { ExaminationTypesComponent };
//# sourceMappingURL=examination-types.component.js.map