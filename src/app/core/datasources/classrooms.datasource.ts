import { Injectable } from '@angular/core';
import {BaseRepository} from '../repositories/base.repository';
import {SchoolClass} from '../../models/schoolClass';
import {BaseDatasource} from './base.datasource';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassesDatasource extends BaseDatasource<SchoolClass> {

  constructor() {
    super('/classrooms');
  }
}
