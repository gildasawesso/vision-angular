import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let StatsPaymentsService = class StatsPaymentsService {
    constructor(repo, api, schoolYearService) {
        this.repo = repo;
        this.api = api;
        this.schoolYearService = schoolYearService;
        this.paymentsPki$ = new BehaviorSubject([null, null, null, null]);
        this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);
        this.init();
    }
    get paymentsPki() { return this.paymentsPki$.asObservable(); }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.repo.payments.stream.subscribe((_) => __awaiter(this, void 0, void 0, function* () {
                yield this.paymentsPKI();
            }));
        });
    }
    paymentsPKI() {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield this.get(`/stats/payments`);
            this.paymentsPki$.next(payments);
        });
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(`${url}?schoolyear=${this.schoolYear._id}`).toPromise();
        });
    }
};
StatsPaymentsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StatsPaymentsService);
export { StatsPaymentsService };
//# sourceMappingURL=stats-payments.service.js.map