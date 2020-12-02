import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Classroom} from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsRepository extends BaseRepository<Classroom> {

  constructor() {
    super('/classrooms');
  }

  async classroomStudents(classroomId: string) {
    return await this.query.get(`/${classroomId}/students`);
  }
}
