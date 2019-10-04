import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {FeeCategory} from '../models/fee-category';

@Injectable({
  providedIn: 'root'
})
export class FeeCategoriesDatasource extends BaseDatasource<FeeCategory> {

  constructor() {
    super('/fees/categories', '');
  }
}
