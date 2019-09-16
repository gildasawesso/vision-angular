import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {FeeType} from '../../models/fee-type';

@Injectable({
  providedIn: 'root'
})
export class FeeTypesDatasource extends BaseDatasource<FeeType> {

  constructor() {
    super('/fees/types', '');
  }
}
