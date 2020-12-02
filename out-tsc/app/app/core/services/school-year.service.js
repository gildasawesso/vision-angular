import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let SchoolYearService = class SchoolYearService {
    constructor(api) {
        this.api = api;
        this.schoolYearSelected$ = new BehaviorSubject(null);
    }
    get snapshot() {
        return this.schoolYearSelected$.value;
    }
    get schoolYear() {
        return this.schoolYearSelected$.asObservable();
    }
    set schoolYear(schoolYear) {
        this.schoolYearSelected$.next(schoolYear);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schoolYear = yield this.api.get(`/schoolyears/current`).toPromise();
        });
    }
};
SchoolYearService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SchoolYearService);
export { SchoolYearService };
//# sourceMappingURL=school-year.service.js.map