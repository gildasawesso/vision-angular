import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { BehaviorSubject } from 'rxjs';
let RegistrationsRepository = class RegistrationsRepository extends BaseRepository {
    constructor() {
        super('/registrations');
        this.lastYearRegistrations = new BehaviorSubject(null);
        this.genders$ = new BehaviorSubject([null, null]);
        this.effectif$ = new BehaviorSubject([]);
    }
    get effectif() {
        return this.effectif$.asObservable();
    }
    get genders() {
        return this.genders$.asObservable();
    }
    get lastYearRegisrations() {
        return this.lastYearRegistrations;
    }
    studentReductions(student) {
        return this.query.get(`/student/${student}/reductions`);
    }
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.init.call(this);
            this.stream.subscribe((_) => __awaiter(this, void 0, void 0, function* () {
                yield this.getLastYearRegistrations();
            }));
        });
    }
    getLastYearRegistrations() {
        return __awaiter(this, void 0, void 0, function* () {
            let registrations = yield this.query.get(`/lastyear`);
            registrations = registrations.filter(r => r.student != null);
            this.lastYearRegistrations.next(registrations);
        });
    }
    student(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.query.get(`/student/${studentId}`);
        });
    }
};
RegistrationsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RegistrationsRepository);
export { RegistrationsRepository };
//# sourceMappingURL=registrations.repository.js.map