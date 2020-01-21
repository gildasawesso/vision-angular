import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {SpendingType} from '../models/spending-type';

@Injectable({
  providedIn: 'root'
})
export class SpendingTypesDatasource extends BaseDatasource<SpendingType> {

  constructor() {
    super('/spending/types');
  }
}
