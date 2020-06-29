import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {User} from '../models/user';
import {UsersDatasource} from '../datasources/users.datasource';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository extends BaseRepository<User> {

  constructor(private usersDatasource: UsersDatasource) {
    super(usersDatasource);
  }
}
