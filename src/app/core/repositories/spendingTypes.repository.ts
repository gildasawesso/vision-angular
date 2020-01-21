import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {SpendingType} from '../models/spending-type';
import {SpendingTypesDatasource} from '../datasources/spending-types.datasource';

@Injectable({
  providedIn: 'root'
})
export class SpendingTypesRepository extends BaseRepository<SpendingType> {

  constructor(private spendingTypesDatasource: SpendingTypesDatasource) {
    super(spendingTypesDatasource);
  }
}
