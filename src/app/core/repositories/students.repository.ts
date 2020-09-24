import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {StudentsDatasource} from '../datasources/students.datasource';
import {Student} from '../models/student';
import {map} from 'rxjs/operators';
import {Classroom} from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class StudentsRepository extends BaseRepository<Student> {



  constructor(private studentsDatasource: StudentsDatasource) {
    super(studentsDatasource);
  }

  effectifOf(gender: string, classroom: Classroom) {
    return [];
    // return this.stream.pipe(
    //   map((students: Student[]) => {
    //     return students.reduce((acc, cur) => {
    //       if (classroom) {
    //         cur.gender === gender && cur.classroom._id === classroom._id ? acc += 1 : acc += 0;
    //       } else {
    //         cur.gender === gender ? acc += 1 : acc += 0;
    //       }
    //       return acc;
    //     }, 0);
    //   })
    // );
  }

  genders(classroom: Classroom) {
    return [];
    // return this.stream.pipe(
    //   map((students: Student[]) => {
    //     return students.reduce((acc, cur) => {
    //       if (classroom) {
    //         cur.classroom._id === classroom._id ? cur.gender === 'M' ? acc.male += 1 : acc.female += 1 : acc;
    //       } else {
    //         cur.gender === 'M' ? acc.male += 1 : acc.female += 1;
    //       }
    //       return acc;
    //     }, { male: 0, female: 0});
    //   })
    // );
  }
}
