import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let ExaminationsRepository = class ExaminationsRepository extends BaseRepository {
    constructor() {
        super('/examinations');
    }
};
ExaminationsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ExaminationsRepository);
export { ExaminationsRepository };
//# sourceMappingURL=examinations.repository.js.map