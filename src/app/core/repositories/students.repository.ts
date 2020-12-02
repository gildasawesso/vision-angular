import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsRepository extends BaseRepository<Student> {

  constructor() {
    super('/students');
  }
}
