import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../core/services/appbar.service';
import {homeMenu} from '../../home-menu';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  routes: Array<{text: string, url: string}>;
  isHomeMenu = false;
  moduleSelected: string;

  usingPhone: boolean;
  usingTablet: boolean;
  usingWeb: boolean;

  phone = this.breakpointObserver.observe([
    Breakpoints.Handset,
  ]);

  tablet = this.breakpointObserver.observe([
    Breakpoints.Tablet,
  ]);

  web = this.breakpointObserver.observe([
    Breakpoints.Tablet,
  ]);

  constructor(private appbarService: AppbarService,
              private breakpointObserver: BreakpointObserver,
              public auth: AuthService) { }

  async signout() {
    await this.auth.signout();
  }

  ngOnInit() {
    this.appbarService.appbarMenus
      .subscribe(routes => {
        this.routes = routes;
        this.isHomeMenu = routes == null;
        if (this.routes == null) {
          this.moduleSelected = '';
        } else {
          const moduleRootUrl = this.routes[0].url.split('/')[1];
          this.moduleSelected = homeMenu.find(m => m.url === moduleRootUrl).title;
        }
      });



    this.phone.subscribe(result => {
      if (this.routes == null) { return; }
      this.usingPhone = true;
      this.usingTablet = false;
      this.usingWeb = false;
    });

    this.web.subscribe(result => {
      if (this.routes == null) { return; }
      this.usingPhone = false;
      this.usingTablet = false;
      this.usingWeb = true;
    });

    this.tablet.subscribe(result => {
      if (this.routes == null) { return; }
      if (this.routes.length >= 4) {
        this.usingPhone = true;
        this.usingTablet = false;
        this.usingWeb = false;
      } else {
        this.usingPhone = false;
        this.usingTablet = true;
        this.usingWeb = false;
      }
    });
  }
}
