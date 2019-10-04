import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {FeeCategory} from '../models/fee-category';
import {FeeCategoriesDatasource} from '../datasources/fee-categories.datasource';

@Injectable({
  providedIn: 'root'
})
export class FeeCategoriesRepository extends BaseRepository<FeeCategory> {

  constructor(private feeCategoriesDatasource: FeeCategoriesDatasource) {
    super(feeCategoriesDatasource);
  }
}
