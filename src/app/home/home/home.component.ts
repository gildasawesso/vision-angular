import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../services/appbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appBarService: AppbarService) { }

  ngOnInit() {
  }

}
