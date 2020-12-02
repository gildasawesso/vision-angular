import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Utils = class Utils {
    constructor(commonUtil, printUtil, formUtil, studentUtil, examinationUtil, payments) {
        this.commonUtil = commonUtil;
        this.printUtil = printUtil;
        this.formUtil = formUtil;
        this.studentUtil = studentUtil;
        this.examinationUtil = examinationUtil;
        this.payments = payments;
        this.common = this.commonUtil;
        this.print = this.printUtil;
        this.form = this.formUtil;
        this.student = this.studentUtil;
        this.examination = this.examinationUtil;
    }
};
Utils = __decorate([
    Injectable()
], Utils);
export { Utils };
//# sourceMappingURL=index.js.map