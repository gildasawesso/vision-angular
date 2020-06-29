import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Examination} from '../models/examination';
import {ExaminationsDatasource} from '../datasources/examinations.datasource';

@Injectable({
  providedIn: 'root'
})
export class ExaminationsRepository extends BaseRepository<Examination> {

  constructor(private examinationsDatasource: ExaminationsDatasource) {
    super(examinationsDatasource);
  }

  async updateStudents(object: Examination, id, idKey = '_id') {
    const updatedObject = await this.examinationsDatasource.updateStudents(object);
    const objects = this.genericBehavioSubject.value;
    const index = objects.findIndex(o => o[idKey] === updatedObject[idKey]);
    objects[index] = updatedObject;
    this.genericBehavioSubject.next(objects);
    return updatedObject;
  }
}
