import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let ExaminationTypesRepository = class ExaminationTypesRepository extends BaseRepository {
    constructor() {
        super('/examinations/types');
    }
};
ExaminationTypesRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ExaminationTypesRepository);
export { ExaminationTypesRepository };
//# sourceMappingURL=examinationTypes.repository.js.map