import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable()
export class PermissionsService {

  constructor(private api: ApiService, private ngxPermissions: NgxPermissionsService) { }

  get permissions() {
    return this.userPermissions();
  }

  get allPermissions() {
    return this.getAllPermissions();
  }

  private async userPermissions() {
    return !!localStorage.getItem('credentials') ? await this.api.get('/users/permissions').toPromise() : [];
  }

  private async getAllPermissions() {
    return await this.api.get('/permissions').toPromise();
  }

  async loadPermissions() {
    const permissions = await this.userPermissions();
    this.ngxPermissions.loadPermissions(permissions);
  }
}
