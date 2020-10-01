import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {SchoolYearService} from './school-year.service';
import {first} from 'rxjs/operators';
import {SchoolYear} from '../models/school-year';

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

  get permissions() {
    return this.userPermissions();
  }

  get allPermissions() {
    return this.getAllPermissions();
  }

  private async userPermissions() {
    if (this.schoolyear == null) {
      return [];
    }
    return !!localStorage.getItem('credentials') ? await this.api.get(`/users/permissions?schoolyear=${this.schoolyear._id}`).toPromise() : [];
  }

  private async getAllPermissions() {
    return await this.api.get('/permissions').toPromise();
  }

  async loadPermissions() {
    const permissions = await this.userPermissions();
    this.ngxPermissions.loadPermissions(permissions);
  }
}
