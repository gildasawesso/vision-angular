import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let RolesRepository = class RolesRepository extends BaseRepository {
    constructor() {
        super('/roles');
    }
};
RolesRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RolesRepository);
export { RolesRepository };
//# sourceMappingURL=roles.repository.js.map