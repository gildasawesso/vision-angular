import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Examination} from '../models/examination';

@Injectable({
  providedIn: 'root'
})
export class ExaminationsDatasource extends BaseDatasource<Examination> {

  constructor() {
    super('/examinations');
  }

  updateStudents(examination: Examination) {
    return this.api.patch(`${this.url}/${examination._id}/marks`, examination).toPromise();
  }
}
