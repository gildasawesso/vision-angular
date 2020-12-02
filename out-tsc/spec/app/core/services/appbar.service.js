import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { menuConfig } from '../../routeConfigs';
let AppbarService = class AppbarService {
    constructor(router) {
        this.router = router;
        this.subbarRoutesBehaviorSubject = new BehaviorSubject(null);
        this.appbarRoutesBehaviorSubject = new BehaviorSubject(null);
        this.moduleNameBehaviorSubject = new BehaviorSubject('');
    }
    get moduleSelectedStream() {
        return this.moduleNameBehaviorSubject;
    }
    set moduleSelected(moduleName) {
        this.moduleNameBehaviorSubject.next(moduleName);
    }
    get subbarMenus() {
        return this.subbarRoutesBehaviorSubject;
    }
    get appbarMenus() {
        return this.appbarRoutesBehaviorSubject;
    }
    initSubbarEventListener() {
        this.router.events
            .pipe(filter(e => {
            return e instanceof NavigationEnd;
        }))
            .subscribe((e) => {
            const currentRoute = e.urlAfterRedirects;
            this.setRoutesFromCurrentUrl(currentRoute);
        });
    }
    setRoutesFromCurrentUrl(url) {
        this.setMainMenu(url);
    }
    setMainMenu(url) {
        const mainMenuConfig = menuConfig.find(mainMenuItem => {
            const mainMenuItemPath = Object.keys(mainMenuItem)[0];
            return url.indexOf(mainMenuItemPath) !== -1;
        });
        if (mainMenuConfig !== undefined) {
            const mainMenuPossibleRoutes = Object.keys(mainMenuConfig).map((key) => mainMenuConfig[key])[0];
            this.appbarRoutesBehaviorSubject.next(mainMenuPossibleRoutes);
            this.setSubMenu(mainMenuPossibleRoutes, url);
        }
        else {
            this.subbarRoutesBehaviorSubject.next(null);
            this.appbarRoutesBehaviorSubject.next(null);
        }
    }
    setSubMenu(mainMenu, url) {
        if (mainMenu == null) {
            return null;
        }
        const subMenuConfig = mainMenu.find(menuItem => url.indexOf(menuItem.url) !== -1);
        if (subMenuConfig !== undefined) {
            this.subbarRoutesBehaviorSubject.next(subMenuConfig.submenu);
        }
        else {
            this.subbarRoutesBehaviorSubject.next(null);
        }
    }
};
AppbarService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AppbarService);
export { AppbarService };
//# sourceMappingURL=appbar.service.js.map