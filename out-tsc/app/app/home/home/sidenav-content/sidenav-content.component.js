import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { homeMenu } from '../../home-menu';
let SidenavContentComponent = class SidenavContentComponent {
    constructor(appbarService) {
        this.appbarService = appbarService;
        this.isHomeMenu = false;
    }
    ngOnInit() {
        this.appbarService.appbarMenus
            .subscribe(routes => {
            this.routes = routes;
            this.isHomeMenu = routes == null;
            if (this.routes == null) {
                this.moduleSelected = '';
            }
            else {
                const moduleRootUrl = this.routes[0].url.split('/')[1];
                this.moduleSelected = homeMenu.find(m => m.url === moduleRootUrl).title;
            }
        });
    }
};
SidenavContentComponent = __decorate([
    Component({
        selector: 'app-sidenav-content',
        templateUrl: './sidenav-content.component.html',
        styleUrls: ['./sidenav-content.component.scss']
    })
], SidenavContentComponent);
export { SidenavContentComponent };
//# sourceMappingURL=sidenav-content.component.js.map