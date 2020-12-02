import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FinanceDashboardComponent = class FinanceDashboardComponent {
    constructor(utils, paymentsRepository, services, changeDetector) {
        this.utils = utils;
        this.paymentsRepository = paymentsRepository;
        this.services = services;
        this.changeDetector = changeDetector;
        this.pkiTileHeigth = 140;
        this.pkiCards = [];
        this.payments = [];
    }
    ngOnInit() {
        this.services.statsPayment.paymentsPki.subscribe(pki => {
            this.pkiCards = [
                { title: 'Total', cols: 1, rows: 1, value: pki[0], color: 'linear-gradient(to right, #f953c6, #b91d73)' },
                { title: 'Scolarité', cols: 1, rows: 1, value: pki[1], color: 'linear-gradient(90deg, rgb(54, 181, 183) 0%,rgb(19, 126, 105) 100%)' },
                { title: 'Inscriptions', cols: 1, rows: 1, value: pki[2], color: 'linear-gradient(to right, #396afc, #2948ff)' },
                { title: 'Autres Contributions', cols: 1, rows: 1, value: pki[3], color: 'linear-gradient(to right, #da22ff, #9733ee)' }
            ];
        });
    }
};
FinanceDashboardComponent = __decorate([
    Component({
        selector: 'app-finance-dashboard',
        templateUrl: './finance-dashboard.component.html',
        styleUrls: ['./finance-dashboard.component.scss']
    })
], FinanceDashboardComponent);
export { FinanceDashboardComponent };
//# sourceMappingURL=finance-dashboard.component.js.map