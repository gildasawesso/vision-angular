import { Component, OnInit } from '@angular/core';
import {homeMenu} from '../../home-menu';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  menuItems = homeMenu;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
