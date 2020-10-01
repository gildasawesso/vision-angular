import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../core/services/appbar.service';
import {homeMenu} from '../../home-menu';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {

  routes: Array<{text: string, url: string, icon: string}>;
  isHomeMenu = false;
  moduleSelected: string;

  constructor(private appbarService: AppbarService) { }

  ngOnInit(): void {
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
  }

}
