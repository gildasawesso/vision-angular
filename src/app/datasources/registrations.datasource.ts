import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Registration} from '../models/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsDatasource extends BaseDatasource<Registration> {

  constructor() {
    super('/registrations', '?populate=student&populate=classroom&populate=schoolyear');
  }
}
