import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Fee} from '../../models/fee';

@Injectable({
  providedIn: 'root'
})
export class FeesDatasource extends BaseDatasource<Fee> {

  constructor() {
    super('/fees', '?populate=feeType');
  }
}
