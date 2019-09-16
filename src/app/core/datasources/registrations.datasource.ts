import { Injectable } from '@angular/core';
import {Classroom} from '../../models/classroom';
import {BaseDatasource} from './base.datasource';
import {Student} from '../../models/student';
import {Registration} from '../../models/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDatasource extends BaseDatasource<Registration> {

  constructor() {
    super('/registrations', '?populate=student&populate=classroom&populate=schoolyear');
  }
}
