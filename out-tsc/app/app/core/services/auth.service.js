import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { apiConstants } from '../constants/api.constants';
let AuthService = class AuthService {
    constructor(api, router) {
        this.api = api;
        this.router = router;
        this.userBehaviorSubject = new BehaviorSubject(null);
        this.user$ = this.userBehaviorSubject.asObservable();
    }
    get user() {
        return this.user$;
    }
    get userRemote() {
        return this.api.get(`/users/me`).toPromise();
    }
    get isUserAuthenticated() {
        return !!localStorage.getItem('credentials');
    }
    get currentUser() {
        return this.userBehaviorSubject.value;
    }
    set currentUser(user) {
        this.userBehaviorSubject.next(user);
        if (user == null) {
            this.credentials = null;
        }
    }
    get credentials() {
        const credentialsString = localStorage.getItem('credentials');
        return JSON.parse(credentialsString);
    }
    set credentials(credential) {
        if (credential == null) {
            localStorage.removeItem('credentials');
        }
        else {
            localStorage.setItem('credentials', JSON.stringify(credential));
        }
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.update(`/r/users/${user._id}`, user).toPromise();
        });
    }
    initializeUser() {
        this.getCurrentUser();
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const saveUser = this.userBehaviorSubject.value;
            if (saveUser) {
                return Promise.resolve(saveUser);
            }
            else {
                if (this.isUserAuthenticated) {
                    try {
                        const user = yield this.api.get(`/users/me`).toPromise();
                        this.currentUser = user;
                        return user;
                    }
                    catch (e) {
                        console.log(e);
                        yield this.router.navigateByUrl(apiConstants.signin);
                    }
                }
                else {
                    yield this.router.navigateByUrl(apiConstants.signin);
                }
            }
        });
    }
    renewToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield this.api.post(apiConstants.renewToken, { refreshToken }).toPromise();
            this.credentials = credentials;
            return credentials;
        });
    }
    signin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.credentials = yield this.api.post(apiConstants.signin, { username, password }).toPromise();
            return this.getCurrentUser();
        });
    }
    signup(signupInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.credentials = yield this.api.post(apiConstants.signup, signupInfo).toPromise();
            return this.getCurrentUser();
        });
    }
    signout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentUser = null;
            yield this.router.navigateByUrl(apiConstants.signin);
            location.reload();
        });
    }
    decodeToken(token) {
        const tokenDecoded = atob(token.split('.')[1]);
        return JSON.parse(tokenDecoded);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map