import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Subject} from '../../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsDatasource extends BaseDatasource<Subject> {

  constructor() {
    super('/subjects', '');
  }
}
