import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Classroom} from '../models/classroom';
import {ClassroomsDatasource} from '../datasources/classrooms.datasource';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsRepository extends BaseRepository<Classroom> {

  constructor(private classroomsDatasource: ClassroomsDatasource) {
    super(classroomsDatasource);
  }
}
