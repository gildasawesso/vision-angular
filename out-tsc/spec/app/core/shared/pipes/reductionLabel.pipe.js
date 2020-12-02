import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let ReductionLabelPipe = class ReductionLabelPipe {
    transform(feeType, ...args) {
        const registration = args[0];
        const reduction = registration.reductions.find(r => r.fee === feeType._id);
        if (reduction) {
            if (reduction.reductionType === 'percentage') {
                return `${reduction.reduction}%`;
            }
            else {
                return `-${reduction.reduction} FCFA`;
            }
        }
        else {
            return 'Pas de réduction';
        }
    }
};
ReductionLabelPipe = __decorate([
    Pipe({
        name: 'reductionLabel',
        pure: false
    })
], ReductionLabelPipe);
export { ReductionLabelPipe };
//# sourceMappingURL=reductionLabel.pipe.js.map