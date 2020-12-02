import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let ConfigurationService = class ConfigurationService {
    constructor() {
        this.isAdminConfiguredBehaviorSubject = new BehaviorSubject(false);
        this.isSchoolConfiguredBehaviorSubject = new BehaviorSubject(false);
        this.isSchoolSessionsConfiguredBehaviorSubject = new BehaviorSubject(false);
    }
    get isAdminConfigured() {
        return this.isAdminConfiguredBehaviorSubject.value;
    }
    set isAdminConfigured(value) {
        this.isAdminConfiguredBehaviorSubject.next(value);
    }
    get isSchoolConfigured() {
        return this.isSchoolConfiguredBehaviorSubject.value;
    }
    set isSchoolConfigured(value) {
        this.isSchoolConfiguredBehaviorSubject.next(value);
    }
    get isSchoolSessionsConfigured() {
        return this.isSchoolSessionsConfiguredBehaviorSubject.value;
    }
    set isSchoolSessionsConfigured(value) {
        this.isSchoolSessionsConfiguredBehaviorSubject.next(value);
    }
};
ConfigurationService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ConfigurationService);
export { ConfigurationService };
//# sourceMappingURL=configuration.service.js.map