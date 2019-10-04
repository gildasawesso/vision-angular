import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Registration} from '../models/registration';
import {RegistrationsDatasource} from '../datasources/registrations.datasource';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsRepository extends BaseRepository<Registration> {

  constructor(private registrationsDatasource: RegistrationsDatasource) {
    super(registrationsDatasource);
  }
}
