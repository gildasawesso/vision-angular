import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { apiConstants } from '../constants/api.constants';
let AuthenticatedGuard = class AuthenticatedGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate(next, state) {
        return this.userIsAuthenticate();
    }
    canActivateChild(next, state) {
        return this.userIsAuthenticate();
    }
    userIsAuthenticate() {
        return this.auth.isUserAuthenticated ? true : this.router.navigateByUrl(apiConstants.signin);
    }
};
AuthenticatedGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthenticatedGuard);
export { AuthenticatedGuard };
//# sourceMappingURL=authenticated.guard.js.map