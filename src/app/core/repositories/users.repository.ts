import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository extends BaseRepository<User> {

  constructor() {
    super('/users');
  }
}
