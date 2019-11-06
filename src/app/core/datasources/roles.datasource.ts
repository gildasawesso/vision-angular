import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesDatasource extends BaseDatasource<Role> {

  constructor() {
    super('/roles', 'populate=permissions');
  }
}
