import { Component } from '@angular/core';
import {AppbarService} from './core/services/appbar.service';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(appBarService: AppbarService,
              private auth: AuthService) {
    appBarService.initSubbarEventListener();
    this.auth.initializeUser();
  }
}
