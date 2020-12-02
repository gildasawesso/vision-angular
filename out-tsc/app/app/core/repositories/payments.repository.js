import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { BehaviorSubject } from 'rxjs';
let PaymentsRepository = class PaymentsRepository extends BaseRepository {
    constructor() {
        super('/payments');
        this.classroomsPayments = new BehaviorSubject(null);
        this.state = new BehaviorSubject(null);
    }
    studentPayments(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query.get(`/student/${studentId}`);
        });
    }
    studentFeePayments(studentId, feeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query.get(`/student/${studentId}/fee/${feeId}`);
        });
    }
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.init.call(this);
            this.stream.subscribe((_) => __awaiter(this, void 0, void 0, function* () {
                yield this.getClassroomPayments();
                yield this.getPaymentsState();
            }));
        });
    }
    getClassroomPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield this.query.get(`/classrooms`);
            this.classroomsPayments.next(payments);
        });
    }
    getPaymentsState() {
        return __awaiter(this, void 0, void 0, function* () {
            const state = yield this.query.get(`/classrooms/state`);
            this.state.next(state);
        });
    }
};
PaymentsRepository = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PaymentsRepository);
export { PaymentsRepository };
//# sourceMappingURL=payments.repository.js.map