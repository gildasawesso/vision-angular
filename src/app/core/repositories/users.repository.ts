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

  async post(object: any) {
    return this.api.post(`/users/?${this.toPopulate}`, object).toPromise();
  }
}
