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
}
