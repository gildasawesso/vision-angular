import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Teacher} from '../models/teacher';
import {TeachersDatasource} from '../datasources/teachers.datasource';

@Injectable({
  providedIn: 'root'
})
export class TeachersRepository extends BaseRepository<Teacher> {

  constructor(private teachersDatasource: TeachersDatasource) {
    super(teachersDatasource);
  }
}
