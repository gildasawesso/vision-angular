import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {StudentsDatasource} from '../datasources/students.datasource';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsRepository extends BaseRepository<Student> {

  constructor(private studentsDatasource: StudentsDatasource) {
    super(studentsDatasource);
  }
}
