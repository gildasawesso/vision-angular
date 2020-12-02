import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Services = class Services {
    constructor(work, api, appBar, auth, bulletin, config, permission, schoolYear, smallWork, statsStudent, statsPayment) {
        this.work = work;
        this.api = api;
        this.appBar = appBar;
        this.auth = auth;
        this.bulletin = bulletin;
        this.config = config;
        this.permission = permission;
        this.schoolYear = schoolYear;
        this.smallWork = smallWork;
        this.statsStudent = statsStudent;
        this.statsPayment = statsPayment;
    }
};
Services = __decorate([
    Injectable({
        providedIn: 'root'
    })
], Services);
export { Services };
//# sourceMappingURL=services.js.map