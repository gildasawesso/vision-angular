import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {menuConfig} from '../../routeConfigs';
import {WorkService} from './work.service';
import {ApiService} from './api.service';
import {AppbarService} from './appbar.service';
import {AuthService} from './auth.service';
import {BulletinService} from './bulletin.service';
import {ConfigurationService} from './configuration.service';
import {PermissionsService} from './permissions.service';
import {SchoolYearService} from './school-year.service';
import {SmallWorkService} from './small-work.service';
import {StatsStudentsService} from './stats-students.service';
import {StatsPaymentsService} from './stats-payments.service';

@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(public work: WorkService,
              public api: ApiService,
              public appBar: AppbarService,
              public auth: AuthService,
              public bulletin: BulletinService,
              public config: ConfigurationService,
              public permission: PermissionsService,
              public schoolYear: SchoolYearService,
              public smallWork: SmallWorkService,
              public statsStudent: StatsStudentsService,
              public statsPayment: StatsPaymentsService) {}
}
