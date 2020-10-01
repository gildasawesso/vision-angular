import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../core/services/appbar.service';
import {SchoolYearService} from '../../core/services/school-year.service';
import {homeMenu} from '../home-menu';
import {Services} from '../../core/services/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isHomeMenu = false;

  constructor(public services: Services,
              private schoolYearService: SchoolYearService) {
    this.schoolYearService.init();
  }

  ngOnInit() {
    this.services.appBar.appbarMenus
      .subscribe(routes => {
        this.isHomeMenu = routes == null;
      });
  }

}
