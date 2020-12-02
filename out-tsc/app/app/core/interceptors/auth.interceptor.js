import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as moment from 'moment';
import { catchError, map } from 'rxjs/operators';
let AuthInterceptor = class AuthInterceptor {
    constructor(auth) {
        this.auth = auth;
    }
    intercept(req, next) {
        const credentials = this.auth.credentials;
        let httpRequest = req;
        if (credentials) {
            httpRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${credentials.accessToken}` }
            });
        }
        return next.handle(httpRequest).pipe(map((event) => {
            return event;
        }), catchError((error) => {
            var _a;
            console.log((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message);
            return throwError(error);
        }));
    }
    isJwtTokenExpired(expiration) {
        const now = moment().format('X');
        return Number(now) - expiration > 0;
    }
    decodeJwtToken(token) {
        const payload = token.split('.')[1];
        return atob(payload);
    }
};
AuthInterceptor = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map