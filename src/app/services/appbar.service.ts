import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {menuConfig} from '../shared/routeConfigs';

@Injectable({
  providedIn: 'root'
})
export class AppbarService {

  private subbarRoutesBehaviorSubject = new BehaviorSubject<Array<{text: string, url: string}>>(null);
  private appbarRoutesBehaviorSubject = new BehaviorSubject<Array<{text: string, url: string}>>(null);

  get subbarMenus() {
    return this.subbarRoutesBehaviorSubject;
  }

  get appbarMenus() {
    return this.appbarRoutesBehaviorSubject;
  }

  constructor(private router: Router) {}

  initSubbarEventListener() {
    this.router.events
      .pipe(
        filter(e => {
          return e instanceof NavigationEnd;
        }),
      )
      .subscribe((e: NavigationEnd) => {
        const currentRoute = e.urlAfterRedirects;
        this.setRoutesFromCurrentUrl(currentRoute);
        console.log(this.subbarRoutesBehaviorSubject.value);
      });
  }

  setRoutesFromCurrentUrl(url: string) {
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
    } else {
      this.subbarRoutesBehaviorSubject.next(null);
      this.appbarRoutesBehaviorSubject.next(null);
    }
  }

  setSubMenu(mainMenu, url) {
    if (mainMenu == null) { return null; }
    const subMenuConfig = mainMenu.find(menuItem => url.indexOf(menuItem.url) !== -1);

    if (subMenuConfig !== undefined) {
      this.subbarRoutesBehaviorSubject.next(subMenuConfig.submenu);
    } else {
      this.subbarRoutesBehaviorSubject.next(null);
    }
  }
}
