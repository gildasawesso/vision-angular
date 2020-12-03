import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {SchoolYearService} from './school-year.service';
import {first} from 'rxjs/operators';
import {SchoolYear} from '../models/school-year';
import {constants} from '../constants';

@Injectable()
export class PermissionsService {

  schoolyear: SchoolYear;

  constructor(private api: ApiService,
              private ngxPermissions: NgxPermissionsService,
              private schoolYearService: SchoolYearService) {
    this.schoolYearService.schoolYear.subscribe(async sy => {
      this.schoolyear = sy;
      await this.loadPermissions();
    });
  }

  get userPermissions() {
    return this.currentUserPermissions();
  }

  get allPermissions() {
    return constants.permissions.map(module => module.permissions).reduce((acc, cur) => [...acc, ...cur]);
  }

  private async currentUserPermissions() {
    if (this.schoolyear == null) {
      return [];
    }
    return !!localStorage.getItem('credentials') ? await this.api.get(`/users/permissions?schoolyear=${this.schoolyear._id}`).toPromise() : [];
  }

  private async getAllPermissions() {
    return await this.api.get(`/permissions?schoolyear=${this.schoolYearService.snapshot._id}`).toPromise();
  }

  async loadPermissions() {
    const permissions = await this.currentUserPermissions();
    this.ngxPermissions.loadPermissions(permissions);
  }
}
