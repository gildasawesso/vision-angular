import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditFeeTypeComponent } from './add-or-edit-fee/add-or-edit-fee-type.component';
let FeesComponent = class FeesComponent {
    constructor(feesRepository, repo, utils) {
        this.feesRepository = feesRepository;
        this.repo = repo;
        this.utils = utils;
        this.columns = [
            { prop: 'name', name: 'Nom' },
            { prop: 'amount', name: 'Montant' }
        ];
        this.mapping = {
            name: 'Nom',
            amount: 'Montant',
            'date deadline': 'Date Limite',
            options: 'Options'
        };
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditFeeTypeComponent, null);
        });
    }
    edit(fee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditFeeTypeComponent, fee);
        });
    }
    delete(fee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.feesRepository.remove(fee._id);
            this.utils.common.toast('Contribution supprimée');
        });
    }
    ngOnInit() {
        this.repo.fees.stream.subscribe(fees => {
            this.fees = [...fees];
        });
    }
};
FeesComponent = __decorate([
    Component({
        selector: 'app-fees',
        templateUrl: './fees.component.html',
        styleUrls: ['./fees.component.scss']
    })
], FeesComponent);
export { FeesComponent };
//# sourceMappingURL=fees.component.js.map