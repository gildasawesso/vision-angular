import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../services/appbar.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  routes: Array<{text: string, url: string}>;

  constructor(private appbarService: AppbarService) { }

  ngOnInit() {
    this.appbarService.appbarMenus
      .subscribe(routes => this.routes = routes);
  }
}
