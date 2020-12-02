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
}
