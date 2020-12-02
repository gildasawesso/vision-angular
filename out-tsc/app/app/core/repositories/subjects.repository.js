import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let SubjectsRepository = class SubjectsRepository extends BaseRepository {
    constructor() {
        super('/subjects');
    }
};
SubjectsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SubjectsRepository);
export { SubjectsRepository };
//# sourceMappingURL=subjects.repository.js.map