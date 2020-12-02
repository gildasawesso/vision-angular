import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let UsersRepository = class UsersRepository extends BaseRepository {
    constructor() {
        super('/users');
    }
};
UsersRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsersRepository);
export { UsersRepository };
//# sourceMappingURL=users.repository.js.map