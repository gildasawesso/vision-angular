import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {SchoolYear} from '../models/school-year';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearsDatasource extends BaseDatasource<SchoolYear> {

  constructor() {
    super('/schoolyears', 'sort=-_id');
  }
}
