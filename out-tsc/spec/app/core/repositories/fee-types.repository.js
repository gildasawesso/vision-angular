import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
let FeeTypesRepository = class FeeTypesRepository extends BaseRepository {
    constructor(payments) {
        super('/fees');
        this.payments = payments;
    }
    otherPayments() {
        return this.query.get('/others');
    }
    update(object, id, idKey = '_id') {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _super.update.call(this, object, id, idKey);
            this.payments.sync();
            return result;
        });
    }
};
FeeTypesRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FeeTypesRepository);
export { FeeTypesRepository };
//# sourceMappingURL=fee-types.repository.js.map