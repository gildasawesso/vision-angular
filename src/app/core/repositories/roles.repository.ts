import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesRepository extends BaseRepository<Role> {

  constructor() {
    super('/roles');
  }
}
