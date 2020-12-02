import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PaymentUtil = class PaymentUtil {
    studentPastPayments(feeId, payments) {
        const feePayments = payments.map(p => {
            const paymentLine = p.paymentLines.find(line => line.feeId === feeId);
            return paymentLine ? paymentLine.amount : 0;
        });
        return feePayments.reduce((acc, cur) => acc + cur, 0);
    }
    reduction(fee, reductions) {
        const reduction = reductions.find(r => r.fee === fee._id);
        if (reduction) {
            if (reduction.reductionType === 'percentage') {
                return reduction.reduction / 100 * fee.amount;
            }
            else {
                return reduction.reduction;
            }
        }
        else {
            return 0;
        }
    }
};
PaymentUtil = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PaymentUtil);
export { PaymentUtil };
//# sourceMappingURL=payment.util.js.map