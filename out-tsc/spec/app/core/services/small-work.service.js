import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let SmallWorkService = class SmallWorkService {
    constructor() {
        this.isBusy = new BehaviorSubject(false);
    }
    started() {
        this.isBusy.next(true);
    }
    finished() {
        this.isBusy.next(false);
    }
};
SmallWorkService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SmallWorkService);
export { SmallWorkService };
//# sourceMappingURL=small-work.service.js.map