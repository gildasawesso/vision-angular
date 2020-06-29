import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {SchoolYear} from '../models/school-year';
import {SchoolSession} from '../models/school-session';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearsDatasource extends BaseDatasource<SchoolYear> {

  constructor() {
    super('/schoolyears', 'sort=-_id');
  }

  currentSchoolYear() {
    return this.api.get(`${this.url}/current`).toPromise<SchoolYear>();
  }

  currentSession() {
    return this.api.get(`${this.url}/sessions/current`).toPromise<SchoolSession>();
  }
}
