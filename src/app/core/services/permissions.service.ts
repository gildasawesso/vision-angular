import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {SchoolYearService} from './school-year.service';
import {first} from 'rxjs/operators';

@Injectable()
export class PermissionsService {

  constructor(private api: ApiService,
              private ngxPermissions: NgxPermissionsService,
              private schoolYearService: SchoolYearService) { }

  get permissions() {
    return this.userPermissions();
  }

  get allPermissions() {
    return this.getAllPermissions();
  }

  private async userPermissions() {
    const schoolYear = await this.schoolYearService.schoolYearSelected.pipe(first()).toPromise();
    return !!localStorage.getItem('credentials') ? await this.api.get(`/users/permissions?schoolyear=${schoolYear._id}`).toPromise() : [];
  }

  private async getAllPermissions() {
    return await this.api.get('/permissions').toPromise();
  }

  async loadPermissions() {
    const permissions = await this.userPermissions();
    this.ngxPermissions.loadPermissions(permissions);
  }
}
