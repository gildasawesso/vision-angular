import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {School} from '../../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolsDatasource extends BaseDatasource<School> {

  constructor() {
    super('/schools', '');
  }
}
