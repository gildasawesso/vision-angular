import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let MenuItemComponent = class MenuItemComponent {
    constructor(router, appbarService) {
        this.router = router;
        this.appbarService = appbarService;
    }
    navigate() {
        this.router.navigate([this.navigationUrl]);
        this.appbarService.moduleSelected = this.title;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], MenuItemComponent.prototype, "title", void 0);
__decorate([
    Input()
], MenuItemComponent.prototype, "image", void 0);
__decorate([
    Input()
], MenuItemComponent.prototype, "navigationUrl", void 0);
__decorate([
    Input()
], MenuItemComponent.prototype, "permission", void 0);
MenuItemComponent = __decorate([
    Component({
        selector: 'app-menu-item',
        templateUrl: './menu-item.component.html',
        styleUrls: ['./menu-item.component.scss']
    })
], MenuItemComponent);
export { MenuItemComponent };
//# sourceMappingURL=menu-item.component.js.map