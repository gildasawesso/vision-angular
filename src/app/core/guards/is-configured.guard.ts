import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {AuthService} from '../services/auth.service';
import {ConfigurationService} from '../services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class IsConfiguredGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService,
              private api: ApiService,
              private router: Router,
              private configuration: ConfigurationService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isConfigured();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isConfigured();
  }

  async isConfigured() {
    if (!this.configuration.isAdminConfigured) {
      const isAdminAvailable = await this.api.get('/config/admin/exist').toPromise();
      if (!isAdminAvailable) {
        await this.router.navigateByUrl('/setup/admin');
        return false;
      }
    }
    this.configuration.isAdminConfigured = true;

    if (!this.auth.isUserAuthenticated) {
      return Promise.resolve(true);
    }

    if (!this.configuration.isSchoolConfigured) {
      const user = await this.auth.userRemote;
      if (user.schools.length <= 0) {
        await this.router.navigateByUrl('/setup/school');
        return false;
      }
    }
    this.configuration.isSchoolConfigured = true;

    if (!this.configuration.isSchoolSessionsConfigured) {
      const isSchoolYearAvailable = await this.api.get(`/config/schoolyear/exist`).toPromise();
      if (isSchoolYearAvailable.length <= 0) {
        await this.router.navigateByUrl('/setup/schoolyears');
        return false;
      }
    }
    this.configuration.isSchoolSessionsConfigured = true;

    return true;
  }
}
