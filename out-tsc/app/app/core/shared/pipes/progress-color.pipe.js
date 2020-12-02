import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let ProgressColorPipe = class ProgressColorPipe {
    transform(value, ...args) {
        const max = args[0];
        if (value < max) {
            return 'warning';
        }
        else if (value === 0) {
            return 'danger';
        }
        else {
            return 'success';
        }
    }
};
ProgressColorPipe = __decorate([
    Pipe({
        name: 'progressColor'
    })
], ProgressColorPipe);
export { ProgressColorPipe };
//# sourceMappingURL=progress-color.pipe.js.map