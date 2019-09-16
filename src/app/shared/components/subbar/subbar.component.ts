import {Component, OnInit} from '@angular/core';
import {AppbarService} from '../../../services/appbar.service';

@Component({
  selector: 'app-subbar',
  templateUrl: './subbar.component.html',
  styleUrls: ['./subbar.component.scss']
})
export class SubbarComponent implements OnInit {

  routes: Array<{text: string, url: string}>;

  constructor(private appBarService: AppbarService) { }

  ngOnInit() {
    this.appBarService.subbarMenus
      .subscribe(routes => this.routes = routes);
  }
}
