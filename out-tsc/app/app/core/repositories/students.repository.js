import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let StudentsRepository = class StudentsRepository extends BaseRepository {
    constructor() {
        super('/students');
    }
};
StudentsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StudentsRepository);
export { StudentsRepository };
//# sourceMappingURL=students.repository.js.map