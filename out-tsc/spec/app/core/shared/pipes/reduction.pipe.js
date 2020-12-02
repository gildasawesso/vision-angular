import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let ReductionPipe = class ReductionPipe {
    transform(feeType, ...args) {
        const registration = args[0];
        const reduction = registration.reductions.find(r => r.fee === feeType._id);
        if (reduction) {
            if (reduction.reductionType === 'percentage') {
                return reduction.reduction / 100 * feeType.amount;
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
ReductionPipe = __decorate([
    Pipe({
        name: 'reduction',
        pure: false
    })
], ReductionPipe);
export { ReductionPipe };
//# sourceMappingURL=reduction.pipe.js.map