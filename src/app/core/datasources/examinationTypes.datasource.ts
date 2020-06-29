import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {ExaminationType} from '../models/examination-type';

@Injectable({
  providedIn: 'root'
})
export class ExaminationTypesDatasource extends BaseDatasource<ExaminationType> {

  constructor() {
    super('/examinations/types');
  }
}
