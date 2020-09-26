import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {SpendingType} from '../models/spending-type';

@Injectable({
  providedIn: 'root'
})
export class SpendingTypesRepository extends BaseRepository<SpendingType> {

  constructor() {
    super('/spending/types');
  }
}
