import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Role} from '../models/role';
import {RolesDatasource} from '../datasources/roles.datasource';

@Injectable({
  providedIn: 'root'
})
export class RolesRepository extends BaseRepository<Role> {

  constructor(private rolesDatasource: RolesDatasource) {
    super(rolesDatasource);
  }
}
