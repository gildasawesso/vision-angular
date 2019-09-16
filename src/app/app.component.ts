import { Component } from '@angular/core';
import {AppbarService} from './services/appbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(appBarService: AppbarService) {
    appBarService.initSubbarEventListener();
  }
}
