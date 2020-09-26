import {Injectable} from '@angular/core';
import {BaseRepository} from './base.repository';
import {SchoolYear} from '../models/school-year';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearsRepository extends BaseRepository<SchoolYear> {

  constructor() {
    super('/schoolyears');
  }

  currentSchoolYear() {
    return this.query.get(`/current`);
  }
}
