import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let SchoolsRepository = class SchoolsRepository extends BaseRepository {
    constructor() {
        super('/schools');
    }
};
SchoolsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SchoolsRepository);
export { SchoolsRepository };
//# sourceMappingURL=schools.repository.js.map