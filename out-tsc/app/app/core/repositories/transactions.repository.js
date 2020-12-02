import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { BehaviorSubject } from 'rxjs';
let TransactionsRepository = class TransactionsRepository extends BaseRepository {
    constructor() {
        super('/transactions');
        this.balance$ = new BehaviorSubject(undefined);
        this.onUpdate();
    }
    get balance() { return this.balance$.asObservable(); }
    onUpdate() {
        this.stream.subscribe((_) => __awaiter(this, void 0, void 0, function* () {
            yield this.getBalance();
        }));
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.query.get(`/balance`);
            this.balance$.next(balance);
        });
    }
};
TransactionsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TransactionsRepository);
export { TransactionsRepository };
//# sourceMappingURL=transactions.repository.js.map