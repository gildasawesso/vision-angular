import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() title: string;
  @Input() image: string;
  @Input() navigationUrl: string;

  constructor(private router: Router) { }

  navigate() {
    this.router.navigate([this.navigationUrl]);
  }

  ngOnInit() {
  }

}
