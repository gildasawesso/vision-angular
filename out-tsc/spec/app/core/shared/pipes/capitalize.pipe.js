import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let CapitalizePipe = class CapitalizePipe {
    transform(value, ...args) {
        if (value == null)
            return value;
        return `${value[0].toUpperCase()}${value.substring(1).toLowerCase()}`;
    }
};
CapitalizePipe = __decorate([
    Pipe({
        name: 'capitalize'
    })
], CapitalizePipe);
export { CapitalizePipe };
//# sourceMappingURL=capitalize.pipe.js.map