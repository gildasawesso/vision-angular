import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {SchoolYear} from '../../models/school-year';
import {SchoolyearsDatasource} from '../datasources/schoolyears.datasource';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearsRepository extends BaseRepository<SchoolYear> {

  constructor(private schoolyearsDatasource: SchoolyearsDatasource) {
    super(schoolyearsDatasource);
  }
}
