import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Fee} from '../../models/fee';
import {FeesDatasource} from '../datasources/fees.datasource';

@Injectable({
  providedIn: 'root'
})
export class FeesRepository extends BaseRepository<Fee> {

  constructor(private feesDatasource: FeesDatasource) {
    super(feesDatasource);
  }
}
