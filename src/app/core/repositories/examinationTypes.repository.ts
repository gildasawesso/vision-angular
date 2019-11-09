import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {ExaminationType} from '../models/examination-type';
import {ExaminationTypesDatasource} from '../datasources/examinationTypes.datasource';

@Injectable({
  providedIn: 'root'
})
export class ExaminationTypesRepository extends BaseRepository<ExaminationType> {

  constructor(private examinationTypesDatasource: ExaminationTypesDatasource) {
    super(examinationTypesDatasource);
  }
}
