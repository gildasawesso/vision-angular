import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkInProgressComponent } from '../shared/components/work-in-progress/work-in-progress.component';
let WorkService = class WorkService {
    constructor(dialog) {
        this.dialog = dialog;
        this.isBusy = new BehaviorSubject(false);
    }
    started(message) {
        this.dialogRef = this.dialog.open(WorkInProgressComponent, {
            data: message,
            minWidth: 400,
            hasBackdrop: false
        });
    }
    ended() {
        var _a;
        (_a = this.dialogRef) === null || _a === void 0 ? void 0 : _a.close();
    }
};
WorkService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WorkService);
export { WorkService };
//# sourceMappingURL=work.service.js.map