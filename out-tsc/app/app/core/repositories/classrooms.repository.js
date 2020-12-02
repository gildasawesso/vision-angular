import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let ClassroomsRepository = class ClassroomsRepository extends BaseRepository {
    constructor() {
        super('/classrooms');
    }
};
ClassroomsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClassroomsRepository);
export { ClassroomsRepository };
//# sourceMappingURL=classrooms.repository.js.map