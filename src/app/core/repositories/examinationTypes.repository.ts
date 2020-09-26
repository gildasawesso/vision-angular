import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {ExaminationType} from '../models/examination-type';

@Injectable({
  providedIn: 'root'
})
export class ExaminationTypesRepository extends BaseRepository<ExaminationType> {

  constructor() {
    super('/examinations/types');
  }
}
