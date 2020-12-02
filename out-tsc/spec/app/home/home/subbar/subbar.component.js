import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SubbarComponent = class SubbarComponent {
    constructor(appBarService) {
        this.appBarService = appBarService;
    }
    ngOnInit() {
        this.appBarService.subbarMenus
            .subscribe(routes => this.routes = routes);
    }
};
SubbarComponent = __decorate([
    Component({
        selector: 'app-subbar',
        templateUrl: './subbar.component.html',
        styleUrls: ['./subbar.component.scss']
    })
], SubbarComponent);
export { SubbarComponent };
//# sourceMappingURL=subbar.component.js.map