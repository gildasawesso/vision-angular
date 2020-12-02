import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddOrEditReductionComponent } from './add-or-edit-reduction/add-or-edit-reduction.component';
let ReductionsComponent = class ReductionsComponent {
    constructor(data, dialogRef, utils, registrationsRepository, repo) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.utils = utils;
        this.registrationsRepository = registrationsRepository;
        this.repo = repo;
        this.registration = this.data;
    }
    addReduction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditReductionComponent, {
                registration: this.registration,
            });
        });
    }
    editReduction(reduction, index) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditReductionComponent, {
                registration: this.registration,
                reduction,
                index
            });
        });
    }
    deleteReduction(reduction, index) {
        return __awaiter(this, void 0, void 0, function* () {
            this.registration.reductions.splice(index, 1);
            if (this.registration._id) {
                yield this.registrationsRepository.update(this.registration, this.registration._id);
            }
        });
    }
    ngOnInit() {
        this.repo.fees.stream.subscribe(fees => {
            const map = fees.map(fee => [fee._id, fee]);
            this.fees = Object.fromEntries(map);
        });
    }
};
ReductionsComponent = __decorate([
    Component({
        selector: 'app-reductions',
        templateUrl: './reductions.component.html',
        styleUrls: ['./reductions.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ReductionsComponent);
export { ReductionsComponent };
//# sourceMappingURL=reductions.component.js.map