import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersDatasource extends BaseDatasource<User> {

  constructor() {
    super('/r/users', 'populate=roles');
  }

  async create(object: any) {
    return this.api.post(`/users/?${this.toPopulate}`, object).toPromise();
  }
}
