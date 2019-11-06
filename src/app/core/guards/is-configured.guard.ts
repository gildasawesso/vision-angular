import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SchoolsDatasource} from '../datasources/schools.datasource';
import {School} from '../models/school';
import {SchoolYear} from '../models/school-year';
import {SchoolyearsDatasource} from '../datasources/schoolyears.datasource';
import {ApiService} from '../services/api.service';
import {apiConstants} from '../constants/api.constants';
import {AuthService} from '../services/auth.service';
import {ConfigurationService} from '../services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class IsConfiguredGuard implements CanActivate, CanActivateChild {
  constructor(private schoolsDatasource: SchoolsDatasource,
              private schoolyearsDatasource: SchoolyearsDatasource,
              private auth: AuthService,
              private api: ApiService,
              private router: Router,
              private configuration: ConfigurationService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isConfiugred();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isConfiugred();
  }

  // todo make api to check everything in the server side
  async isConfiugred() {

    if (!this.configuration.isAdminConfigured) {
      const usersAvailable = await this.api.get('/r/users/count').toPromise();
      if (Number(usersAvailable.count) < 1) {
        await this.router.navigateByUrl('/setup/admin');
        return false;
      }
    }
    this.configuration.isAdminConfigured = true;

    if (!this.auth.isUserAuthenticated) { return true; }

    if (!this.configuration.isSchoolConfigured) {
      const user = await this.auth.userRemote;
      if (user.schools.length <= 0) {
        await this.router.navigateByUrl('/setup/school');
        return false;
      }
    }
    this.configuration.isSchoolConfigured = true;

    if (!this.configuration.isSchoolSessionsConfigured) {
      const schoolYears: SchoolYear[] = await this.schoolyearsDatasource.list();
      if (schoolYears.length <= 0) {
        await this.router.navigateByUrl('/setup/schoolyears');
        return false;
      }
    }
    this.configuration.isSchoolSessionsConfigured = true;

    return true;
  }
}
