import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
    constructor(services, schoolYearService) {
        this.services = services;
        this.schoolYearService = schoolYearService;
        this.isHomeMenu = false;
        this.schoolYearService.init();
    }
    ngOnInit() {
        this.services.appBar.appbarMenus
            .subscribe(routes => {
            this.isHomeMenu = routes == null;
        });
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map