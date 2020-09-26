import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Examination} from '../models/examination';

@Injectable({
  providedIn: 'root'
})
export class ExaminationsRepository extends BaseRepository<Examination> {

  constructor() {
    super('/examinations');
  }

  async updateStudents(object: Examination, id, idKey = '_id') {
    // const updatedObject = await this.examinationsDatasource.updateStudents(object);
    // const objects = this.genericBehavioSubject.value;
    // const index = objects.findIndex(o => o[idKey] === updatedObject[idKey]);
    // objects[index] = updatedObject;
    // this.genericBehavioSubject.next(objects);
    // return updatedObject;
  }
  //
  // updateStudents(examination: Examination) {
  //   return this.api.patch(`${this.url}/${examination._id}/marks`, examination).toPromise();
  // }
}
