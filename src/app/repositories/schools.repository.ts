import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {School} from '../models/school';
import {SchoolsDatasource} from '../datasources/schools.datasource';

@Injectable({
  providedIn: 'root'
})
export class SchoolsRepository extends BaseRepository<School> {

  constructor(private schoolsDatasource: SchoolsDatasource) {
    super(schoolsDatasource);
  }
}
