import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {FeeType} from '../../models/fee-type';
import {FeeTypesDatasource} from '../datasources/fee-types.datasource';

@Injectable({
  providedIn: 'root'
})
export class FeeTypesRepository extends BaseRepository<FeeType> {

  constructor(private feeTypesDatasource: FeeTypesDatasource) {
    super(feeTypesDatasource);
  }
}
