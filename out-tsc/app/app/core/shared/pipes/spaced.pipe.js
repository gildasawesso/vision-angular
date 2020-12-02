import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let SpacedPipe = class SpacedPipe {
    transform(value, ...args) {
        if (value === undefined || value == null) {
            return value;
        }
        const suffix = args[0] ? ' ' + args[0] : '';
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + suffix;
    }
};
SpacedPipe = __decorate([
    Pipe({
        name: 'spaced'
    })
], SpacedPipe);
export { SpacedPipe };
//# sourceMappingURL=spaced.pipe.js.map