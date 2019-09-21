import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppbarService} from '../../../services/appbar.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() title: string;
  @Input() image: string;
  @Input() navigationUrl: string;

  constructor(private router: Router,
              private appbarService: AppbarService) { }

  navigate() {
    this.router.navigate([this.navigationUrl]);
    this.appbarService.moduleSelected = this.title;
  }

  ngOnInit() {
  }

}
