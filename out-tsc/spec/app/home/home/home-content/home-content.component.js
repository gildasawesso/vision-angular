import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { homeMenu } from '../../home-menu';
let HomeContentComponent = class HomeContentComponent {
    constructor(authService) {
        this.authService = authService;
        this.menuItems = homeMenu;
    }
    ngOnInit() {
    }
};
HomeContentComponent = __decorate([
    Component({
        selector: 'app-home-content',
        templateUrl: './home-content.component.html',
        styleUrls: ['./home-content.component.scss']
    })
], HomeContentComponent);
export { HomeContentComponent };
//# sourceMappingURL=home-content.component.js.map