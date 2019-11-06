import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsDatasource extends BaseDatasource<Student> {

  constructor() {
    super('/students', 'populate=classroom');
  }
}
