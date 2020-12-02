import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PermissionsService = class PermissionsService {
    constructor(api, ngxPermissions, schoolYearService) {
        this.api = api;
        this.ngxPermissions = ngxPermissions;
        this.schoolYearService = schoolYearService;
        this.schoolYearService.schoolYear.subscribe((sy) => __awaiter(this, void 0, void 0, function* () {
            this.schoolyear = sy;
            yield this.loadPermissions();
        }));
    }
    get permissions() {
        return this.userPermissions();
    }
    get allPermissions() {
        return this.getAllPermissions();
    }
    userPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schoolyear == null) {
                return [];
            }
            return !!localStorage.getItem('credentials') ? yield this.api.get(`/users/permissions?schoolyear=${this.schoolyear._id}`).toPromise() : [];
        });
    }
    getAllPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.get('/permissions').toPromise();
        });
    }
    loadPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            const permissions = yield this.userPermissions();
            this.ngxPermissions.loadPermissions(permissions);
        });
    }
};
PermissionsService = __decorate([
    Injectable()
], PermissionsService);
export { PermissionsService };
//# sourceMappingURL=permissions.service.js.map