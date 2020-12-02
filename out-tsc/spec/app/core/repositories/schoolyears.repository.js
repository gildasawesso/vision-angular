import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let SchoolyearsRepository = class SchoolyearsRepository extends BaseRepository {
    constructor() {
        super('/schoolyears');
    }
    currentSchoolYear() {
        return this.query.get(`/current`);
    }
};
SchoolyearsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SchoolyearsRepository);
export { SchoolyearsRepository };
//# sourceMappingURL=schoolyears.repository.js.map