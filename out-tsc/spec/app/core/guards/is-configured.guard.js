import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let IsConfiguredGuard = class IsConfiguredGuard {
    constructor(auth, api, router, configuration) {
        this.auth = auth;
        this.api = api;
        this.router = router;
        this.configuration = configuration;
    }
    canActivate(next, state) {
        return this.isConfigured();
    }
    canActivateChild(next, state) {
        return this.isConfigured();
    }
    isConfigured() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.configuration.isAdminConfigured) {
                const isAdminAvailable = yield this.api.get('/config/admin/exist').toPromise();
                if (!isAdminAvailable) {
                    yield this.router.navigateByUrl('/setup/admin');
                    return false;
                }
            }
            this.configuration.isAdminConfigured = true;
            if (!this.auth.isUserAuthenticated) {
                return Promise.resolve(true);
            }
            if (!this.configuration.isSchoolConfigured) {
                const user = yield this.auth.userRemote;
                if (user.schools.length <= 0) {
                    yield this.router.navigateByUrl('/setup/school');
                    return false;
                }
            }
            this.configuration.isSchoolConfigured = true;
            if (!this.configuration.isSchoolSessionsConfigured) {
                const isSchoolYearAvailable = yield this.api.get(`/config/schoolyear/exist`).toPromise();
                if (isSchoolYearAvailable.length <= 0) {
                    yield this.router.navigateByUrl('/setup/schoolyears');
                    return false;
                }
            }
            this.configuration.isSchoolSessionsConfigured = true;
            return true;
        });
    }
};
IsConfiguredGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], IsConfiguredGuard);
export { IsConfiguredGuard };
//# sourceMappingURL=is-configured.guard.js.map