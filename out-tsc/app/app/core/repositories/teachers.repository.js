import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let TeachersRepository = class TeachersRepository extends BaseRepository {
    constructor() {
        super('/teachers');
    }
};
TeachersRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TeachersRepository);
export { TeachersRepository };
//# sourceMappingURL=teachers.repository.js.map