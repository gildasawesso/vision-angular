import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let BulletinService = class BulletinService {
    constructor(api, auth, schoolYearService) {
        this.api = api;
        this.auth = auth;
        this.schoolYearService = schoolYearService;
        this.bulletins$ = new BehaviorSubject(null);
        this.getBulletins();
    }
    get bulletin() { return this.bulletins$.asObservable(); }
    getBulletins() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schoolYearService.schoolYear.subscribe(schoolYear => {
                if (schoolYear == null)
                    return;
                const bulletins = this.api.get(`/bulletins?schoolyear=${schoolYear._id}`).toPromise();
                this.bulletins$.next(bulletins);
            });
        });
    }
};
BulletinService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BulletinService);
export { BulletinService };
//# sourceMappingURL=bulletin.service.js.map